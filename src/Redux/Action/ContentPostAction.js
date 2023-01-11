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
  GET_COMMMENT_ERROR,
  GET_COMMMENT_SUCCESS,
  GET_CONTENT_ERROR,
  GET_CONTENT_REQUEST,
  GET_CONTENT_SUCCESS,
  UPDATE_COMMENTSCHILD_ERROR,
  UPDATE_COMMENTSCHILD_REQUEST,
  UPDATE_COMMENTSCHILD_SUCCESS,
  UPDATE_COMMENTS_ERROR,
  UPDATE_COMMENTS_REQUEST,
  UPDATE_COMMENTS_SUCCESS,
  UPDATE_CONTENT_ERROR,
  UPDATE_CONTENT_REQUEST,
  UPDATE_CONTENT_SUCCESS,
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
    const addNotiColesion = await setDoc(doc(db, "NotiComments", id), {
      comments: [],
      idUser,
      id,
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
export const getContentPost = (users) => async (dispatch) => {
  try {
    dispatch({ type: GET_CONTENT_REQUEST });
    let data = [];
    const getContents = await getDocs(collection(db, "contentPost"));
    getContents?.forEach((doc) => {
      const dt = doc.data();
      if (dt.idUser === users?.id) {
        data.push(dt);
      }
      users?.friends?.forEach((friend) => {
        if (dt.idUser === friend?.idFriend && dt.status === false) {
          data.push(dt);
        }
      });
    });
    if (data) {
      data.sort(({ createAt: b }, { createAt: a }) =>
        a > b ? 1 : a < b ? -1 : 0
      );
    }
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

export const updateContentPost = (data) => async (dispatch) => {
  try {
    const { likeStatus, idUser, idContent } = data;
    dispatch({ type: UPDATE_CONTENT_REQUEST });
    let arrlikes = [];
    const objContent = (await getDoc(doc(db, "contentPost", idContent))).data();
    arrlikes = [...objContent?.like];
    if (likeStatus > 0) {
      if (arrlikes.length === 0) {
        arrlikes = [{ likeStatus, idU: idUser }];
      } else {
        const arrs = arrlikes?.filter((like) => like?.idU !== idUser);
        if (arrs) {
          arrlikes = [...arrs, { likeStatus, idU: idUser }];
        }
      }
    } else {
      arrlikes = arrlikes?.filter((like) => like?.idU !== idUser);
    }
    if (arrlikes) {
      await updateDoc(doc(db, "contentPost", idContent), { like: arrlikes });
    }
    dispatch({
      type: UPDATE_CONTENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CONTENT_ERROR,
      payload: error,
    });
  }
};

export const updateCommentPost = (data) => async (dispatch) => {
  try {
    const { users, content, postContent, id } = data;
    dispatch({ type: UPDATE_COMMENTS_REQUEST });
    const objContent = (
      await getDoc(doc(db, "contentPost", postContent?.id))
    ).data();
    const notiComment = (
      await getDoc(doc(db, "NotiComments", postContent?.id))
    ).data();
    if (objContent && notiComment) {
      await updateDoc(doc(db, "contentPost", postContent?.id), {
        comments: [
          ...objContent?.comments,
          {
            nameUser: users.name,
            content,
            commentChilds: [],
            idUser: users.id,
            id,
            createAt: Timestamp.now(),
          },
        ],
      });
      if (users?.id !== postContent?.idUser) {
        await updateDoc(doc(db, "NotiComments", postContent?.id), {
          comments: [
            ...notiComment?.comments,
            {
              nameUser: users.name,
              content,
              idUser: users.id,
              id,
              createAt: Timestamp.now(),
            },
          ],
        });
      }
    }
    dispatch({
      type: UPDATE_COMMENTS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_COMMENTS_ERROR,
      payload: error,
    });
  }
};

export const updateCommentChildPost = (data) => async (dispatch) => {
  try {
    const { users, content, postContent, commentId, commentChildId } = data;
    dispatch({ type: UPDATE_COMMENTSCHILD_REQUEST });
    let arrs = [];
    const filteComments = postContent?.comments.filter(
      (comment) => comment.id !== commentId
    );
    const findCommnet = postContent?.comments?.find(
      (comment) => comment.id === commentId
    );
    if (findCommnet) {
      let arr = {};
      arr = {
        commentChilds: [
          ...findCommnet?.commentChilds,
          {
            nameUser: users.name,
            content,
            idUser: users.id,
            id: commentChildId,
            createAt: Timestamp.now(),
          },
        ],
        content: findCommnet?.content,
        createAt: findCommnet?.createAt,
        id: findCommnet?.id,
        idUser: findCommnet?.idUser,
        nameUser: findCommnet?.nameUser,
      };
      arrs = [...filteComments, arr];
    }
    if (arrs) {
      arrs.sort(({ createAt: a }, { createAt: b }) =>
        a > b ? 1 : a < b ? -1 : 0
      );
      await updateDoc(doc(db, "contentPost", postContent?.id), {
        comments: [...arrs],
      });
    }
    dispatch({
      type: UPDATE_COMMENTSCHILD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_COMMENTSCHILD_ERROR,
      payload: error,
    });
  }
};

export const getCommentsNoti = (id) => async (dispatch) => {
  try {
    let arrs = [];
    const dt = await getDocs(collection(db, "NotiComments"));
    dt?.forEach((doc) => {
      const value = doc.data();
      if (value?.idUser === id) {
        arrs.push(...value.comments);
      }
    });
    dispatch({
      type: GET_COMMMENT_SUCCESS,
      payload: arrs,
    });
  } catch (error) {
    dispatch({
      type: GET_COMMMENT_ERROR,
      payload: error,
    });
  }
};
