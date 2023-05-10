import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../routes/login.route";
import Seller from "../routes/seller.route";
import Marketplace from "../routes/seller/marketplace.route";
import ShoppingCart from "../routes/seller/shopping-cart.route";
import Products from "../routes/seller/products.route";
import { getAllSales, getShoppingCart } from "../services/sales.service";
import Packer from "../routes/packer.route";
import { Delivery } from "../routes/packer/delivery.route";
import { ProductState, SaleState } from "e-comm-gt-api";
import { Verify } from "../routes/packer/verify.route";
import { getProducts } from "../services/product.service";
import Admin from "../routes/admin.route";
import { Reports } from "../routes/admin/reports.route";
import Employees from "../routes/admin/employees.route";

export const routerStore = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/seller",
    element: <Seller />,
    children: [
      {
        path: "shopping-cart",
        element: <ShoppingCart />,
        loader: getShoppingCart,
      },
      {
        path: "marketplace",
        element: <Marketplace />,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
  {
    path: "/packer",
    element: <Packer />,
    children: [
      {
        path: "delivery",
        element: <Delivery />,
        loader: () => getAllSales(SaleState.INDELIVERY),
      },
      {
        path: "verify",
        element: <Verify />,
        loader: () => getProducts({ state: ProductState.UNVERIFIED }),
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "employees",
        element: <Employees />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
