import { memo } from "react";

export default memo(function FriendsMessenge({ user, listAllUsers }) {
  let data = {};
  if (listAllUsers) {
    data = listAllUsers?.find((data) => data?.id === user?.idFriend);
  }

  return (
    <>
      <div
        className="messenger-zoom__header"
        style={{ border: "none", padding: "5px 0" }}
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
