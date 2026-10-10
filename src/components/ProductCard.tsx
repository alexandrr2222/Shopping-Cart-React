import { useId, useState } from "react";
import type { Product } from "../types";

export function ProductCard({
  product,
  addToCart,
}: {
  product: Product;
  addToCart: (arg0: Product) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const inputId = useId();
  return (
    <li className="flex flex-col overflow-hidden rounded-md border border-border bg-surface shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:border-burgundy/60">
      <div className="h-52 shrink-0 bg-radial from-parchment from-55% to-parchment-dark p-5 shadow-[inset_0_0_24px_rgba(0,0,0,0.25)]">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain mix-blend-multiply"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 border-t-2 border-burgundy/70 p-4">
        <h3 className="line-clamp-2 h-14 text-lg leading-7 text-text">
          {product.title}
        </h3>

        <div className="text-xl font-bold text-burgundy-light">
          ${product.price.toFixed(2)}
        </div>

        <div className="line-clamp-3 text-sm text-muted">
          {product.description}
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-2">
          <div className="flex items-center justify-center">
            <label htmlFor={inputId} className="sr-only">
              Quantity
            </label>
            <div className="flex overflow-hidden rounded-md border border-border">
              <button
                type="button"
                onClick={() => {
                  if (quantity <= 1) return;
                  else
                    setQuantity((prev) => {
                      return prev - 1;
                    });
                }}
                className="size-9 cursor-pointer bg-surface-hover text-lg text-burgundy-light transition-colors hover:bg-burgundy hover:text-text"
              >
                -
              </button>
              <input
                id={inputId}
                aria-label={"quantity for " + product.title}
                type="number"
                value={quantity}
                onChange={(e) => {
                  const typedInput = Number(e.target.value);
                  if (Number.isNaN(typedInput) || typedInput < 1)
                    return setQuantity(1);
                  else setQuantity(typedInput);
                }}
                className="w-14 border-x border-border bg-bg text-center font-sans text-text [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                type="button"
                onClick={() =>
                  setQuantity((prev) => {
                    return prev + 1;
                  })
                }
                className="size-9 cursor-pointer bg-surface-hover text-lg text-burgundy-light transition-colors hover:bg-burgundy hover:text-text"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => addToCart({ ...product, quantity: quantity })}
            className="w-full cursor-pointer rounded-md bg-burgundy py-2.5 tracking-wide text-text shadow-md shadow-black/40 transition-colors hover:bg-burgundy-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy-light"
          >
            Add to cart
          </button>
        </div>
      </div>
    </li>
  );
}
