import { useState } from "react";
import type { Product } from "../fetchProducts";

export function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  return (
    <li className="border-2 border-black">
      <h2>{product.title}</h2>
      <div>product</div>
      <div>
        <button
          type="button"
          onClick={() =>
            setQuantity((prev) => {
              return prev + 1;
            })
          }
        >
          +
        </button>
        <label htmlFor="input">Quantity</label>
        <input id="input" type="number" value={quantity} />
        <button
          type="button"
          onClick={() => {
            if (quantity <= 1) return;
            else
              setQuantity((prev) => {
                return prev - 1;
              });
          }}
        >
          -
        </button>
      </div>
      <button type="button">Add to cart</button>
    </li>
  );
}
