import { render, screen } from "@testing-library/react";
import { Home } from "./Home";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, Outlet } from "react-router";
import { Shop } from "./Shop";

describe("Home Page Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            element={
              <Outlet context={{ fetching: false, addToCart: vi.fn() }} />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
  });
  it("header render", () => {
    expect(
      screen.getByRole("heading", { name: /Welcome to The Store!/i }),
    ).toBeInTheDocument();
  });
  it("description render", () => {
    expect(
      screen.getByText(
        /Discover low quality apparel, jewelry and electronics at very high prices/i,
      ),
    ).toBeInTheDocument();
  });
  it("Navigation to shop", async () => {
    expect(screen.queryByTestId("shop-page")).not.toBeInTheDocument();
    const user = userEvent.setup();
    const goToShopLink = screen.getByRole("link", { name: /shop/i });
    expect(goToShopLink).toHaveAttribute("href", "/shop");
    await user.click(goToShopLink);
    expect(screen.getByTestId("shop-page")).toBeInTheDocument();
  });
});
