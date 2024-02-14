import BasketCard from "../components/BasketCard";
import BasketSidebar from "../components/BasketSidebar";
import { useCart } from "../context/CartContext";
import { CartStateType, ProductType } from "../types/ProductType";
import styles from "./CheckoutPage.module.css";

type Props = {};

const ShopCard = (props: Props) => {
  const [state, dispatch] = useCart();

  const clickHandler = (type: string, payload: CartStateType) =>
    dispatch({
      type,
      payload,
    });

  if (!state.itemsCounter) {
    return (
      <div className={styles.container}>
        <p>Empty</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <BasketSidebar state={state} clickHandler={clickHandler} />
      <div className={styles.products}>
        {state.selectedItems.map((product: ProductType) => (
          <BasketCard
            key={product.id}
            data={product}
            clickHandler={clickHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopCard;
