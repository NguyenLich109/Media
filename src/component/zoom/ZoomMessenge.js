import { memo, useEffect, useState } from "react";
import { Col, Row, Input, Avatar, Tooltip, Spin } from "antd";
import { FileImageOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "../../firebase/config";
import { LoadingOutlined } from "@ant-design/icons";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import FriendsMessenge from "./FriendsMessenge";
import FrameChatFriend from "./FrameChatFriend";
import PrintChat from "./PrintChat";
import { getZoom, updateZoom } from "../../Redux/Action/MessengerAction";
import "./style.scss";
export default memo(function ZoomMessenge({ id }) {
  const dispatch = useDispatch();

  const getAllUserReducer = useSelector((state) => state.getAllUserReducer);
  const { listAllUsers } = getAllUserReducer;
  const getUserReducer = useSelector((state) => state.getUserReducer);
  const { users } = getUserReducer;
  const getZoomReducer = useSelector((state) => state.getZoomReducer);
  const { zoom, loading } = getZoomReducer;
  const [messenge, setMessenge] = useState("");
  const [file, setFile] = useState();

  useEffect(() => {
    if (file !== undefined) {
      const storageRef = ref(getStorage(), `imageZoomChat/${file?.uid}`);

      uploadBytes(storageRef, file?.url, {
        contentType: "image/jpeg",
      }).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          dispatch(
            updateZoom({
              id,
              uid: uuidv4(),
              idUser: users?.id,
              content: downloadURL,
              nameUrl: file?.uid,
            })
          );
          setFile();
        });
      });
    }
  }, [file]);

  useEffect(() => {
    dispatch(getZoom(id));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateZoom({
        id,
        uid: uuidv4(),
        idUser: users?.id,
        content: messenge,
        nameUrl: "",
      })
    );
    setMessenge("");
  };
  return (
    <>
      <div className="container">
        <Row>
          <Col xs={0} sm={6} md={6} lg={6}>
            <div className="messenger">
              <div className="messenger-friend">
                <span className="messenger-friend__span">Chat</span>
                <Input.Search placeholder="Search" />
              </div>
              <div className="messenger-list">
                <span className="messenger-list__span">Danh sách bạn bè</span>
                <ul>
                  {users?.friends?.map((user) => (
                    <li key={user.id}>
                      <FriendsMessenge
                        user={user}
                        listAllUsers={listAllUsers}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={18} md={18} lg={18}>
            <div className="messenger-zoom">
              <FrameChatFriend
                zoom={zoom}
                users={users}
                listAllUsers={listAllUsers}
              />
              {loading ? (
                <Spin
                  size="large"
                  indicator={<LoadingOutlined />}
                  style={{ position: "absolute", left: "50%", top: "10%" }}
                />
              ) : (
                <div className="messenger-chat">
                  <ul style={{ listStyle: "none" }}>
                    <PrintChat
                      zoom={zoom}
                      users={users}
                      listAllUsers={listAllUsers}
                    />
                  </ul>
                </div>
              )}
              <div className="messenger-zoom__footer">
                <label htmlFor="files" style={{ padding: "0 5px 0 10px" }}>
                  <Avatar.Group style={{ cursor: "pointer" }}>
                    <Tooltip title="Thêm" placement="top">
                      <Avatar
                        shape="square"
                        style={{
                          backgroundColor: "#45bd62",
                          borderRadius: "50px",
                        }}
                        icon={<PlusCircleOutlined />}
                      />
                    </Tooltip>
                  </Avatar.Group>
                </label>
                <label htmlFor="files">
                  <Avatar.Group style={{ cursor: "pointer" }}>
                    <Tooltip title="Ảnh" placement="top">
                      <Avatar
                        shape="square"
                        style={{ backgroundColor: "#45bd62" }}
                        icon={<FileImageOutlined />}
                      />
                    </Tooltip>
                  </Avatar.Group>
                </label>
                <input
                  style={{ display: "none" }}
                  id="files"
                  type="file"
                  onChange={(e) =>
                    setFile({ url: e.target.files[0], uid: uuidv4() })
                  }
                ></input>
                <form onSubmit={handleSubmit}>
                  <Input
                    style={{ backgroundColor: "#f0f2f5" }}
                    placeholder="Aa"
                    value={messenge}
                    onChange={(e) => setMessenge(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
});
