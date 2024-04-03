import { useState, useEffect } from "react";
import axios from "axios";
import "../style/cart.css";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
  console.log("render Cart", storedCartItems);

  useEffect(() => {
    // 撈後端資料
    let stored = [];
    storedCartItems.forEach((i) => {
      stored.push(i.itemId);
    });
    console.log(stored);
    axios
      .post("http://localhost:80/api/filterData", stored)
      .then((response) => {
        console.log(response.data);
        setCartData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h3>Cart Information</h3>
      {cartData.length > 0 ? (
        cartData.map((item) => (
          <div key={item._id} className="cart-item-container">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            {Object.entries(
              storedCartItems.find((cartItem) => cartItem.itemId === item._id)
                .sizes
            ).map(([size, quantity]) => (
              <p key={size} className="cart-item-describe">
                {item.name} {size} {quantity}
              </p>
            ))}
            <div
              className="minus"
              onClick={() => {
                // if (quantity > 1) {
                //   setQuantity(Number(quantity) - 1);
                // } else {
                //   return;
                // }
              }}
            ></div>
            <input
              type="text"
              id="quantity"
              name="quantity"
              className="number-input"
              // value={quantity}
              // onChange={handleQuantity}
            />
            <div
              className="add"
              onClick={() => {
                // if (quantity < item.size[size]) {
                //   setQuantity(Number(quantity) + 1);
                // } else {
                //   return;
                // }
              }}
            ></div>
          </div>
        ))
      ) : (
        <div>No items in cart</div>
      )}
    </div>
  );
};

export default Cart;
