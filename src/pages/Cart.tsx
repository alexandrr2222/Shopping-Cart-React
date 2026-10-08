import { useOutletContext } from "react-router";
import type { CartContextType } from "../types";

export function Cart() {
  const { cart } = useOutletContext<CartContextType>();
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
                <div>Amount: {product.quantity}</div>
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
// refactor cart adding to usereducer, so it add 1, remove 1, addNew
