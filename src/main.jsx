import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddProduct from "./pages/AddProduct/AddProduct.jsx";
import Dashboard from "./Layout/Dashboard/Dashboard.jsx";
import Statistics from "./pages/Statistics/Statistics.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/add-product",
        element: <AddProduct />,
      },
      {
        path: "/statistics",
        element: <Statistics />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
