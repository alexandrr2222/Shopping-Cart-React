import { createBrowserRouter } from "react-router";
import App from "./App";
import { Home } from "./pages/home/Home";
import { Cart } from "./pages/cart/Cart";
import { ErrorPage } from "./pages/errorPage/ErrorPage";
import { Shop } from "./pages/shop/Shop";

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
