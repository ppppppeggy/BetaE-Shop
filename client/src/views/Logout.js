import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect in logout");
    axios
      .get("http://localhost:80/api/logout")
      .then((response) => {
        console.log("logout", response);
        localStorage.clear();
        sessionStorage.setItem("isLogin", false);
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  }, [navigate]);
};

export default Logout;
