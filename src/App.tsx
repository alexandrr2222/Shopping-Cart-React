import { useReducer } from "react";
import { NavLink, Outlet } from "react-router";
import type { CartContextType, Product } from "./types";

function App() {
  const [cart, dispatchCart] = useReducer(cartReducer, []);
  function addToCart(product: Product) {
    const filteredPrev = cart.filter((p) => p.id !== product.id);
    const duplicate = cart.filter((p) => p.id === product.id);
    if (
      duplicate.length > 0 &&
      duplicate[0].quantity !== undefined &&
      product.quantity !== undefined
    ) {
      dispatchCart({
        type: "changeQuantity",
        filteredArray: filteredPrev,
        modfiedProduct: {
          ...duplicate[0],
          quantity: duplicate[0].quantity + product.quantity,
        },
      });
    } else
      dispatchCart({
        type: "addNewProduct",
        product: product,
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

type StateType = Array<Product>;

type ActionType =
  | { type: "addNewProduct"; product: Product }
  | {
      type: "changeQuantity";
      filteredArray: Array<Product>;
      modfiedProduct: Product;
    };

function cartReducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "addNewProduct": {
      return [...state, action.product];
    }
    case "changeQuantity": {
      return [...action.filteredArray, action.modfiedProduct];
    }
    default:
      throw new Error("cart reducer failed");
  }
}
