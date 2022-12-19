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
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  ADD_CONTENT_ERROR,
  ADD_CONTENT_REQUEST,
  ADD_CONTENT_SUCCESS,
  GET_CONTENT_ERROR,
  GET_CONTENT_REQUEST,
  GET_CONTENT_SUCCESS,
} from "../Container/ContentPostContainer";

// ADD CONTENT POST
export const addContentPost = (data) => async (dispatch) => {
  try {
    const { nameUser, urlUser, status, content, arrUrl, idUser, id } = data;
    dispatch({ type: ADD_CONTENT_REQUEST });
    const dt = await setDoc(doc(db, "contentPost", id), {
      nameUser,
      urlUser,
      status,
      content,
      arrUrlImage: arrUrl,
      like: [],
      comments: [],
      idUser,
      id,
      createAt: Timestamp.now(),
    });
    const dat = dt && (await getDoc(doc(db, "contentPost", id))).data();
    dispatch({
      type: ADD_CONTENT_SUCCESS,
      payload: dat,
    });
  } catch (error) {
    dispatch({
      type: ADD_CONTENT_ERROR,
      payload: error,
    });
  }
};

//GET CONTENT
export const getContentPost = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CONTENT_REQUEST });
    let data = [];
    const getContents = await getDocs(collection(db, "contentPost"));
    getContents?.forEach((doc) => {
      const dt = doc.data();
      if (dt) {
        data.push(dt);
        return data;
      }
    });
    dispatch({
      type: GET_CONTENT_SUCCESS,
      payload: [...data],
    });
  } catch (error) {
    dispatch({
      type: GET_CONTENT_ERROR,
      payload: error,
    });
  }
};
