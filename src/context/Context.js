import React, { useContext, useReducer } from "react";
import { createContext } from "react";
import faker from "faker";
import { cardReducer } from "./Reducer";
import { productReducer } from "./ProductReducer";

const Cart = createContext();

const Context = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price().split(".")[0] / 100,
    image:
      "https://cdn.coursehunter.net/courses/360x220/izuchite-veb-animaciyu-prostym-sposobom-vvedenie-v-svg-i-gsap.webp",
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));
  const [state, dispatch] = useReducer(cardReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};
export default Context;

export const CartState = () => {
  return useContext(Cart);
};
