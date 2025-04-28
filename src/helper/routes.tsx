import { RouteObject } from "react-router-dom";
import LoginPage from "../screens/LoginPage";
import POSPage from "@/screens/pos";
import Profile from "@/screens/Profile";
import POSTodaySales from "@/screens/pos/POSTodaySales";
import Invoices from "@/screens/invoices";
import Purchases from "@/screens/purchases";
import AddPurchases from "@/screens/purchases/add";
import Products from "@/screens/products";
import UpdateProduct from "@/screens/products/edit";
import RefundInvoices from "@/screens/invoices/Refund";
import Customers from "@/screens/customers";
import Suppliers from "@/screens/suppliers";
import AddSuppliers from "@/screens/suppliers/add";
import UpdateSuppliers from "@/screens/suppliers/update";
import AddProduct from "@/screens/products/add";

type Route = RouteObject & {
  permission?: string | string[];
  breadcrumb?: any;
};

const mainRoutes: Route[] = [
  {
    path: "/",
    element: <POSPage />,
  },
  {
    path: "/profile",
    element: <Profile inPOS />,
  },
  {
    path: "/today-sales",
    element: <POSTodaySales />,
  },
  {
    path: "/invoices",
    element: <Invoices />,
  },
  {
    path: "/purchases",
    permission: "purchases",
    children: [
      {
        index: true,
        element: <Purchases />,
      },
      {
        path: "add",
        element: <AddPurchases />,
      },
    ],
  },
  {
    path: "/products",
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "add",
        element: <AddProduct />,
      },
      {
        path: ":id",
        element: <UpdateProduct />,
      },
    ],
  },
  {
    path: "/refund",
    element: <RefundInvoices />,
  },
  {
    path: "/customers",
    element: <Customers inPOS />,
  },
  {
    path: "/suppliers",
    permission: "suppliers",
    children: [
      {
        index: true,
        element: <Suppliers inPOS />,
      },
      {
        path: "add",
        element: <AddSuppliers />,
      },
      {
        path: ":id/update",
        element: <UpdateSuppliers />,
      },
    ],
  },
];

const authenticationRoutes: Route[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
];

export { mainRoutes, authenticationRoutes };
