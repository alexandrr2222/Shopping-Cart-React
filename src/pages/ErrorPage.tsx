import { Link } from "react-router";

export function ErrorPage() {
  return (
    <div
      data-testid="error-page"
      className="flex mt-40 flex-col items-center justify-center gap-6 bg-bg px-6 text-center font-serif text-text"
    >
      <span className="text-8xl tracking-widest text-burgundy">404</span>

      <div
        className="flex w-full max-w-xs items-center gap-3"
        aria-hidden="true"
      >
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-burgundy" />
        <span className="size-2 rotate-45 bg-burgundy" />
        <span className="h-px flex-1 bg-linear-to-l from-transparent to-burgundy" />
      </div>

      <p className="text-2xl">This page does not exist!</p>

      <Link
        className="mt-4 rounded-md bg-burgundy px-6 py-2.5 tracking-wide text-text shadow-lg shadow-black/40 transition-colors hover:bg-burgundy-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy-light"
        to="/"
      >
        Back to The Store
      </Link>
    </div>
  );
}
