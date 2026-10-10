import { NavLink, Outlet } from "react-router";
import type { CartContextType, Product } from "./types";
import { useEffect, useReducer } from "react";
import { fetchProducts, fetchingReducer } from "./fetchProducts";

const navClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex items-center rounded-md px-3 py-1.5 text-lg tracking-wide transition-colors ${
    isActive
      ? "bg-surface-hover text-burgundy-light"
      : "text-muted hover:bg-surface-hover hover:text-text"
  }`;

function App() {
  const [fetching, dispatch] = useReducer(fetchingReducer, {
    status: "loading",
  });
  useEffect(() => {
    fetchProducts(dispatch);
  }, []);

  const [cart, dispatchCart] = useReducer(cartReducer, []);
  function changeProductQuantity(product: Product, amount: number) {
    const newArray = cart.map((p) => {
      if (p.id === product.id) return { ...p, quantity: amount };
      else return p;
    });
    dispatchCart({
      type: "changeQuantity",
      newArray: newArray,
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
    const duplicate = cart.filter((p) => p.id === product.id);
    const newArray = cart.map((p) => {
      if (p.id === product.id && p.quantity && product.quantity)
        return { ...p, quantity: p.quantity + product.quantity };
      else return p;
    });
    if (
      duplicate.length > 0 &&
      duplicate[0].quantity !== undefined &&
      product.quantity !== undefined
    ) {
      dispatchCart({
        type: "changeQuantity",
        newArray: newArray,
      });
    } else
      dispatchCart({
        type: "addNewProduct",
        product: product,
      });
  }

  const cartCount = cart.reduce(
    (sum, product) => sum + (product.quantity ? product.quantity : 0),
    0,
  );

  return (
    <div className="flex h-dvh flex-col bg-bg font-serif text-text">
      <header className="z-10 shrink-0 border-b-2 border-burgundy/70 bg-surface shadow-lg shadow-black/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-4xl tracking-[0.12em] text-text">The Store</h1>
          <nav className="flex items-center gap-2">
            <NavLink className={navClass} to="/">
              Home
            </NavLink>
            <NavLink className={navClass} to="/shop">
              Store
            </NavLink>
            <NavLink className={navClass} to="/cart">
              Cart
              <span className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-burgundy px-1.5 font-sans text-xs font-bold text-text">
                {cartCount}
              </span>
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto scrollbar-gutter-stable">
        <div className="mx-auto max-w-7xl px-6 py-8">
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
      </main>
    </div>
  );
}

export default App;

type StateType = Array<Product>;

type ActionType =
  | { type: "addNewProduct"; product: Product }
  | {
      type: "changeQuantity";
      newArray: Array<Product>;
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
      return [...action.newArray];
    }
    case "deleteProduct": {
      return [...action.newCart];
    }
    default:
      throw new Error("cart reducer failed");
  }
}
