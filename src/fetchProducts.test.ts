import { fetchProducts, fetchingReducer } from "./fetchProducts";
import type { ActionType, StateType } from "./types";

const apiProducts = [
  {
    id: 1,
    title: "item1",
    price: 50,
    description: "desc1",
    category: "category1",
    image: "img1",
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: "item2",
    price: 35,
    description: "desc2",
    category: "category2",
    image: "img2",
    rating: { rate: 4.1, count: 259 },
  },
];

const expectedProducts = [
  {
    id: 1,
    title: "item1",
    price: 50,
    description: "desc1",
    category: "category1",
    image: "img1",
  },
  {
    id: 2,
    title: "item2",
    price: 35,
    description: "desc2",
    category: "category2",
    image: "img2",
  },
];

afterEach(() => {
  vi.restoreAllMocks();
});

describe("fetchProducts", () => {
  it("fetches from the products endpoint", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => apiProducts,
    } as Response);
    await fetchProducts(vi.fn());
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith("https://fakestoreapi.com/products");
  });

  it("dispatches success with only the fields the app uses", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => apiProducts,
    } as Response);
    const dispatch = vi.fn();
    await fetchProducts(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: "success",
      data: expectedProducts,
    });

    const dispatched = dispatch.mock.calls[0][0];
    expect(dispatched.data[0]).not.toHaveProperty("rating");
  });

  it("dispatches an error when the response is not ok", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    } as Response);
    const dispatch = vi.fn();
    await fetchProducts(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: "error",
      error: "products fetch failed",
    });
  });

  it("dispatches the error message when fetch rejects", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network down"));
    const dispatch = vi.fn();
    await fetchProducts(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: "error",
      error: "network down",
    });
  });

  it("falls back to a generic message when a non-Error is thrown", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue("boom");
    const dispatch = vi.fn();
    await fetchProducts(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: "error",
      error: "Something went wrong",
    });
  });

  it("does not dispatch success when the request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network down"));
    const dispatch = vi.fn();
    await fetchProducts(dispatch);
    expect(dispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: "success" }),
    );
  });
});

describe("fetchingReducer", () => {
  const loading: StateType = { status: "loading" };

  it("returns success state with products", () => {
    const next = fetchingReducer(loading, {
      type: "success",
      data: expectedProducts,
    });
    expect(next).toEqual({ status: "success", products: expectedProducts });
  });

  it("returns error state with the message", () => {
    const next = fetchingReducer(loading, {
      type: "error",
      error: "products fetch failed",
    });
    expect(next).toEqual({ status: "error", error: "products fetch failed" });
  });

  it("returns a new object instead of mutating state", () => {
    const next = fetchingReducer(loading, {
      type: "error",
      error: "x",
    });
    expect(next).not.toBe(loading);
    expect(loading).toEqual({ status: "loading" });
  });

  it("falls back to loading on an unknown action", () => {
    const next = fetchingReducer({ status: "error", error: "x" }, {
      type: "nonsense",
    } as unknown as ActionType);
    expect(next).toEqual({ status: "loading" });
  });
});
