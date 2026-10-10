import { useOutletContext } from "react-router";
import { ProductCard } from "../components/ProductCard";
import type { CartContextType } from "../types";

export function Shop() {
  const { fetching, addToCart } = useOutletContext<CartContextType>();
  return (
    <div data-testid="shop-page">
      <div className="mb-8 flex items-baseline justify-between border-b border-border pb-3">
        <h2 className="text-3xl text-text">Shop Collection</h2>
        {fetching.status === "success" ? (
          <span className="text-sm text-muted">
            {fetching.products.length} items
          </span>
        ) : null}
      </div>

      {fetching.status === "loading" ? (
        <div className="flex flex-col items-center gap-4 py-24 text-muted">
          <span
            className="size-10 animate-spin rounded-full border-4 border-surface-hover border-t-burgundy"
            aria-hidden="true"
          />
          <p>Loading...</p>
        </div>
      ) : null}

      {fetching.status === "error" ? (
        <p className="mx-auto max-w-xl rounded-md border-l-4 border-burgundy bg-surface px-5 py-4 text-text">
          Fetching data failed: {fetching.error}
        </p>
      ) : null}

      {fetching.status === "success" ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-7">
          {fetching.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </ul>
      ) : null}
    </div>
  );
}
