import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

import { addZoom } from "../../Redux/Action/MessengerAction";
import { ADD_MEESENGER_RESET } from "../../Redux/Container/MessengerContainer";

export default memo(function ListFriends({ users, listAllUsers }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addZoomReducer = useSelector((state) => state.addZoomReducer);
  const { success, idchatZoom } = addZoomReducer;

  useEffect(() => {
    if (success) {
      dispatch({ type: ADD_MEESENGER_RESET });
      navigate(`/messenger/${idchatZoom}`);
    }
  }, [success, dispatch]);

  const handlerFuntion = (value) => {
    let data = {};
    if (listAllUsers) {
      data = listAllUsers?.find((user) => user?.id === value?.idFriend);
    }

    const handleClick = (data) => {
      dispatch(
        addZoom({ id: uuidv4(), idUser: users?.id, idFriend: data?.id })
      );
    };
    return (
      <>
        <div className="container-profile__noti-flex">
          <img src={data?.urlImage}></img>
          <div
            className="container-profile__noti-flex"
            style={{
              flexDirection: "column",
            }}
          >
            <span>{data?.name}</span>
            <span>{data?.address}</span>
          </div>
        </div>
        <i
          onClick={() => handleClick(data)}
          className="fa-solid fa-message"
        ></i>
      </>
    );
  };

  return (
    <>
      {users?.friends?.map((friend, index) => (
        <div key={index} className="container-profile__noti">
          {handlerFuntion(friend)}
        </div>
      ))}
    </>
  );
});
