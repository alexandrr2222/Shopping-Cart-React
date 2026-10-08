import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import type { Product } from "./fetchProducts";

export type CartContextType = {
  cart: CartType;
  addToCart: (arg0: Product) => void;
};
export type CartType = Array<Product>;
function App() {
  const [cart, setCart] = useState<CartType>([]);
  function addToCart(product: Product) {
    setCart((prev) => [...prev, product]);
  }

  return (
    <div>
      <nav className="flex gap-3">
        <NavLink
          className={({ isActive }) => (isActive ? "activePage" : "")}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "activePage" : "")}
          to="/shop"
        >
          Shop
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "activePage" : "")}
          to="/cart"
        >
          Cart (
          {cart.reduce(
            (sum, product) => sum + (product.quantity ? product.quantity : 0),
            0,
          )}
          )
        </NavLink>
      </nav>
      <Outlet context={{ cart, addToCart } satisfies CartContextType} />
    </div>
  );
}

export default App;
