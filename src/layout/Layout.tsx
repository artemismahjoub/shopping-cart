import React from "react";
import { Link } from "react-router-dom";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { useCart } from "../context/CartContext";
import styles from "./Layout.module.css";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const [state] = useCart();

  return (
    <>
      <header className={styles.header}>
        <Link to="/products">ArtemisShop</Link>
        <Link to="/checkout">
          <div>
            <PiShoppingCartSimpleBold />
            {!!state.itemsCounter && <span>{state.itemsCounter}</span>}
          </div>
        </Link>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Developed by Artemis with ❤️</p>
      </footer>
    </>
  );
}

export default Layout;
