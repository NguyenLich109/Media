import { doc, getDoc } from "firebase/firestore";
import {
  LikeOutlined,
  LikeFilled,
  CommentOutlined,
  SendOutlined,
  HeartOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Row, Col, Button, Input, notification } from "antd";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatRelative } from "date-fns/esm";
import { format } from "date-fns";
import Comment from "./Comment";
import { getContentPost } from "../../Redux/Action/ContentPostAction";
import { getAllUsersAction } from "../../Redux/Action/UserAction";
import { ADD_USER_RESET } from "../../Redux/Container/UseContainer";
import { ADD_CONTENT_RESET } from "../../Redux/Container/ContentPostContainer";
import { Image, Spin } from "antd";
import ModalPostNoti from "../modal/ModalPostNoti";
import { auth, db } from "../../firebase/config";
import "./index.scss";

export default function Container() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getAllUserReducer = useSelector((state) => state.getAllUserReducer);
  const { listAllUsers } = getAllUserReducer;
  const getUserReducer = useSelector((state) => state.getUserReducer);
  const { users, loading } = getUserReducer;
  const getContent = useSelector((state) => state.getContent);
  const { contents } = getContent;
  const addContent = useSelector((state) => state.addContent);
  const { success: successPort } = addContent;
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    dispatch(getContentPost());
    dispatch(getAllUsersAction());
  }, [dispatch]);

  useEffect(() => {
    if (successPort) {
      dispatch({ type: ADD_CONTENT_RESET });
      dispatch(getContentPost());
      notification.success({
        message: "Đăng bài thành công",
        duration: 2,
      });
    }
  }, [successPort, dispatch]);

  const handlerSubmit = (e) => {
    e.preventDefault();
    alert("jee");
  };

  const handlerFuntion = (value) => {
    let data = {};
    if (listAllUsers) {
      data = listAllUsers?.find((user) => user?.id === value?.idUser);
    }
    return <img src={data?.urlImage}></img>;
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
                        <span>Bạn bè: {users?.friends || 0}</span>
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
                            <div className="container-news__flex-one">
                              <span>{content?.nameUser}</span>
                              <span>
                                {formatDate(content?.createAt.seconds)}
                              </span>
                            </div>
                          </div>
                          <i className="fa-solid fa-user-group"></i>
                        </div>
                        <div className="container-news__content">
                          <span>{content?.content}</span>
                          <Image.PreviewGroup>
                            {content?.arrUrlImage?.map((url, index) => (
                              <Image
                                style={index > 0 ? { display: "none" } : ""}
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
                                {content?.like} người yêu thích
                              </span>
                              <span className="container-news__view-flex">
                                {content?.comments?.length} bình luận
                              </span>
                            </div>
                          </div>
                          <div className="container-news__view-icon">
                            <Button icon={<LikeOutlined />}>Thích</Button>
                            <Button icon={<CommentOutlined />}>
                              Bình luận
                            </Button>
                            <Button icon={<SendOutlined />}>Chia sẻ</Button>
                          </div>
                          <div className="container-news__view-mess">
                            <div className="container-news__view-noti">
                              <img src="https://genk.mediacdn.vn/2019/7/8/1-15625474669018688730.jpg"></img>
                              <form onSubmit={handlerSubmit}>
                                <Input placeholder="Viết bình luận"></Input>
                              </form>
                            </div>
                            <Comment />
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
                    <div className="container-profile__noti">
                      <div className="container-profile__noti-flex">
                        <img src="https://genk.mediacdn.vn/2019/7/8/1-15625474669018688730.jpg"></img>
                        <div
                          className="container-profile__noti-flex"
                          style={{
                            flexDirection: "column",
                          }}
                        >
                          <span>Nguyễn Lịch</span>
                          <span>Hà nội</span>
                        </div>
                      </div>
                      <i className="fa-solid fa-message"></i>
                    </div>
                    <div className="container-profile__noti">
                      <div className="container-profile__noti-flex">
                        <img src="https://genk.mediacdn.vn/2019/7/8/1-15625474669018688730.jpg"></img>
                        <div
                          className="container-profile__noti-flex"
                          style={{
                            flexDirection: "column",
                          }}
                        >
                          <span>Văn Long</span>
                          <span>Thanh Hóa</span>
                        </div>
                      </div>
                      <i className="fa-solid fa-message"></i>
                    </div>
                  </div>
                </div>
                <div
                  className="container-profile container-friend"
                  style={{ marginTop: "10px" }}
                >
                  <span className="container-friend__text">Gợi ý</span>
                  <div className="list-friend">
                    {listAllUsers?.map((user) => (
                      <>
                        {user?.id !== users?.id && (
                          <div
                            key={user?.id}
                            className="container-profile__noti"
                          >
                            <div className="container-profile__noti-flex">
                              <img src={user?.urlImage}></img>
                              <div
                                className="container-profile__noti-flex"
                                style={{
                                  flexDirection: "column",
                                }}
                              >
                                <span>{user?.name}</span>
                                <span>{user?.address}</span>
                              </div>
                            </div>
                            <i className="fa-solid fa-user-group"></i>
                          </div>
                        )}
                      </>
                    ))}
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
