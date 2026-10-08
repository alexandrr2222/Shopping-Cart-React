import { useOutletContext } from "react-router";
import type { CartContextType } from "../types";
import { useId } from "react";

export function Cart() {
  const { cart, changeProductQuantity, deleteProduct } =
    useOutletContext<CartContextType>();
  const inputId = useId();
  return (
    <div>
      <h2>Cart</h2>
      {cart.length < 1 ? (
        <p>Empty Cart</p>
      ) : (
        <ul>
          {cart.map((product) => {
            return (
              <li key={product.id} className="outline-2 outline-black">
                <div>{product.title}</div>
                <label htmlFor={inputId}>Amount</label>
                <input
                  id={inputId}
                  type="number"
                  defaultValue={product.quantity}
                  onChange={(e) => {
                    const typedInput = Number(e.target.value);
                    if (typeof typedInput !== "number" || typedInput < 1)
                      return 1;
                    else changeProductQuantity(product, typedInput);
                  }}
                />
                <button onClick={() => deleteProduct(product)}>
                  Remove Item
                </button>
                <div>Price per item: {product.price}</div>
              </li>
            );
          })}
        </ul>
      )}
      <div>
        Total:{" "}
        {cart
          .reduce(
            (sum, product) =>
              sum + product.price * (product.quantity ? product.quantity : 0),
            0,
          )
          .toFixed(2)}
      </div>
    </div>
  );
}
