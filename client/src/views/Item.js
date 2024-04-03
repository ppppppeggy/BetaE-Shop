import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/item.css";

const laundry_attention =
  "＊深淺色請分開洗滌，以避免造成互相移染。＊ 深色 / 鮮豔衣物/牛仔類首次洗滌時，布料易釋於些微染劑，屬正常現象會隨著清洗次數減少。＊請放入大小適中之細網洗衣袋細中弱速水洗，以保持商品型態。＊洗滌時，水溫請低於30℃；請使用中性洗劑；浸泡時間不宜過長。＊請勿使用漂白劑、螢光增白劑及衣物柔軟劑，以免破壞布料。＊不可濕放，以免衣物染色；請弱速輕脫水，不可烘乾，以免衣物縮水。";

const Item = ({ addToCart }) => {
  const location = useLocation();
  const { item } = location.state;
  const [quantity, setQuantity] = useState(1);
  const [clickState, setclickState] = useState(false);
  const [size, setSize] = useState(Object.keys(item.size)[0]);
  console.log("refresh form Item start");

  const handleQuantity = (e) => {
    if (e.target.value >= 10) {
      if (item.size[size] < 10) {
        return setQuantity(item.size[size]);
      }
      setQuantity(10);
    } else {
      setQuantity(e.target.value);
    }
  };

  function handleOutside(event) {
    if (!event.target.closest(".select-drop")) {
      setclickState(false);
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, []);

  return (
    <div className="container">
      {console.log("click", clickState, quantity)}
      <div className="image-container">
        {/* images space */}
        <img className="item-image" src={item.image} alt={item.name} />
      </div>
      <div className=" describe-container">
        {/* image describe */}
        <div>{item.name}</div>
        <div className="item-price">
          <p>NT. {item.price}</p>
          {item.sale > 0 && <p className="text-with-line">NT. {item.sale}</p>}
        </div>
        {/* size selection number list*/}
        {item.size[size] === 1 && <div className="soldout">即將售完</div>}
        <div className="select-container">
          <div className="select-drop">
            <div
              className="dropOption"
              onClick={() => {
                setclickState(!clickState);
              }}
            >
              <span>{size}</span>
            </div>
            <ul className={clickState ? "dropdown" : "hidden"}>
              {Object.keys(item.size).map((key) => (
                <li
                  key={key}
                  onClick={() => {
                    if (key !== size) {
                      setQuantity(1);
                    }
                    setSize(key);
                    setclickState(!clickState);
                  }}
                >
                  {key}
                </li>
              ))}
            </ul>
          </div>
          <div className="select-stock">
            <div
              className="minus"
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(Number(quantity) - 1);
                } else {
                  return;
                }
              }}
            ></div>
            <input
              type="text"
              id="quantity"
              name="quantity"
              className="number-input"
              value={quantity}
              onChange={handleQuantity}
            />
            <div
              className="add"
              onClick={() => {
                if (quantity < item.size[size]) {
                  setQuantity(Number(quantity) + 1);
                } else {
                  return;
                }
              }}
            ></div>
          </div>
        </div>
        {/* purchase zone */}
        <button
          className="purchase-cart"
          onClick={() => {
            /* 打包尺寸、數量跟商品ID出去 */
            console.log(item._id, size, quantity);
            const item_id = item._id;
            addToCart({ item_id, size, quantity });
          }}
        >
          加入購物車
        </button>
        <hr />
        <div className="notice">
          <div className="notice-title">
            洗滌事項<span>Laundry</span>
          </div>
          {laundry_attention}
        </div>
      </div>
    </div>
  );
};

export default Item;
