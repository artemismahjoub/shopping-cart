export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export type QueryType = {
  category?: any;
  search?: any;
};

export type CartSelectedItem = {
  id: number;
  quantity: number;
  category?: string;
  description?: string;
  image?: string;
  price?: number;
  rating?: { rate: number; count: number };
  title?: string;
};

export type CartStateType = {
  checkout: boolean;
  itemsCounter: number;
  selectedItems: CartSelectedItem[];
  total: number;
  quantity?: number;
};
