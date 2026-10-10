import { render, screen } from "@testing-library/react";
import { ProductCard } from "./ProductCard";
import type { Product } from "../types";
import userEvent, { type UserEvent } from "@testing-library/user-event";

describe("ProductCard Component", () => {
  let fakeProduct: Product;
  let fakeAddToCart: (arg0: Product) => void;
  let user: UserEvent;

  beforeEach(() => {
    fakeProduct = {
      id: 3,
      category: "clothes",
      title: "black shirt",
      image: "imagelink",
      description: "cool shirt for winter",
      price: 132,
      quantity: 3,
    };
    fakeAddToCart = vi.fn();
    user = userEvent.setup();
    render(<ProductCard product={fakeProduct} addToCart={fakeAddToCart} />);
  });

  it("header render", () => {
    expect(
      screen.getByRole("heading", { name: "black shirt" }),
    ).toBeInTheDocument();
  });
  it("image render", () => {
    expect(screen.getByAltText("black shirt")).toBeInTheDocument();
  });
  it("description render", () => {
    expect(screen.getByText("cool shirt for winter")).toBeInTheDocument();
  });
  it("manipulating quantity", async () => {
    const plusButton = screen.getByRole("button", { name: "+" });
    const minusButton = screen.getByRole("button", { name: "-" });
    const quantityInput = screen.getByLabelText("Quantity");

    expect(quantityInput).toHaveValue(1);
    await user.click(plusButton);
    await user.click(plusButton);
    expect(quantityInput).toHaveValue(3);
    await user.click(minusButton);
    expect(quantityInput).toHaveValue(2);
    await user.click(minusButton);
    await user.click(minusButton);
    await user.click(minusButton);
    expect(quantityInput).toHaveValue(1);
    await user.type(quantityInput, "23", {
      initialSelectionStart: 0,
      initialSelectionEnd: 1,
    });
    expect(quantityInput).toHaveValue(23);
  });
  it("adding to cart", async () => {
    const addButton = screen.getByRole("button", { name: "Add to cart" });
    const plusButton = screen.getByRole("button", { name: "+" });
    expect(fakeAddToCart).not.toHaveBeenCalled();
    await user.click(plusButton);
    await user.click(addButton);
    expect(fakeAddToCart).toHaveBeenCalledWith({ ...fakeProduct, quantity: 2 });
  });
});
