import React from "react";
import { Button, Card } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const SingleProduct = ({ product }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={product.image} alt={product.name} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>$ {product.price}</span>
            {product.fastDelivery ? (
              <div>fast delivery</div>
            ) : (
              <div>4 days delivery</div>
            )}
            <Rating rating={product.ratings} onClick={""} />
          </Card.Subtitle>
          {cart.some((p) => p.id === product.id) ? (
            <Button
              variant="danger"
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_CART", payload: product })
              }
            >
              Remove From Cart
            </Button>
          ) : (
            <Button
              disabled={!product.inStock}
              onClick={() =>
                dispatch({ type: "ADD_TO_CART", payload: product })
              }
            >
              {product.inStock ? "Add To Cart" : "Out OF STOCK"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
