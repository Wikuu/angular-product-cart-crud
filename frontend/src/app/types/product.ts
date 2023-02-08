export type Product = {
  id: number;
  name: string;
  description: string;
  code: string;
  price: number;
  build_price: number;
};

type ResponseBase = {
  message: string;
};

export type ProductGetResponse = ResponseBase & {
  products: Product[];
};

export type ProductPostResponse = ResponseBase & {
  product: Product;
};

export type ProductDeleteResponse = ResponseBase;
