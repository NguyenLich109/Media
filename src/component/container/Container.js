import { doc, getDoc } from "firebase/firestore";
import {
  LikeOutlined,
  LikeFilled,
  CommentOutlined,
  SendOutlined,
  HeartOutlined,
  LoadingOutlined,
  SmileOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Row, Col, Button, Input, notification } from "antd";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatRelative } from "date-fns/esm";
import { format } from "date-fns";
import Comment from "./Comment";
import {
  getContentPost,
  updateCommentPost,
} from "../../Redux/Action/ContentPostAction";
import { getAllUsersAction } from "../../Redux/Action/UserAction";
import { addFriendAction } from "../../Redux/Action/FriendsAction";
import { ADD_USER_RESET } from "../../Redux/Container/UseContainer";
import {
  ADD_CONTENT_RESET,
  UPDATE_CONTENT_RESET,
  UPDATE_COMMENTS_RESET,
  UPDATE_COMMENTSCHILD_RESET,
} from "../../Redux/Container/ContentPostContainer";
import { Image, Spin, Dropdown } from "antd";
import ModalPostNoti from "../modal/ModalPostNoti";
import { auth, db } from "../../firebase/config";
import "./index.scss";
import Status from "./Status";
import fi from "date-fns/esm/locale/fi/index.js";
import Friends from "./Friends";
import ListFriends from "./ListFriends";
import { v4 as uuidv4 } from "uuid";

export default function Container() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getAllUserReducer = useSelector((state) => state.getAllUserReducer);
  const { listAllUsers } = getAllUserReducer;
  const getUserReducer = useSelector((state) => state.getUserReducer);
  const { users, loading } = getUserReducer;
  const getContent = useSelector((state) => state.getContent);
  const { contents, loading: loadingRender } = getContent;
  const updateContentPostReducer = useSelector(
    (state) => state.updateContentPostReducer
  );
  const { success: updateLikeSuccess } = updateContentPostReducer;
  const addContent = useSelector((state) => state.addContent);
  const { success: successPort } = addContent;
  const updateCommentReducer = useSelector(
    (state) => state.updateCommentReducer
  );
  const { success: successComment } = updateCommentReducer;
  const updateCommentChild = useSelector((state) => state.updateCommentChild);
  const { success: successCommentChild } = updateCommentChild;
  const [visible, setVisible] = useState(0);
  const [inputComment, setInputComment] = useState("");
  const [postContent, setPostContent] = useState("");

  useEffect(() => {
    if (users) {
      dispatch(getContentPost(users));
    }
  }, [dispatch, users]);

  useEffect(() => {
    dispatch(getAllUsersAction());
  }, [dispatch]);

  useEffect(() => {
    if (updateLikeSuccess) {
      dispatch(getContentPost(users));
      dispatch({ type: UPDATE_CONTENT_RESET });
    }
    if (successComment) {
      dispatch(getContentPost(users));
      dispatch({ type: UPDATE_COMMENTS_RESET });
    }
    if (successCommentChild) {
      dispatch(getContentPost(users));
      dispatch({ type: UPDATE_COMMENTSCHILD_RESET });
    }
  }, [dispatch, updateLikeSuccess, successComment, successCommentChild, users]);

  useEffect(() => {
    if (successPort) {
      dispatch({ type: ADD_CONTENT_RESET });
      dispatch(getContentPost(users));
      notification.success({
        message: "Đăng bài thành công",
        duration: 2,
      });
    }
  }, [successPort, dispatch, users]);

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateCommentPost({
        users,
        content: inputComment,
        postContent,
        id: uuidv4(),
      })
    );
    setInputComment("");
    setPostContent("");
  };

  const handlerFuntion = (value) => {
    let data = {};
    let formattedDate = "";
    const seconds = value?.createAt?.seconds;

    if (listAllUsers) {
      data = listAllUsers?.find((user) => user?.id === value?.idUser);
    }

    if (seconds) {
      let formatDay = format(new Date(seconds * 1000), "dd-MM-yyyy");
      let formatTime =
        ("00" + new Date(seconds * 1000).getHours()).slice(-2) +
        ":" +
        ("00" + new Date(seconds * 1000).getMinutes()).slice(-2);
      formattedDate = formatTime + " " + formatDay;
    }
    return (
      <>
        <img src={data?.urlImage}></img>
        <div className="container-news__flex-one">
          <span>{data?.name}</span>
          <span>{formattedDate}</span>
        </div>
      </>
    );
  };

  function formatDate(seconds) {
    let formattedDate = "";

    if (seconds) {
      let formatDay = format(new Date(seconds * 1000), "dd-MM-yyyy");
      let formatTime =
        ("00" + new Date(seconds * 1000).getHours()).slice(-2) +
        ":" +
        ("00" + new Date(seconds * 1000).getMinutes()).slice(-2);
      formattedDate = formatTime + " " + formatDay;
    }
    return formattedDate;
  }

  return (
    <>
      <div className="container">
        {loadingRender && (
          <Spin
            size="large"
            indicator={<LoadingOutlined />}
            style={{ position: "absolute", left: "50%", top: "10%" }}
          />
        )}
        {loading ? (
          <Spin
            size="large"
            indicator={<LoadingOutlined />}
            style={{ position: "absolute", left: "50%", top: "10%" }}
          />
        ) : (
          <div className="container-row">
            <Row gutter={[24, 16]}>
              <Col xs={0} sm={6} md={6} lg={6}>
                <div className="container-profile">
                  <div className="container-profile__noti">
                    <div className="container-profile__noti-flex">
                      <img src={users?.urlImage}></img>
                      <div
                        className="container-profile__noti-flex"
                        style={{
                          flexDirection: "column",
                        }}
                      >
                        <span>{users?.name}</span>
                        <span>Bạn bè: {users?.friends.length || 0}</span>
                      </div>
                    </div>
                    <i
                      className="fa-sharp fa-solid fa-gear"
                      onClick={() => {
                        navigate("/profile");
                      }}
                    ></i>
                  </div>
                  <div className="container-profile__adress">
                    <div className="container-profile__adress-flex">
                      <i
                        className="fa-solid fa-user"
                        style={{ fontSize: "2.2rem" }}
                      ></i>
                      <span>{users?.sex}</span>
                    </div>
                    <div className="container-profile__adress-flex">
                      <i className="fa-solid fa-envelope"></i>
                      <span>{users?.email}</span>
                    </div>
                    <div className="container-profile__adress-flex">
                      <i className="fa-solid fa-location-dot"></i>
                      <span>{users?.address}</span>
                    </div>
                    <div className="container-profile__adress-flex">
                      <i className="fa-solid fa-phone"></i>
                      <span>{users?.phone}</span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12}>
                <div>
                  <div className="container-noti">
                    <div className="container-noti__flex">
                      <img
                        onClick={() => navigate("/profile")}
                        style={{ cursor: "pointer" }}
                        src={users?.urlImage}
                      ></img>
                      <>
                        <ModalPostNoti
                          className="container-noti__flex-div"
                          title="Tạo bài viết"
                          content={users}
                        />
                      </>
                    </div>
                  </div>
                  <div className="form-comment">
                    {contents?.map((content) => (
                      <div key={content?.id} className="container-news">
                        <div className="container-news__flex">
                          <div>
                            {handlerFuntion(content)}
                            {/* <img src={content?.urlUser}></img> */}
                            {/* <div className="container-news__flex-one">
                              <span>{content?.nameUser}</span>
                              <span>
                                {formatDate(content?.createAt.seconds)}
                              </span>
                            </div> */}
                          </div>
                          <i className="fa-solid fa-user-group"></i>
                        </div>
                        <div className="container-news__content">
                          <span>{content?.content}</span>
                          <Image.PreviewGroup>
                            {content?.arrUrlImage?.map((url, index) => (
                              <Image
                                style={index > 0 ? { display: "none" } : {}}
                                key={url?.idImage}
                                src={url?.urlImage}
                              ></Image>
                            ))}
                          </Image.PreviewGroup>
                        </div>
                        <div className="container-news__view">
                          <div className="container-news__view-user">
                            <div style={{ justifyContent: "space-between" }}>
                              <span className="container-news__view-flex">
                                <LikeOutlined style={{ color: "#0f90f2" }} />
                                <HeartOutlined style={{ color: "#f23d5d" }} />
                                {content?.like.length} người yêu thích
                              </span>
                              <span className="container-news__view-flex">
                                {content?.comments?.length} bình luận
                              </span>
                            </div>
                          </div>
                          <div className="container-news__view-icon">
                            <Status content={content} users={users} />
                            <Button icon={<CommentOutlined />}>
                              Bình luận
                            </Button>
                            <Button icon={<SendOutlined />}>Chia sẻ</Button>
                          </div>
                          <div className="container-news__view-mess">
                            <div className="container-news__view-noti">
                              <img
                                src={users?.urlImage}
                                style={{ height: "32px", width: "32px" }}
                              ></img>
                              <form onSubmit={(e) => handlerSubmit(e)}>
                                <Input
                                  onClick={() => setPostContent(content)}
                                  onChange={(e) =>
                                    setInputComment(e.target.value)
                                  }
                                  placeholder="Viết bình luận"
                                ></Input>
                              </form>
                            </div>
                            <Comment
                              users={users}
                              data={content}
                              listAllUsers={listAllUsers}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
              <Col xs={0} sm={6} md={6} lg={6}>
                <div className="container-profile container-friend">
                  <span className="container-friend__text">Bạn bè</span>
                  <div className="list-friend">
                    <ListFriends users={users} listAllUsers={listAllUsers} />
                  </div>
                </div>
                <div
                  className="container-profile container-friend"
                  style={{ marginTop: "10px" }}
                >
                  <span className="container-friend__text">Gợi ý</span>
                  <div className="list-friend">
                    <Friends users={users} listAllUsers={listAllUsers} />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </>
  );
}
