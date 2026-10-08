import { render, screen } from "@testing-library/react";
import { Cart } from "./Cart";
// import { MemoryRouter } from "react-router";

describe("CartComponent", () => {
  it("header render", () => {
    render(<Cart />);
    expect(screen.getByRole("heading", { name: "Cart" })).toBeInTheDocument();
  });
});
