import { memo } from "react";

export default memo(function FrameChatFriend({ zoom, users, listAllUsers }) {
  const findFriend = zoom?.arrs?.find((arr) => arr !== users?.id);
  const printFind = listAllUsers?.find((user) => user?.id === findFriend);

  return (
    <div className="messenger-zoom__header">
      <div className="child-one">
        <img src={printFind?.urlImage}></img>
        <div
          className="messenger-zoom__header-div"
          style={{
            flexDirection: "column",
          }}
        >
          <span>{printFind?.name}</span>
          <span>{printFind?.address}</span>
        </div>
      </div>
      <i className="fa-solid fa-ellipsis"></i>
    </div>
  );
});
