import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, Outlet } from "react-router";
import { Cart } from "./Cart";
import type { Product } from "../types";

const fakeItem: Product = {
  id: 1,
  category: "category1",
  title: "item1",
  image: "img1",
  description: "desc1",
  price: 50,
  quantity: 1,
};

const fakeItem2: Product = {
  id: 2,
  category: "category2",
  title: "item2",
  image: "img2",
  description: "desc2",
  price: 35,
  quantity: 3,
};

const deleteProduct = vi.fn();
const changeProductQuantity = vi.fn();

function renderCart(cart: Array<Product>) {
  return render(
    <MemoryRouter initialEntries={["/cart"]}>
      <Routes>
        <Route
          element={
            <Outlet context={{ cart, deleteProduct, changeProductQuantity }} />
          }
        >
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

function getItemRow(title: string) {
  return screen.getByText(new RegExp(`^${title}$`, "i")).closest("li")!;
}

describe("Cart Page Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders empty cart", () => {
    renderCart([]);
    expect(
      screen.getByRole("heading", { name: /your cart/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/empty cart/i)).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
    expect(screen.queryByText(/total/i)).not.toBeInTheDocument();
  });

  it("renders items and total", () => {
    renderCart([fakeItem, fakeItem2]);
    expect(screen.queryByText(/empty cart/i)).not.toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText(/^item1$/i)).toBeInTheDocument();
    expect(screen.getByText(/price per item: 35/i)).toBeInTheDocument();
    // 50 * 1 + 35 * 3 = 155
    expect(screen.getByText("Total: 155.00")).toBeInTheDocument();
  });

  it("calls deleteProduct with the right item", async () => {
    const user = userEvent.setup();
    renderCart([fakeItem, fakeItem2]);

    await user.click(
      within(getItemRow("item1")).getByRole("button", { name: /remove item/i }),
    );

    expect(deleteProduct).toHaveBeenCalledTimes(1);
    expect(deleteProduct).toHaveBeenCalledWith(fakeItem);
  });

  it("calls changeProductQuantity with the typed amount", () => {
    renderCart([fakeItem, fakeItem2]);
    const input = within(getItemRow("item1")).getByLabelText(/amount/i);

    fireEvent.change(input, { target: { value: "23" } });

    expect(changeProductQuantity).toHaveBeenCalledWith(fakeItem, 23);
  });

  it("falls back to 1 for invalid amounts", () => {
    renderCart([fakeItem2]);
    const input = within(getItemRow("item2")).getByLabelText(/amount/i);

    fireEvent.change(input, { target: { value: "0" } });

    expect(changeProductQuantity).toHaveBeenCalledWith(fakeItem2, 1);
  });
});
