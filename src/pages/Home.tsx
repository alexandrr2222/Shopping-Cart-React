import { Link } from "react-router";

export function Home() {
  return (
    <div
      data-testid="home-page"
      className="mt-32 flex flex-col items-center justify-center gap-6 text-center"
    >
      <h3 className="text-5xl text-text">Welcome to The Store!</h3>

      <div
        className="flex w-full max-w-md items-center gap-3"
        aria-hidden="true"
      >
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-burgundy" />
        <span className="size-2.5 rotate-45 border border-burgundy-light" />
        <span className="size-1.5 rotate-45 bg-burgundy" />
        <span className="size-2.5 rotate-45 border border-burgundy-light" />
        <span className="h-px flex-1 bg-linear-to-l from-transparent to-burgundy" />
      </div>

      <p className="max-w-80 text-lg text-muted">
        Discover low quality apparel, jewelry and electronics at very high
        prices
      </p>

      <Link
        className="mt-6 rounded-md bg-burgundy px-8 py-3 text-lg text-text shadow-lg shadow-black/40 transition-colors hover:bg-burgundy-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy-light"
        to="/shop"
      >
        Shop Now!
      </Link>
    </div>
  );
}
