import {
  LikeOutlined,
  LikeFilled,
  CommentOutlined,
  SendOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Row, Col, Button, Input } from "antd";
import { format } from "date-fns";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { updateCommentChildPost } from "../../Redux/Action/ContentPostAction";
import "./index.scss";

export default memo(function Comment({ users, data, listAllUsers }) {
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState("");
  const [commentChild, setCommentChild] = useState("");

  const handlerFuntion = (value) => {
    let data = {};
    let formattedDate = "";
    let seconds = value?.createAt?.seconds;
    if (seconds) {
      let formatDay = format(new Date(seconds * 1000), "dd-MM-yyyy");
      let formatTime =
        ("00" + new Date(seconds * 1000).getHours()).slice(-2) +
        ":" +
        ("00" + new Date(seconds * 1000).getMinutes()).slice(-2);
      formattedDate = "Lúc " + formatTime + " ngày " + formatDay;
    }

    if (listAllUsers) {
      data = listAllUsers?.find((user) => user?.id === value?.idUser);
    }

    return (
      <>
        <img
          style={{ height: "32px", width: "32px" }}
          src={data?.urlImage}
        ></img>
        <div className="text-form">
          <div className="container-news__flex-one text-font">
            <span>{data?.name}</span>
            <span style={{ wordWrap: "break-word" }}>{value?.content}</span>
          </div>
          <div className="font-size">
            <span onClick={() => setFeedback(value?.id)}>Phản hồi</span>
            <span>Thu hồi</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </>
    );
  };

  function handleImage(value) {
    let data = {};
    if (listAllUsers) {
      data = listAllUsers?.find((user) => user?.id === value?.id);
    }
    return (
      <img style={{ height: "32px", width: "32px" }} src={data?.urlImage}></img>
    );
  }

  function formatDate(seconds) {
    let formattedDate = "";

    if (seconds) {
      let formatDay = format(new Date(seconds * 1000), "dd-MM-yyyy");
      let formatTime =
        ("00" + new Date(seconds * 1000).getHours()).slice(-2) +
        ":" +
        ("00" + new Date(seconds * 1000).getMinutes()).slice(-2);
      formattedDate = "Lúc " + formatTime + " ngày " + formatDay;
    }
    return formattedDate;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateCommentChildPost({
        users,
        content: commentChild,
        postContent: data,
        commentId: feedback,
        commentChildId: uuidv4(),
      })
    );
    setFeedback("");
  };

  return (
    <>
      <div className="comment-map">
        {data?.comments?.map((value, index) => (
          <div
            key={index}
            className="container-news__view-user container-news__flex padding-fix"
          >
            <div>{handlerFuntion(value)}</div>
            {value?.commentChilds.map((commentChild) => (
              <div
                key={commentChild?.id}
                className="comment-child"
                style={{ width: "100%" }}
              >
                <div
                  className="container-news__view-user container-news__flex"
                  style={{ marginLeft: "6%", paddingTop: "5px" }}
                >
                  <div>{handlerFuntion(commentChild)}</div>
                </div>
              </div>
            ))}
            {value?.id === feedback && (
              <div
                style={{ marginLeft: "6%", marginTop: "10px" }}
                className="container-news__view-noti"
              >
                {handleImage(users)}
                <form onSubmit={handleSubmit} style={{ paddingLeft: "0px" }}>
                  <Input
                    onChange={(e) => setCommentChild(e.target.value)}
                    placeholder="Viết bình luận"
                  ></Input>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
});
