import { Route, Routes, NavLink, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import "./style/App.css";
import Layout from "./views/Layout";
import Login from "./views/Login";
import Logout from "./views/Logout";
import Cart from "./views/Cart";
import Home from "./component/Home";
import ProductList from "./views/ProductList";
import Item from "./views/Item";
import Menu from "./views/Menu";

const Info = styled.div`
  display: flex;
  align-items: center;
  color: grey;
  margin-right: 2%;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login";
  const loginState = sessionStorage.getItem("isLogin");

  console.log("🎉重新轉譯App");

  const handleCartItems = ({ item_id, size, quantity }) => {
    let order = { itemId: item_id, sizes: {} };
    order.sizes[size] = parseInt(quantity);
    const prevStorage = JSON.parse(localStorage.getItem("cartItems"));

    let cartItems = [order];
    if (prevStorage) {
      const prevItem = prevStorage.find((prev) => prev.itemId === item_id);

      if (prevItem) {
        console.log(prevItem.sizes);
        Object.entries(prevItem.sizes).forEach(([key, value]) => {
          if (key === size) {
            order.sizes[key] += value;
          } else if (value) {
            order.sizes[key] = value;
          }
        });
      }
      cartItems = [
        ...prevStorage.filter((cartItem) => cartItem.itemId !== item_id),
        order,
      ];
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  return (
    <Container>
      {console.log("App重新轉譯JSX Component")}
      <header>
        <Home />
        <div className="feature">
          <NavLink to="/productlist/?item=10">全部</NavLink>
          <NavLink to="/productlist/?status=new">新品</NavLink>
          <NavLink to="/productlist/?status=sale">優惠</NavLink>
        </div>
        <Info>
          <div>Search</div>
          <NavLink to={"cart"}>Cart</NavLink>
          {console.log("🎫session loginState", loginState)}
          {loginState === "true" ? (
            <NavLink to={"logout"}>Logout</NavLink>
          ) : (
            <NavLink to={"login"}>Login</NavLink>
          )}
        </Info>
      </header>
      <div className="main-container">
        {!hideSidebar && (
          <div id="sidebar">
            <Menu />
          </div>
        )}
        <div id={!hideSidebar ? "main-content" : "login-content"}>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="productlist" element={<ProductList />} />
            <Route
              path="product"
              element={<Item addToCart={handleCartItems} />}
            />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
      {/* <div id="footer">footer</div> */}
    </Container>
  );
}

export default App;
