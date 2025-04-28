import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginPage from "./screens/LoginPage";
import POSLayout from "./layouts/MainLayout";
import { mainRoutes } from "./helper/routes";

function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <LoginPage />,
    },
    {
      path: "/",

      element: <POSLayout />,
      children: mainRoutes,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
