import React from "react";
import { TbSearch } from "react-icons/tb";
import { QueryType } from "../types/ProductType";
import { createQueryObject } from "../helper/helper";
import styles from "./SearchBox.module.css";

type Props = {
  search: string;
  setSearch: (search: string) => void;
  setQuery: React.Dispatch<React.SetStateAction<QueryType>>;
};

function SearchBox({ search, setSearch, setQuery }: Props) {
  const searchHandler = () => {
    setQuery((query) => createQueryObject(query, { search }));
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search ..."
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
      />
      <button onClick={searchHandler}>
        <TbSearch />
      </button>
    </div>
  );
}

export default SearchBox;
