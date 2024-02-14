import { useEffect, useState, createContext, useContext } from "react";

import { ProductType } from "../types/ProductType";
import api from "../services/api";

export const ProductsContext = createContext<ProductType[]>([]);

type Props = {
  children: React.ReactNode;
};

const ProductsProvider: React.FC<Props> = ({ children }) => {
  // fix the type of any here
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};

const useProducts = () => {
  const products = useContext(ProductsContext);
  return products;
};

const useProductDetails = (id: number) => {
  const products = useContext(ProductsContext);
  const result = products.find((product) => product.id === id);
  return result;
};

export default ProductsProvider;
export { useProducts, useProductDetails };
