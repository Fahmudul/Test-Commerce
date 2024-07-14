import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex mx-auto">
      <div className=" lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <Link to={"/add-product"}>Add Product</Link>
            </li>
            <li>
              <Link to={"/statistics"}>Statistics</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
