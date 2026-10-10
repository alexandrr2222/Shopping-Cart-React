import { Link, useOutletContext } from "react-router";
import type { CartContextType } from "../types";
import { useId } from "react";

export function Cart() {
  const { cart, changeProductQuantity, deleteProduct } =
    useOutletContext<CartContextType>();
  const inputId = useId();
  return (
    <div data-testid="cart-page">
      <div className="mb-8 border-b border-border pb-3">
        <h2 className="text-3xl tracking-wide text-text">Your Cart</h2>
      </div>

      {cart.length < 1 ? (
        <div className="flex flex-col items-center gap-6 py-24 text-center">
          <p className="text-2xl text-muted">Empty Cart</p>
          <Link
            to="/shop"
            className="rounded-md bg-burgundy px-6 py-2.5 tracking-wide text-text shadow-lg shadow-black/40 transition-colors hover:bg-burgundy-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy-light"
          >
            Go to Store
          </Link>
        </div>
      ) : (
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_320px]">
          <ul className="flex flex-col gap-4">
            {cart.map((product) => {
              return (
                <li
                  key={product.id}
                  className="flex flex-col gap-4 rounded-md border-l-4 border-burgundy bg-surface p-4 shadow-md shadow-black/30 sm:flex-row sm:items-center"
                >
                  <div className="size-24 shrink-0 rounded-md bg-radial from-parchment from-55% to-parchment-dark p-2 shadow-[inset_0_0_12px_rgba(0,0,0,0.25)]">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-contain mix-blend-multiply"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="line-clamp-2 text-lg text-text">
                      {product.title}
                    </div>
                    <div className="text-sm text-muted">
                      Price per item: {product.price}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor={`${inputId}-${product.id}`}
                        className="text-sm text-muted"
                      >
                        Amount
                      </label>
                      <input
                        id={`${inputId}-${product.id}`}
                        type="number"
                        value={product.quantity}
                        onChange={(e) => {
                          const typedInput = Number(e.target.value);
                          if (Number.isNaN(typedInput) || typedInput < 1) {
                            return changeProductQuantity(product, 1);
                          } else changeProductQuantity(product, typedInput);
                        }}
                        className="w-16 rounded-md border border-border bg-bg px-2 py-1.5 text-center font-sans text-text focus:border-burgundy-light focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={() => deleteProduct(product)}
                      className="cursor-pointer rounded-md border border-burgundy px-3 py-1.5 text-sm text-burgundy-light transition-colors hover:bg-burgundy hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy-light"
                    >
                      Remove Item
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="sticky top-0 rounded-md bg-surface p-6 shadow-lg shadow-black/40">
            <h3 className="mb-4 border-b border-border pb-2 text-xl tracking-wide">
              Summary
            </h3>
            <div className="text-2xl font-bold text-burgundy-light">
              {"Total: " +
                cart
                  .reduce(
                    (sum, product) =>
                      sum +
                      product.price * (product.quantity ? product.quantity : 0),
                    0,
                  )
                  .toFixed(2)}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
