import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import "./App.css";
import Layout from "./views/Layout";
import Login from "./views/Login";
import Cart from "./views/Cart";
import Home from "./component/Home";
import ProductList from "./views/ProductList";
import Item from "./views/Item";
import Menu from "./views/Menu";

const Feature = styled.div`
  display: flex;
  justify-content: center;
  margin: 2% 0 0 0;

  a {
    font-weight: bold;
    font-size: 150%;
    color: black;
    text-decoration: none;
    padding: 0 15px;
  }

  .active {
    color: rebeccapurple;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  color: grey;
`;

const Container = styled.div`
  width: ${document.body.clientWidth};
  // height: ${document.body.clientHeight};
`;

function App() {
  console.log(
    "🎉重新轉譯App",
    document.body.clientWidth,
    document.body.clientHeight
  );
  return (
    <Container>
      {console.log("🤖重新轉譯JSX Component")}
      <BrowserRouter>
        {/* 上方列路由 */}
        <header>
          <Home />
          <Feature>
            <NavLink to="/productlist/all">全部</NavLink>
            <NavLink to="/productlist/new">新品</NavLink>
            <NavLink to="/productlist/sale">優惠</NavLink>
          </Feature>
          <Info>
            <div>Search</div>
            <div>LOGIN</div>
            <div>CART</div>
          </Info>
        </header>
        <div className="main-container">
          <div className="main">
            <div id="sidebar">
              <Menu />
            </div>
            <div id="main-content">
              <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="productlist/:id" element={<ProductList />} />
                <Route path="productlist/:id1/:id2" element={<Item />} />
                <Route path="login" element={<Login />} />
                <Route path="cart" element={<Cart />} />
              </Routes>
            </div>
          </div>
        </div>
        {/* <div id="footer">footer</div> */}
      </BrowserRouter>
    </Container>
  );
}

export default App;
