export type Product = {
  id: number;
  category: string;
  title: string;
  image: string;
  description: string;
  price: number;
  quantity?: number;
};

export type CartContextType = {
  cart: CartType;
  addToCart: (arg0: Product) => void;
  changeProductQuantity: (arg0: Product, arg1: number) => void;
  deleteProduct: (arg0: Product) => void;
};
export type CartType = Array<Product>;
