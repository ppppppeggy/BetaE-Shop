// import { useState } from "react";
import styled from "@emotion/styled";
// import { Outlet } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 600px;
  height: auto;
  border: 2px solid red;
`;

const Layout = () => {
  return (
    <Container>
      <div>公告</div>
      {/* <Outlet /> */}
    </Container>
  );
};

export default Layout;
