import type { ActionType, Product, StateType } from "./types";

export async function fetchProducts(
  dispatch: React.ActionDispatch<[action: ActionType]>,
) {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw new Error("products fetch failed");
    const data = await res.json();
    dispatch({
      type: "success",
      data: data.map((product: Product) => {
        return {
          id: product.id,
          category: product.category,
          title: product.title,
          image: product.image,
          description: product.description,
          price: product.price,
        };
      }),
    });
  } catch (error) {
    let message: string;
    if (error instanceof Error) message = error.message;
    else message = "Something went wrong";
    dispatch({ type: "error", error: message });
  }
}

export function fetchingReducer(
  _state: StateType,
  action: ActionType,
): StateType {
  switch (action.type) {
    case "success": {
      return {
        status: "success",
        products: action.data,
      };
    }
    case "error": {
      return {
        status: "error",
        error: action.error,
      };
    }
    default: {
      return {
        status: "loading",
      };
    }
  }
}
