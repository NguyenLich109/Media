import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Button, Col, Row, Spin, notification, message } from "antd";
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { getProfile } from "../../Redux/Action/UserAction";
import ModalUser from "./ModalUser";
import AvatarUser from "./AvatarUser";
import { MODAL_RESET } from "../../Redux/Container/ModalContainer";
import { UPDATE_USER_RESET } from "../../Redux/Container/UseContainer";
import "./index.scss";
import Toast from "../Toast";

export default function ProfileUser() {
  const dispatch = useDispatch();
  const updateUserReducer = useSelector((state) => state.updateUserReducer);
  const { loading: loadingUpdate, success } = updateUserReducer;
  const modalDelete = useSelector((state) => state.modalDelete);
  const { check, success: successModal } = modalDelete;
  const getUserReducer = useSelector((state) => state.getUserReducer);
  const { users, loading } = getUserReducer;
  const [open, setOpen] = useState(false);

  const handlerEdit = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (success) {
      dispatch(getProfile());
      dispatch({ type: UPDATE_USER_RESET });
      notification.success({
        message: "Cập nhật thành công",
        duration: 2,
      });
    }
  }, [success]);
  useEffect(() => {
    if (successModal) {
      setOpen(check);
      dispatch({ type: MODAL_RESET });
    }
  }, [successModal]);

  return (
    <>
      <div className="container">
        {loading && (
          <Spin
            size="large"
            indicator={<LoadingOutlined />}
            style={{ position: "absolute", left: "50%", top: "10%" }}
          />
        )}
        <Row
          gutter={[16, 16]}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Col xs={24} sm={12} md={12} lg={12}>
            <div className="container-profileUser">
              <img
                src={users?.urlImage}
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                }}
              ></img>
              <div className="flex">
                <h2>{users?.name}</h2>
                <span>
                  Bạn bè: {users?.friends === "" ? 0 : users?.friends}
                </span>
                <AvatarUser />
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <div className="flex-right">
              <Button
                icon={<EditOutlined />}
                size={"small"}
                style={{
                  backgroundColor: "#e4e6eb",
                  height: "30px",
                  marginTop: "5px",
                }}
                onClick={handlerEdit}
              >
                Chỉnh sửa thông tin
              </Button>
              {open && (
                <ModalUser
                  boolean="true"
                  title="Chỉnh sửa thông tin"
                  content={users}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
