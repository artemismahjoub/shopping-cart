import { MdDeleteOutline } from "react-icons/md";
import { shortenText } from "../helper/helper";
import styles from "./BasketCard.module.css";

type Props = {
  data: any;
  clickHandler: any;
};

function BasketCard({ data, clickHandler }: Props) {
  const { image, quantity, title } = data;
  return (
    <div className={styles.card}>
      <img src={image} alt={title} />
      <p>{shortenText(title)}</p>
      <div className={styles.actions}>
        {quantity === 1 && (
          <button onClick={() => clickHandler("REMOVE_ITEM", data)}>
            <MdDeleteOutline />
          </button>
        )}
        {!!quantity && quantity > 1 && (
          <button onClick={() => clickHandler("DECREASE", data)}>-</button>
        )}
        <span>{quantity}</span>
        <button onClick={() => clickHandler("INCREASE", data)}>+</button>
      </div>
    </div>
  );
}

export default BasketCard;
