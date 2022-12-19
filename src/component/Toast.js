import React from "react";
import { notification, Space } from "antd";
export default function ToastToast(data) {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (data) => {
    api[data.type]({
      message: data.message,
      description: data.description,
    });
  };
  openNotificationWithIcon(data);
  return <>{contextHolder}</>;
}
