import { createBrowserRouter } from "react-router";
import App from "./App";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { ErrorPage } from "./pages/ErrorPage";
import { Shop } from "./pages/Shop";

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "*", element: <ErrorPage /> },
      { path: "/", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/shop", element: <Shop /> },
    ],
  },
]);
