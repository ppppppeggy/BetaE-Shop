import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/login.css";
import axios from "axios";
import Register from "./component/Register";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log(username, password);
    axios
      .post("http://localhost:80/api/login", {
        username,
        password,
      })
      .then((response) => {
        console.log("response", response);
        if (response.data.success) {
          // 登入成功後重新導向到首頁或其他目標頁面
          sessionStorage.setItem("isLogin", true);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error.response.data.message, error);
        if (error.response.status === 401) {
          return setMessage("密碼錯誤！");
        }
        setMessage("用戶不存在！", error.message);
      });
  };

  return (
    <>
      <div className="container">
        <form className="form" method="post">
          <h2>登入</h2>
          <div>
            <label>會員帳號</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>密碼</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleLogin}>
            Sign in登入
          </button>
          <p>{message}</p>
        </form>
      </div>
      <Register />
    </>
  );
};

export default Login;
