import { GoogleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { v4 as uuidv4 } from "uuid";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Redux/Action/UserAction";
import { useState, useEffect } from "react";
import axios from "axios";
import { ADD_USER_RESET } from "../Redux/Container/UseContainer";

export default function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const [address, setAddress] = useState("");
  const [friends, setFriends] = useState([]);

  const userIf = useSelector((state) => state.addUserReducer);
  const { check } = userIf;

  const handlerLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (user) {
          const {
            displayName,
            email,
            uid,
            photoURL,
            accessToken,
            phoneNumber,
          } = user;
          dispatch(
            addUser({
              displayName,
              email,
              phoneNumber,
              address,
              photoURL,
              friends,
              uid,
              id: uuidv4(),
              accessToken,
            })
          );
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    try {
      const unsubscibed = onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate("/");
          return;
        }
      });
      return () => {
        unsubscibed();
      };
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="login">
        <h1 className="login-text">Đăng nhập</h1>
        <div className="login-button">
          <Button
            onClick={handlerLogin}
            className="login-button__google"
            icon={<GoogleOutlined />}
          >
            Tiếp tục với Google
          </Button>
        </div>
      </div>
    </>
  );
}
