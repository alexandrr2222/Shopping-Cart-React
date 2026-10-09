import { NavLink, Outlet } from "react-router";
import type { CartContextType, Product } from "./types";
import { useEffect, useReducer } from "react";
import { fetchProducts, fetchingReducer } from "./fetchProducts";

function App() {
  const [fetching, dispatch] = useReducer(fetchingReducer, {
    status: "loading",
  });
  useEffect(() => {
    fetchProducts(dispatch);
  }, []);

  const [cart, dispatchCart] = useReducer(cartReducer, []);
  function changeProductQuantity(product: Product, amount: number) {
    const filteredPrev = cart.filter((p) => p.id !== product.id);
    const duplicate = cart.filter((p) => p.id === product.id);
    dispatchCart({
      type: "changeQuantity",
      filteredArray: filteredPrev,
      modfiedProduct: {
        ...duplicate[0],
        quantity: amount,
      },
    });
  }
  function deleteProduct(product: Product) {
    const filteredPrev = cart.filter((p) => p.id !== product.id);
    dispatchCart({
      type: "deleteProduct",
      newCart: filteredPrev,
    });
  }

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
      <Outlet
        context={
          {
            cart,
            addToCart,
            changeProductQuantity,
            deleteProduct,
            fetching,
          } satisfies CartContextType
        }
      />
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
    }
  | {
      type: "deleteProduct";
      newCart: Array<Product>;
    };

function cartReducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "addNewProduct": {
      return [...state, action.product];
    }
    case "changeQuantity": {
      return [...action.filteredArray, action.modfiedProduct];
    }
    case "deleteProduct": {
      return [...action.newCart];
    }
    default:
      throw new Error("cart reducer failed");
  }
}
