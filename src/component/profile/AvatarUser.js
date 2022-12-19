import React from "react";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Divider, Tooltip } from "antd";
import "./index.scss";

export default function AvatarUser() {
  return (
    <>
      <Avatar.Group>
        <Tooltip title="Ant User" placement="top">
          <Avatar
            src="https://joeschmoe.io/api/v1/random"
            style={{
              backgroundColor: "#87d068",
            }}
          />
        </Tooltip>
        <Tooltip title="Ant User" placement="top">
          <Avatar
            style={{
              backgroundColor: "#87d068",
            }}
            src="https://joeschmoe.io/api/v1/random"
          />
        </Tooltip>
        <Tooltip title="Ant User" placement="top">
          <Avatar
            style={{
              backgroundColor: "#87d068",
            }}
            src="https://joeschmoe.io/api/v1/random"
          />
        </Tooltip>
      </Avatar.Group>
    </>
  );
}
