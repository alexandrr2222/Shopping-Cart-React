import { fetchProducts } from "../../fetchProducts";

export function Home() {
  return (
    <>
      <h1>Home</h1>
      <p>yo yo yo</p>
      <button type="button" onClick={() => console.log(fetchProducts())}>
        hi
      </button>
    </>
  );
}
