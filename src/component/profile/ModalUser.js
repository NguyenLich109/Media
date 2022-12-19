import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Form, Upload } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteModal } from "../../Redux/Action/ModalAction";
import { updateProfile, getProfile } from "../../Redux/Action/UserAction";
import { UPDATE_USER_RESET } from "../../Redux/Container/UseContainer";
import { v4 as uuidv4 } from "uuid";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default function ModalUser({ boolean, title, content }) {
  const dispatch = useDispatch();
  const storage = getStorage();
  const updateUserReducer = useSelector((state) => state.updateUserReducer);
  const { success } = updateUserReducer;
  const getUserReducer = useSelector((state) => state.getUserReducer);
  const { users, loading } = getUserReducer;
  const [open, setOpen] = useState(boolean);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [file, setFile] = useState();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");

  const metadata = {
    contentType: "image/jpeg",
  };

  useEffect(() => {
    if (file !== undefined) {
      const storageRef = ref(storage, `imageUser/${file?.uid}`);

      uploadBytes(storageRef, file?.url, metadata).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          dispatch(
            updateProfile({
              urlImage: downloadURL,
              nameImgae: file?.uid,
              id: users?.id,
            })
          );
        });
      });
    }
  }, [file]);

  useEffect(() => {
    setName(users?.name);
    setSex(users?.sex);
    setAddress(users?.address);
    setPhone(users?.phone);
  }, [users]);

  const handleOk = () => {
    dispatch(
      updateProfile({
        name,
        sex,
        address,
        phone,
        id: users?.id,
      })
    );
    dispatch(deleteModal(false));
  };
  const handleCancel = () => {
    setOpen(false);
    dispatch(deleteModal(false));
  };
  const handlerImage = (e) => {
    if (e.target.files[0]) {
      if (users?.nameImgae !== "") {
        deleteObject(ref(storage, `imageUser/${users?.nameImgae}`))
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      }
    }
    setFile({ url: e.target.files[0], uid: uuidv4() });
  };

  return (
    <>
      <Modal
        title={title}
        open={open}
        onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="modal_user">
          <div className="modal_image">
            <img
              src={file ? URL.createObjectURL(file?.url) : users?.urlImage}
              style={{ height: "110px", width: "110px", borderRadius: "50%" }}
            ></img>
            <label htmlFor="upload">
              <EditOutlined />
            </label>
            <Input
              style={{ display: "none" }}
              type="file"
              id="upload"
              onChange={(e) => handlerImage(e)}
            />
          </div>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
          >
            <Form.Item label="Họ tên">
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Giới tính">
              <Input value={sex} onChange={(e) => setSex(e.target.value)} />
            </Form.Item>
            <Form.Item label="Email">
              <Input disabled value={users?.email} />
            </Form.Item>
            <Form.Item label="Địa chỉ">
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Số điện thoại">
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}
