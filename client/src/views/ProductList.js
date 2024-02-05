import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom"; // ?item=value ->  useSearchParams
import styled from "@emotion/styled";

// get product data
// props = all, new, discount
// render products

const fetchProducts = async (query) => {
  try {
    const response = await axios.get(
      `http://localhost:80/api/productlist/${query}`
    );
    return response.data; // 返回數據
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const ProductList = () => {
  const [data, setData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    console.log("useEffect_id", id);
    const fetchData = async () => {
      const result = await fetchProducts(id);
      if (result) {
        setData(result);
      }
    };

    fetchData();
  }, [id]);

  // ProductList 組件中使用路由鉤子（如 useParams）或者透過 React Router 的 useLocation 鉤子來獲取這個參數的值。
  // const [params] = useSearchParams();
  // console.log("id", params.get("id"));

  return (
    <div>
      <Arrange>
        {data.map((item) => (
          <div key={item._id} className="responsive-container">
            <img
              className="responsive-image"
              src={item.image}
              alt={item.name}
            />
            <div>
              {item.sale > 0 ? (
                <p>
                  NT.{item.price}
                  <Link to={`/productlist/${id}/${item._id}`}>
                    NT.{item.sale}
                  </Link>
                </p>
              ) : (
                <Link to={`/productlist/${id}/${item._id}`}>
                  NT.{item.price}
                </Link>
              )}
            </div>
          </div>
        ))}
      </Arrange>
    </div>
  );
};

const Arrange = styled.div`
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;

  .responsive-container {
    margin: 0 5px; //上下 左右
    &:hover {
      background-color: bisque;
    }
    max-width: 100%;
  }

  .responsive-image {
    width: 250px;
    height: 370px;
  }

  @media (max-width: 1070px) {
    .responsive-image {
      width: 60%;
      height: auto;
      // max-height: 470px;
    }
  }

  @media (max-width: 540px) {
    // .responsive-image {
    //   width: 48%; /* 調整寬度以使兩個圖片並排，可以根據需要進行微調 */
    // }
    .responsive-container {
      flex: 1 0 calc(50% - 5px); /* 50% 寬度，間距 5px */
    }
  }
`;

export default ProductList;
