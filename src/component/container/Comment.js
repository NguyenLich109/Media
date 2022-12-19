import {
  LikeOutlined,
  LikeFilled,
  CommentOutlined,
  SendOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Row, Col, Button, Input } from "antd";

import "./index.scss";

export default function Comment() {
  return (
    <>
      <div className="comment-map">
        <div className="container-news__view-user container-news__flex padding-fix">
          <div>
            <img src="https://genk.mediacdn.vn/2019/7/8/1-15625474669018688730.jpg"></img>
            <div className="text-form">
              <div className="container-news__flex-one text-font">
                <span>Nguyễn Lịch</span>
                <span>
                  The Chinese citizenship number consists of six address codes,
                  eight birthdate codes, three sequential codes and one check
                  code
                </span>
              </div>
              <div className="font-size">
                <span>Thích</span>
                <span>Phản hồi</span>
                <span>13 Tháng 11 lúc 12:00</span>
              </div>
            </div>
          </div>
          <div className="comment-child">
            <div
              className="container-news__view-user container-news__flex"
              style={{ marginLeft: "5%", paddingTop: "5px" }}
            >
              <div>
                <img src="https://genk.mediacdn.vn/2019/7/8/1-15625474669018688730.jpg"></img>
                <div className="text-form">
                  <div className="container-news__flex-one text-font">
                    <span>Nguyễn Lịch</span>
                    <span>
                      The Chinese citizenship number consists of six address
                      codes, eight birthdate codes, three sequential codes and
                      one check code
                    </span>
                  </div>
                  <div className="font-size">
                    <span>Thích</span>
                    <span>Phản hồi</span>
                    <span>13 Tháng 11 lúc 12:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-news__view-noti">
            <img
              src="https://genk.mediacdn.vn/2019/7/8/1-15625474669018688730.jpg"
              style={{ marginRight: "0px" }}
            ></img>
            <form>
              <Input placeholder="Viết bình luận"></Input>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
