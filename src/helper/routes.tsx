import { RouteObject } from "react-router-dom";
import LoginPage from "../screens/LoginPage";
import POSPage from "@/screens/pos";

type Route = RouteObject & {
  permission?: string | string[];
  breadcrumb?: any;
};

const mainRoutes: Route[] = [
  {
    path: "/",
    element: <POSPage />,
  },
];

const authenticationRoutes: Route[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
];

export { mainRoutes, authenticationRoutes };
