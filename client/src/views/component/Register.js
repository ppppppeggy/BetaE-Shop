import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/login.css";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secpassword, setSecpassword] = useState("");
  const [amessage, setAMessage] = useState("");
  const [bmessage, setBMessage] = useState("");
  const [cmessage, setCMessage] = useState("");
  const [qualified, setQualified] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("register", username, password);
    axios
      .post("http://localhost:80/api/register", {
        username,
        password,
      })
      .then((response) => {
        console.log("response", response);
        if (response.data.success) {
          // 登入成功後重新導向到首頁或其他目標頁面
          navigate("/");
        } else {
          // setMessage("用戶名或密碼錯誤！");
        }
      })
      .catch((error) => {
        console.error("登入請求錯誤：", error);
        // setMessage("伺服器錯誤！");
      });
  };

  // 常用郵件格式
  // Gmail：@gmail.com
  // Hotmail（现在称为Outlook）：@hotmail.com、@outlook.com
  // Yahoo：@yahoo.com
  // AOL：@aol.com
  // iCloud（苹果公司）：@icloud.com
  // QQ邮箱（腾讯）：@qq.com
  // 163邮箱：@163.com
  // 126邮箱：@126.com
  // 139邮箱：@139.com
  // sina邮箱：@sina.com
  // sohu邮箱：@sohu.com

  return (
    <div className="container">
      <form className="form" method="post">
        <h2>註冊</h2>
        <div>
          <label>會員帳號</label>
          <input
            type="text"
            name="username"
            value={username}
            onBlur={(e) => {
              if (
                !/^[a-zA-Z][a-zA-Z0-9._]*@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.test(
                  e.target.value
                )
              ) {
                setAMessage("無效郵件格式");
                setQualified(false);
              } else {
                setQualified(true);
              }
            }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p>{amessage}</p>
        </div>
        <div>
          <label>密碼</label>
          <input
            type="password"
            name="password"
            value={password}
            onBlur={(e) => {
              if (
                !/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,12}$/.test(
                  e.target.value
                )
              ) {
                setBMessage("密碼不符");
                setQualified(false);
              } else {
                setBMessage("");
                setQualified(true);
              }
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>{bmessage}</p>
        </div>
        <div>
          <label>確認密碼</label>
          <input
            type="secpassword"
            name="secpassword"
            value={secpassword}
            onBlur={(e) => {
              if (secpassword !== password) {
                setCMessage("確認密碼與密碼不符");
                setQualified(true);
              } else {
                setCMessage("");
                setQualified(true);
              }
            }}
            onChange={(e) => setSecpassword(e.target.value)}
          />
          <p>{cmessage}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            console.log("Q", qualified);
            if (qualified) {
              handleLogin();
            }
          }}
        >
          Sign up註冊
        </button>
      </form>
    </div>
  );
};

export default Register;
