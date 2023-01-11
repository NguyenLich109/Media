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
  onSnapshot,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import {
  ADD_MEESENGER_ERROR,
  ADD_MEESENGER_REQUEST,
  ADD_MEESENGER_SUCCESS,
  GET_MEESENGER_ERROR,
  GET_MEESENGER_REQUEST,
  GET_MEESENGER_SUCCESS,
  UPDATE_MEESENGER_ERROR,
  UPDATE_MEESENGER_REQUEST,
  UPDATE_MEESENGER_SUCCESS,
  DELETE_MEESENGER_ERROR,
  DELETE_MEESENGER_REQUEST,
  DELETE_MEESENGER_SUCCESS,
} from "../Container/MessengerContainer";

export const addZoom =
  ({ id, idUser, idFriend }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_MEESENGER_REQUEST });
      let data = "";
      const dt = await getDocs(collection(db, "ChatZoom"));
      dt?.forEach((doc) => {
        const value = doc.data();
        if (
          value?.idZoom === `${idUser}${idFriend}` ||
          value?.idZoom === `${idFriend}${idUser}`
        ) {
          data = value;
        }
      });
      const setZoom =
        data === "" &&
        (await setDoc(doc(db, "ChatZoom", id), {
          chatZoom: [],
          arrs: [`${idUser}`, `${idFriend}`],
          idZoom: `${idUser}${idFriend}`,
          id,
          createAt: serverTimestamp(),
        }));
      const dat = data === "" ? id : data?.id;
      dispatch({
        type: ADD_MEESENGER_SUCCESS,
        payload: dat,
      });
    } catch (error) {
      dispatch({
        type: ADD_MEESENGER_ERROR,
        payload: error,
      });
    }
  };

export const getZoom = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_MEESENGER_REQUEST });
    const unsub = onSnapshot(doc(db, "ChatZoom", id), (doc) => {
      dispatch({
        type: GET_MEESENGER_SUCCESS,
        payload: doc.data(),
      });
    });
  } catch (error) {
    dispatch({
      type: GET_MEESENGER_ERROR,
      payload: error,
    });
  }
};

export const updateZoom =
  ({ id, uid, idUser, content, nameUrl }) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_MEESENGER_REQUEST });
      let data = "";
      const dt = (await getDoc(doc(db, "ChatZoom", id))).data();

      if (dt) {
        data = dt.chatZoom;
        data.sort(({ createAt: a }, { createAt: b }) =>
          a > b ? 1 : a < b ? -1 : 0
        );
      }
      const update = await updateDoc(doc(db, "ChatZoom", id), {
        chatZoom: [
          ...data,
          {
            content,
            nameUrl,
            idUser,
            check: false,
            createAt: Timestamp.now(),
            id: uid,
          },
        ],
      });
      dispatch({
        type: UPDATE_MEESENGER_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_MEESENGER_ERROR,
        payload: error,
      });
    }
  };

export const deleteZoom =
  ({ id, uid, nameUrl }) =>
  async (dispatch) => {
    try {
      dispatch({ type: DELETE_MEESENGER_REQUEST });
      let data = "";
      const dt = (await getDoc(doc(db, "ChatZoom", id))).data();
      if (dt) {
        const filter = dt.chatZoom.filter((value) => value.id !== uid);
        const find = dt.chatZoom.find((value) => value.id === uid);
        data = [
          ...filter,
          {
            content: "Tin nhắn đã được thu hồi",
            nameUrl: find?.nameUrl,
            idUser: find?.idUser,
            check: true,
            createAt: find?.createAt,
            id: uid,
          },
        ];
        if (nameUrl !== "") {
          deleteObject(ref(getStorage(), `imageZoomChat/${nameUrl}`))
            .then(() => {})
            .catch((error) => {
              console.log(error);
            });

          data = [
            ...filter,
            {
              content: "Tin nhắn đã được thu hồi",
              nameUrl: "",
              idUser: find?.idUser,
              check: true,
              createAt: find?.createAt,
              id: uid,
            },
          ];
        }
        data.sort(({ createAt: a }, { createAt: b }) =>
          a > b ? 1 : a < b ? -1 : 0
        );
      }
      const update = await updateDoc(doc(db, "ChatZoom", id), {
        chatZoom: [...data],
      });
      dispatch({
        type: DELETE_MEESENGER_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: DELETE_MEESENGER_ERROR,
        payload: error,
      });
    }
  };
