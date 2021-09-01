import React from "react";
import { CartState } from "../context/Context";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";
import "./styles.css";
const Home = () => {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();
  console.log({ products });

  const transformProducts = () => {
    let sortedProducts = products;
    if (sort) {
      sortedProducts = products.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }
    if (!byStock) {
      sortedProducts = products.filter((product) => product.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = products.filter((product) => product.fastDelivery);
    }
    if (byRating) {
      sortedProducts = products.filter(
        (product) => product.ratings >= byRating
      );
    }
    if (searchQuery) {
      sortedProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts().map((product) => (
          <SingleProduct product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
