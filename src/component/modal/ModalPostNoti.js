import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Image,
  Modal,
  Select,
  Input,
  Avatar,
  Tooltip,
  Row,
  Col,
  notification,
} from "antd";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { FileImageOutlined, CloseOutlined } from "@ant-design/icons";
import { deleteModal } from "../../Redux/Action/ModalAction";
import {
  addContentPost,
  getContentPost,
} from "../../Redux/Action/ContentPostAction";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";

export default function ModalPostNoti({ title, content }) {
  const dispatch = useDispatch();
  const { TextArea } = Input;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [cntent, setCntent] = useState("");

  const [image, setImage] = useState([]);
  const [images, setImages] = useState([]);

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    dispatch(deleteModal(false));
    setOpen(false);
  };
  const handleChange = (value) => {
    setStatus(value);
  };
  const handlerText = (e) => {
    setCntent(e.target.value);
  };
  useEffect(() => {
    if (image.length > 0) {
      let arrs = [];
      for (let i = 0; i < image.length; i++) {
        arrs.push({ urlImage: image[i], id: uuidv4() });
      }
      setImages((images) => [...images, ...arrs]);
      setImage([]);
    }
  }, [image]);
  const handlerDelete = (id) => {
    const arrs = images?.filter((image) => image.id !== id);
    setImages(arrs);
  };

  const handleOk = () => {
    const arrImage = [];
    for (let i = 0; i < images?.length; i++) {
      uploadBytes(
        ref(getStorage(), `imagePosts/${images[i]?.id}`),
        images[i]?.urlImage,
        {
          contentType: "image/jpeg",
        }
      ).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          arrImage.push({ urlImage: downloadURL, idImage: images[i]?.id });
          if (images.length === arrImage.length) {
            dispatch(
              addContentPost({
                nameUser: content?.name,
                urlUser: content?.urlImage,
                status: status,
                content: cntent,
                arrUrl: arrImage,
                idUser: content?.id,
                id: uuidv4(),
              })
            );
            setCntent("");
            setImages([]);
          }
        });
      });
    }

    setOpen(false);
    dispatch(deleteModal(false));
  };
  return (
    <>
      <span
        style={{
          width: "90%",
          backgroundColor: "#cccccc33",
          padding: "10px 20px",
          borderRadius: "20px",
          cursor: "pointer",
        }}
        onClick={showModal}
      >
        {content?.name} ??i, b???n ??ang ngh?? g?? th????
      </span>
      <Modal
        title={title}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="modal-content">
          <div className="container-profile__noti-flex modal__content-user">
            <img src={content?.urlImage}></img>
            <div
              className="container-profile__noti-flex"
              style={{
                flexDirection: "column",
              }}
            >
              <span>{content?.name}</span>
              <Select
                defaultValue={status}
                size="small"
                style={{ width: 130 }}
                onChange={handleChange}
                options={[
                  {
                    value: false,
                    label: "B???n b??",
                  },
                  {
                    value: true,
                    label: "Ch??? m??nh t??i",
                  },
                ]}
              />
            </div>
          </div>
          <TextArea
            placeholder="N???i dung m?? b???n mu???n vi???t"
            onChange={(e) => handlerText(e)}
            value={cntent}
            rows={6}
          />
          {images.length > 0 && (
            <div className="modal-content__printImage">
              <Row gutter={[16, 16]}>
                {images?.map((image) => (
                  <Col
                    span={8}
                    key={image?.id}
                    className="modal-image__printImage"
                  >
                    <Image src={URL.createObjectURL(image?.urlImage)}></Image>
                    <Button
                      onClick={() => handlerDelete(image?.id)}
                      size="small"
                      icon={<CloseOutlined />}
                    ></Button>
                  </Col>
                ))}
              </Row>
            </div>
          )}
          <div className="modal__content-image">
            <span className="modal__content-text">
              Th??m v??o b??i vi???t c???a b???n
            </span>
            <label htmlFor="files">
              <Avatar.Group style={{ cursor: "pointer" }}>
                <Tooltip title="???nh" placement="top">
                  <Avatar
                    shape="square"
                    style={{ backgroundColor: "#45bd62" }}
                    icon={<FileImageOutlined />}
                  />
                </Tooltip>
              </Avatar.Group>
            </label>
            <Input
              style={{ display: "none" }}
              id="files"
              type="file"
              multiple
              onChange={(e) => {
                setImage(e.target.files);
              }}
            ></Input>
          </div>
        </div>
      </Modal>
    </>
  );
}
