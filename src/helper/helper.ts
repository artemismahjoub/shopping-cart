import {
  CartSelectedItem,
  CartStateType,
  ProductType,
  QueryType,
} from "../types/ProductType";

const shortenText = (text: string) => {
  return text.split(" ").slice(0, 3).join(" ");
};

const searchProducts = (products: ProductType[], search: string) => {
  if (!search) return products;

  const searchedProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search)
  );
  return searchedProducts;
};

const filterProducts = (products: ProductType[], category: string) => {
  if (!category) return products;
  const filteredProducts = products.filter((p) => p.category === category);
  return filteredProducts;
};

const createQueryObject = (currentQuery: QueryType, newQuery: QueryType) => {
  if (newQuery.category === "all") {
    const { category, ...rest } = currentQuery;
    return rest;
  }
  if (newQuery.search === "") {
    const { search, ...rest } = currentQuery;
    return rest;
  }
  return { ...currentQuery, ...newQuery };
};

const getInitialQuery = (searchParams: URLSearchParams) => {
  const query: QueryType = {};
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  if (search) query.search = search;
  if (category) query.category = category;
  return query;
};

const sumProducts = (products: CartSelectedItem[]) => {
  const itemsCounter = products.reduce(
    (counter, product) => counter + product.quantity,
    0
  );
  const total = products
    .reduce((total, product) => total + product.price! * product.quantity, 0)
    .toFixed(2);

  return { itemsCounter, total };
};

const productQuantity = (state: CartStateType, id: number) => {
  const index = state.selectedItems.findIndex((item) => item.id === id);
  if (index === -1) {
    return 0;
  } else {
    return state.selectedItems[index].quantity;
  }
};

export {
  shortenText,
  searchProducts,
  filterProducts,
  createQueryObject,
  getInitialQuery,
  sumProducts,
  productQuantity,
};
