import { memo, useEffect, useState } from "react";
import { format } from "date-fns";
import { Dropdown, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteZoom } from "../../Redux/Action/MessengerAction";

export default memo(function PrintChat({ zoom, users, listAllUsers }) {
  const dispatch = useDispatch();
  const handlerFuntion = (value) => {
    const items = [
      {
        label: "Thu hồi",
        key: value?.id,
      },
    ];

    let data = {};
    let formattedDate = "";
    let seconds = value?.createAt?.seconds;
    if (seconds) {
      let formatDay = format(new Date(seconds * 1000), "dd-MM-yyyy");
      let formatTime =
        ("00" + new Date(seconds * 1000).getHours()).slice(-2) +
        ":" +
        ("00" + new Date(seconds * 1000).getMinutes()).slice(-2);
      formattedDate = "Lúc " + formatTime + " ngày " + formatDay;
    }

    if (listAllUsers) {
      data = listAllUsers?.find((user) => user?.id === value?.idUser);
    }

    const handClick = (data) => {
      dispatch(
        deleteZoom({ id: zoom?.id, uid: data?.key, nameUrl: value?.nameUrl })
        //console.log({ uid: data?.key, id: zoom?.id, nameUrl: value?.nameUrl })
      );
    };

    return (
      <>
        <div
          className="messenger-chat__div"
          style={
            users?.id === value?.idUser
              ? {
                  justifyContent: "flex-end",
                  alignItems: "center",
                }
              : {}
          }
        >
          {users?.id !== value?.idUser && (
            <img className="img-chat" src={data?.urlImage}></img>
          )}
          {users?.id === value?.idUser && (
            <Dropdown
              menu={{
                items: items,
                onClick: handClick,
              }}
              placement="top"
              arrow
            >
              <i className="text-icon fa-solid fa-ellipsis"></i>
            </Dropdown>
          )}
          <div
            className="messenger-zoom__header-div"
            style={
              users?.id === value?.idUser
                ? {
                    backgroundColor: "#0084ff2b",
                  }
                : {}
            }
          >
            <span>{users?.id !== value?.idUser && data?.name}</span>
            <span
              className="text-content"
              style={value?.check ? { color: "#888585" } : {}}
            >
              {value?.nameUrl === "" && value?.content}
              {value?.nameUrl !== "" && (
                <Image
                  width={200}
                  style={{ margin: "0" }}
                  src={value?.content}
                />
              )}
            </span>
            <span>{formattedDate}</span>
          </div>
          {users?.id === value?.idUser && (
            <img className="img-chat" src={data?.urlImage}></img>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      {zoom?.chatZoom?.map((value, index) => (
        <li key={index}>{handlerFuntion(value)}</li>
      ))}
    </>
  );
});
