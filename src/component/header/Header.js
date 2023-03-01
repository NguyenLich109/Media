import { useState, useEffect } from "react";
import { auth } from "../../firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { Row, Col, Input, Dropdown, message, Spin, Image, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD_USER_RESET } from "../../Redux/Container/UseContainer";
import { UPDATE_FRIENDS_RESET } from "../../Redux/Container/FriendsContainer";
import { getProfile, addUser } from "../../Redux/Action/UserAction";
import { getCommentsNoti } from "../../Redux/Action/ContentPostAction";
import {
  getNotiFriendAction,
  updateFriendAction,
  getFriendAction,
} from "../../Redux/Action/FriendsAction";
import { getAllUsersAction } from "../../Redux/Action/UserAction";
import Toast from "../Toast";
import "./index.scss";

export default function Header() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userIf = useSelector((state) => state.addUserReducer);
  const { users, success } = userIf;
  const getUserReducer = useSelector((state) => state.getUserReducer);
  const { users: userInfo } = getUserReducer;
  const getNotiFriend = useSelector((state) => state.getNotiFriend);
  const { notiFriends } = getNotiFriend;
  const updateFriend = useSelector((state) => state.updateFriend);
  const { success: successUpdate, error } = updateFriend;
  const getCommmentReducer = useSelector((state) => state.getCommmentReducer);
  const { getComments } = getCommmentReducer;
  const getAllUserReducer = useSelector((state) => state.getAllUserReducer);
  const { listAllUsers } = getAllUserReducer;
  const [checkUser, setCheckUser] = useState(true);
  const [notiBell, setNotiBell] = useState([]);

  useEffect(() => {
    dispatch(getAllUsersAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UPDATE_FRIENDS_RESET });
      dispatch(getNotiFriendAction(userInfo?.id));
      dispatch(getFriendAction(userInfo?.id));
      dispatch(getProfile());
    }
    if (error) {
      dispatch({ type: UPDATE_FRIENDS_RESET });
      dispatch(getNotiFriendAction(userInfo?.id));
      dispatch(getFriendAction(userInfo?.id));
    }
  }, [dispatch, userInfo, successUpdate, error]);

  useEffect(() => {
    if (users) {
      dispatch(getNotiFriendAction(users?.id));
      dispatch(getCommentsNoti(users?.id));
    }
  }, [dispatch, users]);

  const onClick = () => {
    signOut(auth);
    localStorage.removeItem("userInfo");
    navigate("/login");
  };
  const items = [
    {
      label: "Đăng xuất",
      key: "1",
    },
  ];
  const arrProfile = [
    {
      label: "Thông tin",
      key: "1",
    },
  ];

  useEffect(() => {
    let arrItem = [];
    getComments?.forEach((item, index) => {
      arrItem.push({
        label: (
          <div style={{ width: "300px" }}>
            <b style={{ fontSize: "1.5rem" }}>{item?.nameUser}</b>
            <span> </span>
            <span style={{ fontSize: "1.5rem" }}>
              đã bình luận về bài viết của bạn.
            </span>
          </div>
        ),
        key: index,
      });
      return arrItem;
    });
    notiFriends?.forEach((item, index) => {
      item?.status !== true &&
        arrItem.push({
          label: (
            <div style={{ maxWidth: "300px" }}>
              <b style={{ fontSize: "1.5rem" }}>{item?.nameUser}</b>
              <span> </span>
              <span style={{ fontSize: "1.5rem" }}>
                đã gửi cho bạn lời mời kết bạn.
              </span>
              <div style={{ marginTop: "5px" }}>
                <Button
                  onClick={() => {
                    dispatch(
                      updateFriendAction({
                        id: item?.idFriend,
                        idFriend: item?.idUser,
                        number: 0,
                      })
                    );
                  }}
                  style={{ width: "50%" }}
                >
                  Hủy
                </Button>
                <Button
                  onClick={() => {
                    dispatch(
                      updateFriendAction({
                        id: item?.idFriend,
                        idFriend: item?.idUser,
                        number: 1,
                      })
                    );
                  }}
                  style={{
                    width: "50%",
                    backgroundColor: "#0f90f2",
                    color: "#fff",
                  }}
                >
                  Đồng ý
                </Button>
              </div>
            </div>
          ),
          key: item?.idUser,
        });
      return arrItem;
    });

    setNotiBell(arrItem);
  }, [notiFriends]);

  useEffect(() => {
    try {
      if (checkUser) {
        const unsubscibed = onAuthStateChanged(auth, (user) => {
          if (user) {
            const { uid } = user;
            dispatch(
              addUser({
                uid,
              })
            );
          } else {
            navigate("/login");
            return;
          }
          setCheckUser(false);
        });
        return () => {
          unsubscibed();
        };
      }
    } catch (error) {
      console.log(error);
    }
  }, [checkUser]);

  const handlerOnclick = () => {
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  // const handleClick = (e) => {
  //   console.log(e.key);
  // };

  return (
    <div className="app-header">
      <div className="header">
        <Row
          gutter={[24, 16]}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Col xs={16} sm={12} md={10} lg={8} xl={8}>
            <div className="header-search">
              <span
                className="header-span"
                style={{ cursor: "pointer" }}
                onClick={handlerOnclick}
              >
                Media
              </span>
              <Input.Search placeholder="Search" />
            </div>
          </Col>
          <Col className="fix-padding" xs={8} sm={8} md={6} lg={4} xl={4}>
            <ul style={{ display: "flex", alignItems: "center" }}>
              {/* <li>
                <i className="fa-solid fa-moon"></i>
              </li> */}
              <li>
                <Dropdown
                  menu={{
                    items: notiBell,
                    // onClick: handleClick,
                  }}
                  placement="bottom"
                  arrow
                >
                  <i className="fa-solid fa-bell"></i>
                </Dropdown>
              </li>
              <li>
                <Dropdown
                  menu={{
                    items: arrProfile,
                    onClick: handleProfile,
                  }}
                  placement="bottom"
                  arrow
                >
                  <i className="fa-solid fa-user"></i>
                </Dropdown>
              </li>
              <li>
                <Dropdown
                  menu={{
                    items,
                    onClick,
                  }}
                >
                  <div
                    onClick={(e) => e.preventDefault()}
                    style={{ lineHeight: "20px" }}
                  >
                    {userInfo ? (
                      <img
                        src={userInfo?.urlImage}
                        style={{
                          height: "30px",
                          width: "30px",
                          borderRadius: "50%",
                          lineHeight: "30px",
                        }}
                      ></img>
                    ) : (
                      <img
                        src="https://img.freepik.com/free-icon/user_318-875902.jpg?w=2000"
                        style={{
                          height: "30px",
                          width: "30px",
                          borderRadius: "50%",
                          lineHeight: "30px",
                        }}
                      ></img>
                    )}
                  </div>
                </Dropdown>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
}
