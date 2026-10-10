import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Outlet } from "react-router";
import { Shop } from "./Shop";
import type { Product, StateType } from "../types";

describe("Home Page Component", () => {
  let fakeProducts: Array<Product>;
  beforeEach(() => {
    fakeProducts = [
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
  });
  function renderRoutedShop(fetchingObject: StateType) {
    return (
      <MemoryRouter initialEntries={["/shop"]}>
        <Routes>
          <Route
            element={
              <Outlet
                context={{ fetching: fetchingObject, addToCart: vi.fn() }}
              />
            }
          >
            <Route path="/shop" element={<Shop />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  }

  it("render on loading", () => {
    render(renderRoutedShop({ status: "loading" }));
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    expect(screen.queryByText(/Fetching data failed/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/item1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/item2/i)).not.toBeInTheDocument();
  });
  it("render on error", () => {
    render(renderRoutedShop({ status: "error", error: "fail" }));
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Fetching data failed/i)).toBeInTheDocument();
    expect(screen.queryByText(/item1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/item2/i)).not.toBeInTheDocument();
  });
  it("render on success", () => {
    render(renderRoutedShop({ status: "success", products: fakeProducts }));
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Fetching data failed/i)).not.toBeInTheDocument();
    expect(screen.getByText(/item1/i)).toBeInTheDocument();
    expect(screen.getByText(/item2/i)).toBeInTheDocument();
  });
});
