import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   useNavigate,
//   // Navigate,
// } from "react-router-dom";
// import Layout from "./views/Layout";
// import ListProduct from "./views/product";

// const Default = () => {
//   const navigate = useNavigate();
//   navigate("/productlist?id=all");
// };

// // const navigate = useNavigate();

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "/productlist?id=all",
//         element: <ListProduct />,
//       },
//       {
//         index: true, // all
//         element: <ListProduct />,
//         // <Navigate to="/new-route" />, // 自動導向
//       },
//       {
//         path: "/productlist",
//         element: <ListProduct />,
//       },
//     ],
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>

    {/* <RouterProvider router={router} /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
