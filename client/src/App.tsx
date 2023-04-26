import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./routes/login.route";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "salesman",
    element: <></>,
    children: [{ path: "sales", element: <></> }],
  },
  {
    path: "inventory",
    element: <></>,
    children: [
      {
        path: "branch/:branchId",
        element: <></>,
      },
      {
        path: "warehouse/:warehouseId",
        element: <></>,
      },
    ],
  },
  {
    path: "admin",
    element: <></>,
    children: [
      {
        path: "reports",
        element: <></>,
      },
      {
        path: "employees",
        element: <></>,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
