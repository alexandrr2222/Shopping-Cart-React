import { useOutletContext } from "react-router";
import { ProductCard } from "../components/ProductCard";
import type { CartContextType } from "../types";

export function Shop() {
  const { fetching } = useOutletContext<CartContextType>();
  return (
    <>
      <h2>Shop</h2>
      {fetching.status === "loading" ? <p>Loading...</p> : null}
      {fetching.status === "error" ? (
        <p>Fetching data failed: {fetching.error}</p>
      ) : null}
      {fetching.status === "success"
        ? fetching.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        : null}
      <ul></ul>
    </>
  );
}
