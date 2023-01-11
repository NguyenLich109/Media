import { auth, db } from "../../firebase/config";
import {
  collection,
  doc,
  addDoc,
  serverTimestamp,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
  Timestamp,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import {
  ADD_FRIENDS_ERROR,
  ADD_FRIENDS_REQUEST,
  ADD_FRIENDS_SUCCESS,
  GET_FRIENDS_ERROR,
  GET_FRIENDS_REQUEST,
  GET_FRIENDS_SUCCESS,
  GET_NOTI_FRIENDS_ERROR,
  GET_NOTI_FRIENDS_SUCCESS,
  UPDATE_FRIENDS_ERROR,
  UPDATE_FRIENDS_REQUEST,
  UPDATE_FRIENDS_SUCCESS,
} from "../Container/FriendsContainer";

export const addFriendAction = (data) => async (dispatch) => {
  try {
    const { idUser, nameUser, email, idFriend, id } = data;
    dispatch({ type: ADD_FRIENDS_REQUEST });
    await setDoc(doc(db, "NotiFriends", id), {
      idUser,
      nameUser,
      email,
      idFriend,
      id,
      status: false,
      createAt: Timestamp.now(),
    });
    dispatch({
      type: ADD_FRIENDS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADD_FRIENDS_ERROR,
      payload: error,
    });
  }
};

//get gợi ý kết bạn
export const getFriendAction = (idUser) => async (dispatch) => {
  try {
    let data = [];
    let arrs = [];
    const findUser = (await getDoc(doc(db, "users", idUser))).data();
    const dt = await getDocs(collection(db, "NotiFriends"));
    const listAllUsers = await getDocs(collection(db, "users"));
    listAllUsers.forEach((doc) => {
      const value = doc.data();
      if (value) {
        arrs.push(value);
      }
    });
    dt.forEach((doc) => {
      const value = doc.data();
      if (value?.idUser === idUser) {
        data.push(value);
      }
    });
    if (data) {
      let listUsers = [];
      arrs = [...arrs, ...data, ...findUser?.friends];
      listAllUsers.forEach((doc) => {
        const user = doc.data();
        const findUser = arrs.filter((value) => value?.email === user?.email);
        if (findUser.length === 1) {
          listUsers.push(...findUser);
        }
      });
      data = [...listUsers];
    }
    dispatch({
      type: GET_FRIENDS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FRIENDS_ERROR,
      payload: error,
    });
  }
};

//get lời mời kết bạn
export const getNotiFriendAction = (id) => async (dispatch) => {
  try {
    let data = [];
    const dt = await getDocs(collection(db, "NotiFriends"));
    dt.forEach((doc) => {
      const value = doc.data();
      if (value?.idFriend === id) {
        data.push(value);
      }
    });
    dispatch({
      type: GET_NOTI_FRIENDS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_NOTI_FRIENDS_ERROR,
      payload: error,
    });
  }
};

//cập nhật kết bạn
export const updateFriendAction =
  ({ id, idFriend, number }) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_FRIENDS_REQUEST });
      let arrs = [];
      let arrNoti = [];
      const findUser = (await getDoc(doc(db, "users", id))).data();
      const findUserFriend = (await getDoc(doc(db, "users", idFriend))).data();
      const friendUser = findUser?.friends?.find(
        (value) => value?.idFriend === idFriend
      );

      const dt = await getDocs(collection(db, "NotiFriends"));
      dt.forEach((doc) => {
        const value = doc.data();
        if (friendUser) {
          if (value?.idFriend === id && value?.idUser === idFriend) {
            arrNoti.push(value);
          }
        }
        if (number === 0) {
          if (value?.idFriend === id && value?.idUser === idFriend) {
            arrs.push(value);
          }
        } else {
          arrs.push(value);
        }
      });
      if (friendUser) {
        await deleteDoc(doc(db, "NotiFriends", arrNoti[0]?.id));
      }
      if (number === 0) {
        await deleteDoc(doc(db, "NotiFriends", arrs[0]?.id));
      } else {
        const searchUser = arrs.find(
          (data) => data?.idFriend === id && data?.idUser === idFriend
        );
        await updateDoc(doc(db, "NotiFriends", searchUser?.id), {
          status: true,
        });
        await updateDoc(doc(db, "users", id), {
          friends: [
            ...findUser?.friends,
            { idFriend, email: findUserFriend?.email },
          ],
        });
        await updateDoc(doc(db, "users", idFriend), {
          friends: [
            ...findUserFriend?.friends,
            { idFriend: id, email: findUser?.email },
          ],
        });
      }
      dispatch({
        type: UPDATE_FRIENDS_SUCCESS,
        // payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_FRIENDS_ERROR,
        payload: error,
      });
    }
  };
