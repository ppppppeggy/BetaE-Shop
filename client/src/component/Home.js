import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const ImageContainer = styled.div`
  width: 210px;
  height: 150px;
  background-image: url(${process.env.PUBLIC_URL}/images/logo.png);
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const Home = () => {
  const navigate = useNavigate();
  return (
    <ImageContainer
      onClick={() => {
        console.log("home");
        navigate("/");
      }}
    />
  );
};

export default Home;
