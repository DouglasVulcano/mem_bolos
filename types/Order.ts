export type Order = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  category_id: string;
  sale_date: Date | null;
};
