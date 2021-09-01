import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";
import Rating from "../components/Rating";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const [total, setTotal] = useState(0);

  const {
    state: { cart },
    dispatch,
  } = CartState();

  useEffect(() => {
    const totalPrice = cart.reduce((acc, cv) => cv.price * cv.qty + acc, 0);
    console.log(totalPrice);
    setTotal(totalPrice);
  }, [cart]);
  return (
    <div className="home" style={{ flexDirection: "row" }}>
      <div className="productContainer cartCheckout">
        <ListGroup>
          {cart.map((product) => (
            <ListGroup.Item key={product.id}>
              <Row>
                <Col md={2}>
                  <Image src={product.image} alt={product.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{product.name}</span>
                </Col>
                <Col md={2}>
                  <span>{product.price}</span>
                </Col>
                <Col md={2}>
                  <Rating rating={product.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={product.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CARD_QTY",
                        payload: { id: product.id, qty: e.target.value },
                      })
                    }
                  >
                    {[...Array(product.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <AiFillDelete
                    fontSize="20px"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_CART", payload: product })
                    }
                  />
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="filters summary">
          <span className="title">Subtotal ({cart.length}) items</span>
          <span style={{ fontWeight: 700, fontSize: 20 }}>Total {total} $</span>
          <Link to="/">
            <Button
              className="btn-custom"
              type="button"
              disabled={cart.length === 0}
            >
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
