import { render, screen } from "@testing-library/react";
import { Home } from "./pages/Home";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router";
import { Shop } from "./pages/Shop";
import App from "./App";
import { Cart } from "./pages/Cart";

const fakeCart = [
  {
    id: 1,
    category: "category1",
    title: "item1",
    image: "img1",
    description: "desc1",
    price: 50,
    quantity: 1,
  },
  {
    id: 2,
    category: "category2",
    title: "item2",
    image: "img2",
    description: "desc2",
    price: 35,
    quantity: 3,
  },
];

function renderApp() {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => fakeCart,
  } as Response);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Fetching products", () => {
  it("fetches the store on mount", () => {
    renderApp();
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/products",
    );
  });

  it("renders fetched products on the shop page", async () => {
    renderApp();
    const user = userEvent.setup();
    await user.click(screen.getByRole("link", { name: /Store/i }));
    expect(await screen.findByText("item1")).toBeInTheDocument();
    expect(screen.getByText("item2")).toBeInTheDocument();
  });

  it("shows an error when the fetch fails", async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(
      new Error("network down"),
    );
    renderApp();
    const user = userEvent.setup();
    await user.click(screen.getByRole("link", { name: /Store/i }));
    expect(
      await screen.findByText(/Fetching data failed/i),
    ).toBeInTheDocument();
  });
});

describe("PageHeader Component", () => {
  beforeEach(() => {
    renderApp();
  });

  it("header render", () => {
    expect(
      screen.getByRole("heading", { level: 1, name: "The Store" }),
    ).toBeInTheDocument();
  });

  it("Navigation to home", async () => {
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    const user = userEvent.setup();
    const goToShopLink = screen.getByRole("link", { name: /Store/i });
    await user.click(goToShopLink);
    expect(screen.queryByTestId("home-page")).not.toBeInTheDocument();
    const goToHome = screen.getByRole("link", { name: /Home/i });
    expect(goToHome).toHaveAttribute("href", "/");
    await user.click(goToHome);
    expect(goToHome).toHaveAttribute("aria-current", "page");
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  it("Navigation to shop", async () => {
    expect(screen.queryByTestId("shop-page")).not.toBeInTheDocument();
    const user = userEvent.setup();
    const goToShopLink = screen.getByRole("link", { name: /Store/i });
    expect(goToShopLink).toHaveAttribute("href", "/shop");
    await user.click(goToShopLink);
    expect(goToShopLink).toHaveAttribute("aria-current", "page");
    expect(screen.getByTestId("shop-page")).toBeInTheDocument();
    expect(await screen.findByText("item1")).toBeInTheDocument();
  });

  it("Navigation to cart", async () => {
    expect(screen.queryByTestId("cart-page")).not.toBeInTheDocument();
    const user = userEvent.setup();
    const goToCart = screen.getByRole("link", { name: /Cart/i });
    expect(goToCart).toHaveAttribute("href", "/cart");
    await user.click(goToCart);
    expect(goToCart).toHaveAttribute("aria-current", "page");
    expect(screen.getByTestId("cart-page")).toBeInTheDocument();
  });
});
