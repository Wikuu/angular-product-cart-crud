import { Product } from './product';

export enum HingeSide {
  Left = 'L',
  Right = 'R',
  None = '-',
}

export enum ExposedSide {
  Left = 'L',
  Right = 'R',
  Both = 'B',
  None = '-',
}

export type Cart = {
  id?: number;
  product_id: number;
  product: Product;
  quantity: number;
  hinge_side: HingeSide;
  exposed_side: ExposedSide;
  has_build: boolean;
  total: number;
};

type BaseResponse = {
  message: string;
};

export type CartPostResponse = BaseResponse & {
  cart: Cart;
};
export type CartGetResponse = BaseResponse & {
  cart: Cart[];
};

export type CartPostRequest = {
  product_id: number;
  total: number;
};
