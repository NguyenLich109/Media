import { useEffect, useState, memo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  addFriendAction,
  getFriendAction,
} from "../../Redux/Action/FriendsAction";
import { ADD_FRIENDS_RESET } from "../../Redux/Container/FriendsContainer";

export default memo(function Friends({ users, listAllUsers }) {
  const dispatch = useDispatch();

  const getFriendReducer = useSelector((state) => state.getFriendReducer);
  const { getFriends } = getFriendReducer;
  const addFriendReducer = useSelector((state) => state.addFriendReducer);
  const { success } = addFriendReducer;

  useEffect(() => {
    dispatch(getFriendAction(users?.id));
  }, [dispatch, users]);
  useEffect(() => {
    if (success) {
      dispatch(getFriendAction(users?.id));
      dispatch({ type: ADD_FRIENDS_RESET });
    }
  }, [success, users]);

  const handleClick = ({ idFriend, email }) => {
    dispatch(
      addFriendAction({
        idUser: users?.id,
        nameUser: users?.name,
        email,
        idFriend,
        id: uuidv4(),
      })
    );
  };

  return (
    <>
      {getFriends?.map((user, index) => (
        <>
          {user?.id !== users?.id && (
            <div key={user?.id} className="container-profile__noti">
              <div className="container-profile__noti-flex">
                <img src={user?.urlImage}></img>
                <div
                  className="container-profile__noti-flex"
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <span>{user?.name}</span>
                  <span>{user?.address}</span>
                </div>
              </div>
              <i
                onClick={() =>
                  handleClick({
                    idFriend: user?.id,
                    email: user?.email,
                  })
                }
                className="fa-solid fa-user-group"
              ></i>
            </div>
          )}
        </>
      ))}
    </>
  );
});
