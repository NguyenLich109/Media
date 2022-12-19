import axios from "axios";
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
} from "firebase/firestore";
import {
  ADD_USER_ERROR,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
} from "../Container/UseContainer.js";

export const addUser = (profile) => async (dispatch) => {
  try {
    const {
      displayName,
      email,
      phoneNumber,
      address,
      photoURL,
      friends,
      uid,
      id,
      accessToken,
    } = profile;
    dispatch({ type: ADD_USER_REQUEST });

    let dt = "";
    const getUsers = await getDocs(collection(db, "users"));
    getUsers?.forEach((doc) => {
      const data = doc.data();
      if (data.uid === uid) {
        dt = data;
        return dt;
      }
    });
    const data =
      dt == "" &&
      (await setDoc(doc(db, "users", id), {
        name: displayName,
        email,
        sex: "",
        phone: phoneNumber,
        address,
        urlImage: photoURL,
        nameImgae: "",
        friends,
        uid,
        id,
        accessToken,
        createAt: serverTimestamp(),
      }));
    const dat =
      dt == "" ? (await getDoc(doc(db, "users", data.id))).data() : dt;
    dispatch({
      type: ADD_USER_SUCCESS,
      payload: dat,
    });
    dispatch({
      type: GET_USER_SUCCESS,
      payload: dat,
    });
    localStorage.setItem("userInfo", JSON.stringify(dat));
  } catch (error) {
    dispatch({
      type: ADD_USER_ERROR,
      payload: error,
    });
  }
};

export const updateProfile = (data) => async (dispatch) => {
  try {
    const {
      name,
      sex,
      phone,
      address,
      urlImage,
      nameImgae,
      friends,
      uid,
      id,
      accessToken,
    } = data;
    dispatch({ type: UPDATE_USER_REQUEST });
    const userInfo = (await getDoc(doc(db, "users", id))).data();
    const dt = await updateDoc(doc(db, "users", id), {
      name: name || userInfo?.name,
      sex: sex || userInfo?.sex,
      email: userInfo?.email,
      phone: phone || userInfo?.phone,
      address: address || userInfo?.address,
      urlImage: urlImage || userInfo?.urlImage,
      nameImgae: nameImgae || userInfo?.nameImgae,
      friends: friends || userInfo?.friends,
      uid: uid || userInfo?.uid,
      id: id || userInfo?.id,
      accessToken: accessToken || userInfo?.accessToken,
      createAt: serverTimestamp(),
    });
    dispatch({ type: UPDATE_USER_SUCCESS, payload: userInfo });
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        name: name || userInfo?.name,
        sex: sex || userInfo?.sex,
        email: userInfo?.email,
        phone: phone || userInfo?.phone,
        address: address || userInfo?.address,
        urlImage: urlImage || userInfo?.urlImage,
        nameImgae: nameImgae || userInfo?.nameImgae,
        friends: friends || userInfo?.friends,
        uid: uid || userInfo?.uid,
        id: id || userInfo?.id,
        accessToken: accessToken || userInfo?.accessToken,
      })
    );
  } catch (error) {
    dispatch({ type: UPDATE_USER_ERROR, payload: error });
  }
};

export const getProfile = () => async (dispatch) => {
  try {
    const userStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    dispatch({ type: GET_USER_REQUEST });
    const getUsers = await getDoc(doc(db, "users", userStorage?.id));
    dispatch({ type: GET_USER_SUCCESS, payload: getUsers.data() });
  } catch (error) {
    dispatch({ type: GET_USER_ERROR, payload: error });
  }
};

//GET ALL USERS
export const getAllUsersAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS_REQUEST });
    let data = [];
    const getContents = await getDocs(collection(db, "users"));
    getContents?.forEach((doc) => {
      const dt = doc.data();
      if (dt) {
        data.push(dt);
        return data;
      }
    });
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: [...data],
    });
  } catch (error) {
    dispatch({
      type: GET_USERS_ERROR,
      payload: error,
    });
  }
};
