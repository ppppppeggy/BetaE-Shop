import { useEffect, useState } from "react"; //, useRef
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom"; // ?item=value ->  useSearchParams
import "../style/productlist.css";

// get product data
// props = all, new, discount
// render products

// const fetchProducts = async (query) => {
//   try {
//     console.log(query);
//     const url = `http://localhost:80/api/productlist/${query}`;
//     const response = await axios.get(url); //訪問後端數據url
//     return response.data; // 返回數據
//   } catch (error) {
//     console.error("Error:", error);
//     return null;
//   }
// };

const ProductList = () => {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  //   const cancelTokenSource = useRef(axios.CancelToken.source());
  //   let source = cancelTokenSource.current;

  const itemId = searchParams.get("item");
  const status = searchParams.get("status");
  console.log("ProductList", "item", itemId, "status", status);
  useEffect(() => {
    const fetchData = async (query) => {
      try {
        const url = `http://localhost:80/api/productlist/${query}`;
        const response = await axios.get(
          url
          //     , {
          //   cancelToken: cancelTokenSource.current.token,
          // }
        ); //訪問後端數據url, {cancelToken}
        return response.data; // 返回數據
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("canceled", error.message);
        } else {
          console.error("Error:", error);
        }
        return null;
      }
    };

    fetchData(status ? status : itemId).then((result) => {
      if (result) {
        setData(result);
      }
    });

    // return () => source.cancel("Component unmounted");
  }, [itemId, status]); // , source

  // ProductList 組件中使用路由鉤子（如 useParams）或者透過 React Router 的 useLocation 鉤子來獲取這個參數的值。
  // const [params] = useSearchParams();
  // console.log("id", params.get("id"));

  return (
    <>
      {data.map((item) => (
        <div key={item._id} className="responsive-container plist1">
          <img
            className="responsive-image"
            src={item.image}
            alt={item.name}
            onClick={() => {
              navigate(`/product?ID=${item._id}`, { state: { item } });
            }}
          />
          <div className="item-container">
            <div className="item-name">{item.name}</div>
            <div className="item-describe">
              {Object.keys(item.size).map((key) =>
                item.size[key] > 0 ? (
                  <p key={key} className="item-stock">
                    {key}
                  </p>
                ) : (
                  <p key={key} className="item-stock text-light-grey">
                    {key}
                  </p>
                )
              )}
            </div>
            <div className="item-describe">
              <p className={item.sale > 0 ? "text-with-line" : null}>
                NT. {item.price}
              </p>
              {item.sale > 0 && <p>NT. {item.sale}</p>}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductList;
