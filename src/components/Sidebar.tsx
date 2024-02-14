import React from "react";
import { createQueryObject } from "../helper/helper";
import { QueryType } from "../types/ProductType";
import styles from "./Sidebar.module.css";
import { categories } from "../constants/List";

type Props = {
  query: QueryType;
  setQuery: React.Dispatch<React.SetStateAction<QueryType>>;
};

function Sidebar({ query, setQuery }: Props) {
  const categoryHandler = (
    event: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) => {
    const { tagName } = event.target as HTMLUListElement;
    const category = (event.target as HTMLLIElement).innerText.toLowerCase();

    if (tagName !== "LI") return;

    setQuery((query) => createQueryObject(query, { category }));
  };

  return (
    <div className={styles.sidebar}>
      <div>
        <p>Categories</p>
      </div>
      <ul onClick={categoryHandler}>
        {categories.map((category) => (
          <li
            key={category.id}
            className={
              category.type.toLowerCase() === query.category
                ? styles.selected
                : undefined
            }
          >
            {category.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
