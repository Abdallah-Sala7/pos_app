import MainLayout from "./layouts/MainLayout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { authenticationRoutes, mainRoutes } from "./helper/routes";

function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <p className="text-3xl text-red-700 font-bold">Error Page</p>,
    },
    { path: "/", element: <MainLayout />, children: [...mainRoutes] },
    {
      path: "/login",
      children: [...authenticationRoutes],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
