/* eslint-disable no-fallthrough */
import { createContext, useContext, useEffect, useReducer } from "react";
import { sumProducts } from "../helper/helper";
import { CartSelectedItem, CartStateType } from "../types/ProductType";

const CartContext = createContext<any>([]);

const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
  checkout: false,
};

const reducer: any = (
  state: CartStateType,
  action: { type: string; payload: CartSelectedItem }
) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (state.selectedItems) {
        if (
          !state.selectedItems.find((item) => item.id === action.payload.id)
        ) {
          state.selectedItems.push({ ...action.payload, quantity: 1 });
        }
        return {
          ...state,
          ...sumProducts(state.selectedItems),
          checkout: false,
        };
      }
      return;
    case "REMOVE_ITEM":
      if (state.selectedItems) {
        const newSelectedItems = state.selectedItems.filter(
          (item) => item.id !== action.payload.id
        );
        return {
          ...state,
          selectedItems: [...newSelectedItems],
          ...sumProducts(newSelectedItems),
        };
      }
      return;
    case "INCREASE":
      if (state.selectedItems) {
        const increaseIndex = state.selectedItems.findIndex(
          (item) => item.id === action.payload.id
        );
        state.selectedItems[increaseIndex].quantity++;
        return {
          ...state,
          ...sumProducts(state.selectedItems),
        };
      }
      return;
    case "DECREASE":
      const decreaseIndex = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[decreaseIndex].quantity--;
      return {
        ...state,
        ...sumProducts(state.selectedItems),
      };
    case "CHECKOUT":
      return {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        checkout: true,
      };
    case "HYDRATE_STATE":
      return action.payload;
    default:
      throw new Error("Invalid action");
  }
};

type Props = {
  children: React.ReactNode;
};

function CartProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => {
  const { state, dispatch } = useContext(CartContext);

  useEffect(() => {
    const storedState = localStorage.getItem("cart");
    if (storedState) {
      dispatch({ type: "HYDRATE_STATE", payload: JSON.parse(storedState) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return [state, dispatch];
};

export default CartProvider;
export { useCart };
