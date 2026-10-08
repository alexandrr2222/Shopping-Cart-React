import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import type { CartContextType, CartType, Product } from "./types";

function App() {
  const [cart, setCart] = useState<CartType>([]);
  function addToCart(product: Product) {
    setCart((prev) => {
      const filteredPrev = prev.filter((p) => p.id !== product.id);
      const duplicate = prev.filter((p) => p.id === product.id);
      if (
        duplicate.length > 0 &&
        duplicate[0].quantity !== undefined &&
        product.quantity !== undefined
      ) {
        return [
          ...filteredPrev,
          {
            ...duplicate[0],
            quantity: duplicate[0].quantity + product.quantity,
          },
        ];
      } else return [...prev, product];
    });
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
