export type Order = {
  id: number;
  userId: number;
  productIds?: number[] | { id: number }[];
};

export type CreateOrder = {
  userId: number;
  productIds: number[];
};
