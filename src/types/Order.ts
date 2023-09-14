export type Order = {
  id: number;
  userId: number;
  productIds?: number[] | { id: number }[];
};
