import React, { useEffect, useState } from "react";
import styles from "./ProductsPage.module.css";
import { useSearchParams } from "react-router-dom";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { ProductType, QueryType } from "../types/ProductType";
import { getInitialQuery, searchProducts } from "../helper/helper";
import { filterProducts } from "../helper/helper";
import SearchBox from "../components/SearchBox";
import Sidebar from "../components/Sidebar";

// Context
import { useProducts } from "../context/ProductContext";

type Props = {};

const Store: React.FC<Props> = ({}) => {
  const products = useProducts();
  const [search, setSearch] = useState("");
  const [displayed, setDisplayed] = useState<ProductType[]>([]);
  const [query, setQuery] = useState<QueryType>({});

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setDisplayed(products);
    setQuery(getInitialQuery(searchParams));
  }, [products]);

  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search || undefined);
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplayed(finalProducts);
  }, [query]);

  return (
    <>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
      <div className={styles.container}>
        <div className={styles.products}>
          {!displayed.length && <Loader />}
          {displayed.map((p) => {
            return <Card key={p.id} data={p} />;
          })}
        </div>
        <Sidebar query={query} setQuery={setQuery} />
      </div>
    </>
  );
};

export default Store;
