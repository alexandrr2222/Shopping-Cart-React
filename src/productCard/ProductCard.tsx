import { useId, useState } from "react";
import type { Product } from "../fetchProducts";

export function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const inputId = useId();
  return (
    <li className="border-2 border-black">
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} />
      <div>{product.description}</div>
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
        <label htmlFor={inputId}>Quantity</label>
        <input
          id={inputId}
          aria-label={"quantity for " + product.title}
          type="number"
          value={quantity}
          onChange={(e) => {
            const typedInput = Number(e.target.value);
            if (typeof typedInput !== "number" || typedInput < 1) return 1;
            else setQuantity(typedInput);
          }}
        />
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
