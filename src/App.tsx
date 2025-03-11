import { createBrowserRouter, RouterProvider } from "react-router-dom";

import POSPage from "./screens/pos";
import LoginPage from "./screens/LoginPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: <POSPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
