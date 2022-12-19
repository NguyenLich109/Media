import { useState, useEffect } from "react";
import { auth } from "../../firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { Row, Col, Input, Dropdown, message, Spin, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD_USER_RESET } from "../../Redux/Container/UseContainer";
import { getProfile, addUser } from "../../Redux/Action/UserAction";
import Toast from "../Toast";
import "./index.scss";

export default function Header() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userIf = useSelector((state) => state.addUserReducer);
  const { users, success } = userIf;
  const getUserReducer = useSelector((state) => state.getUserReducer);
  const { users: userInfo } = getUserReducer;
  const [checkUser, setCheckUser] = useState(true);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

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
    if (users) {
      navigate("/");
    }
  };

  return (
    <div className="app-header">
      <div className="header">
        <Row
          gutter={[24, 16]}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Col xs={18} sm={12} md={10} lg={8} xl={8}>
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
          <Col xs={6} sm={8} md={6} lg={4} xl={4}>
            <ul style={{ display: "flex", alignItems: "center" }}>
              <li>
                <i className="fa-solid fa-sun"></i>
                {/* <i className="fa-solid fa-moon"></i> */}
              </li>
              <li>
                <i className="fa-solid fa-message"></i>
              </li>
              <li>
                <i className="fa-solid fa-bell"></i>
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
                      <i className="fa-solid fa-user"></i>
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
