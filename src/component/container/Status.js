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
import { useState, useEffect, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateContentPost } from "../../Redux/Action/ContentPostAction";

export default memo(function Status({ content, users }) {
  const dispatch = useDispatch();
  const findUserLike = content?.like?.find((data) => data?.idU === users?.id);

  return (
    <Button
      style={
        findUserLike !== undefined ? { color: "red", borderColor: "red" } : {}
      }
    >
      {(findUserLike === undefined || findUserLike?.likeStatus === 1) && (
        <>
          <LikeOutlined /> Thích
        </>
      )}
      {findUserLike?.likeStatus === 2 && (
        <>
          <HeartOutlined /> Yêu
        </>
      )}
      {findUserLike?.likeStatus === 3 && (
        <>
          <SmileOutlined /> Cười
        </>
      )}
      <div className="container-news__view-icon__possion">
        <span
          onClick={() => {
            dispatch(
              updateContentPost({
                likeStatus: 1,
                idUser: users?.id,
                idContent: content?.id,
              })
            );
          }}
        >
          <LikeOutlined />
        </span>
        <span
          onClick={() =>
            dispatch(
              updateContentPost({
                likeStatus: 2,
                idUser: users?.id,
                idContent: content?.id,
              })
            )
          }
        >
          <HeartOutlined />
        </span>
        <span
          onClick={() =>
            dispatch(
              updateContentPost({
                likeStatus: 3,
                idUser: users?.id,
                idContent: content?.id,
              })
            )
          }
        >
          <SmileOutlined />
        </span>
        <span
          onClick={() =>
            dispatch(
              updateContentPost({
                likeStatus: 0,
                idUser: users?.id,
                idContent: content?.id,
              })
            )
          }
        >
          <CloseOutlined />
        </span>
      </div>
    </Button>
  );
});
