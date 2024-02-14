import { TbChecklist } from "react-icons/tb";
import { FaHashtag } from "react-icons/fa";
import { BsPatchCheck } from "react-icons/bs";

import { CartStateType } from "../types/ProductType";
import styles from "./BasketSidebar.module.css";

type Props = {
  state: CartStateType;
  clickHandler: (type: string, payload: CartStateType) => any;
};

function BasketSidebar({ state, clickHandler }: Props) {
  return (
    <div className={styles.sidebar}>
      <div>
        <TbChecklist />
        <p>Total:</p>
        <span>$ {state.total}</span>
      </div>
      <div>
        <FaHashtag />
        <p>Quantity:</p>
        <span>{state.itemsCounter}</span>
      </div>
      <div>
        <BsPatchCheck />
        <p>Status:</p>
        <span>{!state.checkout && "Pending..."}</span>
      </div>
      <button onClick={() => clickHandler("CHECKOUT", state)}>Checkout</button>
    </div>
  );
}

export default BasketSidebar;
