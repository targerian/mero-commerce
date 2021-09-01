import React from "react";
import {
  Container,
  FormControl,
  Nav,
  Navbar,
  Dropdown,
  Badge,
  Button,
} from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";
const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();
  return (
    <Navbar
      bg="dark"
      variant="dark"
      style={{
        height: "80",
        width: "100vw",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <Container>
        <Link to="/">
          <Navbar.Brand>Merhan's E-commerce</Navbar.Brand>
        </Link>
        <Navbar.Text>
          <FormControl
            style={{ width: "40vw" }}
            placeholder="Search for a Product"
            className="m-auto"
            onChange={(e) =>
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value.toLowerCase(),
              })
            }
          />
        </Navbar.Text>
        <Nav>
          <Dropdown className="dropstart">
            <Dropdown.Toggle variant="success">
              <FaShoppingCart />
              <Badge bg="none">
                {cart.reduce((acc, cv) => acc + cv.qty, 0)}
              </Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 370 }}>
              {!cart.length ? (
                <span style={{ padding: 10 }}>Your cart is empty!</span>
              ) : (
                <>
                  {cart.map((product) => (
                    <span className="cartitem" key={product.id}>
                      <img
                        src={product.image}
                        className="cartItemImg"
                        alt={product.name}
                      />
                      <div className="cartItemDetail">
                        <span>{product.name}</span>
                        <span>$ {product.price}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: product,
                          })
                        }
                      />
                    </span>
                  ))}

                  <Dropdown.Item>
                    <Link to="/cart">
                      <Button style={{ width: "95%", margin: "0 10px" }}>
                        Go To Cart
                      </Button>
                    </Link>
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
