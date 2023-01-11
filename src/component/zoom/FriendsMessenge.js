import { memo, useEffect } from "react";
import { addZoom } from "../../Redux/Action/MessengerAction";
import { ADD_MEESENGER_RESET } from "../../Redux/Container/MessengerContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default memo(function FriendsMessenge({ user, users, listAllUsers }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addZoomReducer = useSelector((state) => state.addZoomReducer);
  const { success, idchatZoom } = addZoomReducer;
  useEffect(() => {
    if (success) {
      dispatch({ type: ADD_MEESENGER_RESET });
      navigate(`/messenger/${idchatZoom}`);
    }
  }, [success, dispatch]);

  let data = {};
  if (listAllUsers) {
    data = listAllUsers?.find((data) => data?.id === user?.idFriend);
  }

  return (
    <>
      <div
        className="messenger-zoom__header"
        style={{ border: "none", padding: "5px 0" }}
        onClick={() =>
          dispatch(
            addZoom({ id: uuidv4(), idUser: users?.id, idFriend: data?.id })
          )
        }
      >
        <div className="child-one">
          <img src={data?.urlImage}></img>
          <div
            className="messenger-zoom__header-div"
            style={{
              flexDirection: "column",
            }}
          >
            <span>{data?.name}</span>
            <span>{data?.address}</span>
          </div>
        </div>
      </div>
    </>
  );
});
