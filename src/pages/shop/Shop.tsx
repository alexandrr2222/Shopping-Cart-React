import { useEffect, useReducer } from "react";
import { fetchProducts, fetchingReducer } from "../../fetchProducts";
import { ProductCard } from "../../productCard/ProductCard";

export function Shop() {
  const [fetching, dispatch] = useReducer(fetchingReducer, {
    status: "loading",
  });
  useEffect(() => {
    fetchProducts(dispatch);
  }, []);
  return (
    <>
      <h1>Shop</h1>
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
