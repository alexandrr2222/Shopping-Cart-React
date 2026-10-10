import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ErrorPage } from "./ErrorPage";

function renderErrorPage() {
  render(
    <MemoryRouter>
      <ErrorPage />
    </MemoryRouter>,
  );
}

describe("Error Page Component", () => {
  it("description render", () => {
    renderErrorPage();
    expect(screen.getByText("This page does not exist!")).toBeInTheDocument();
  });

  it("links back to the home page", () => {
    renderErrorPage();
    expect(
      screen.getByRole("link", { name: /Back to The Store/i }),
    ).toHaveAttribute("href", "/");
  });
});
