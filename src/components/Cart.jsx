import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { deleteOfCart } from "../reducer";
import { setItem } from "../utils/localStorage";

import OffCanvasCart from "./OffCanvasCart";
import BillCart from "./BillCart";
import Signup from "./Signup";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Panel de pagos (agregar)
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertLogin, setShowAlertLogin] = useState(false);
  const [fromCart, setFromCart] = useState(false);

  const handleShow = () => setShow(true);

  const tests = useSelector((state) => state.tests);
  const cart = useSelector((state) => state.cart);
  const sessionId = useSelector((state) => state.sessionId);
  const [products, setProducts] = useState(
    tests.filter((e) => cart.includes(e.id))
  );

  useEffect(() => {
    setProducts(tests.filter((e) => cart.includes(e.id)));
    setItem("cart", cart);
  }, [cart, tests]);

  function handleClickDelete(e) {
    const { id } = e.target;
    const idInt = parseInt(id);
    dispatch(deleteOfCart(idInt));
  }

  function handleSubmit() {
    if (cart.length === 0) {
      alert("No tiene productos en el carrito de compras.");
    } else {
      handleShow();
    }
  }

  return (
    <div
      style={{
        margin: "auto",
        paddingTop: "2%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div style={{ width: "90%", position: "relative" }}>
        <Button
          variant="secondary"
          value={"deleteAll"}
          onClick={(e) => dispatch(deleteOfCart(e.target.value))}
          style={{ position: "absolute", right: "0px" }}
        >
          Vaciar carrito
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            paddingTop: "5%",
          }}
        >
          <Table striped>
            <thead>
              <tr>
                <th style={{ width: "50%" }}>PRODUCTO</th>
                <th style={{ width: "20%" }}>PRECIO</th>
                <th style={{ width: "10%" }}>QUITAR</th>
              </tr>
            </thead>
            <tbody>
              {products.map((test, key) => {
                return (
                  <tr key={key}>
                    <td>{test.name}</td>
                    <td>${test.price}.00</td>
                    <td>
                      <Button
                        variant="danger"
                        id={test.id}
                        onClick={(e) => handleClickDelete(e)}
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <th>TOTAL: </th>
                <th>
                  $
                  {products.map((e) => e.price || 0).reduce((a, b) => a + b, 0)}
                  .00
                </th>
              </tr>
            </tbody>
          </Table>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "2%",
            }}
          >
            <Button variant="success" as={Link} to="/quoter">
              SEGUIR COMPRANDO
            </Button>
            {sessionId ? (
              <Button variant="primary" onClick={handleSubmit}>
                PROCESAR COMPRA
              </Button>
            ) : null}
          </div>

          {sessionId ? null : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "2%",
                marginBottom: "2%",
              }}
            >
              <h5>Debe iniciar sesión antes de continuar con la compra</h5>
              <Button
                variant="primary"
                style={{
                  marginTop: "2%",
                  padding: "1%",
                  paddingRight: "3%",
                  paddingLeft: "3%",
                  width: "30%",
                }}
                onClick={() => {
                  console.log(showAlertLogin);
                  setShowAlertLogin(true);
                  setFromCart(true);
                }}
              >
                INICIAR SESIÓN
              </Button>
            </div>
          )}
        </div>
      </div>

      <div>
        <OffCanvasCart
          show={show}
          setShow={setShow}
          setShowAlert={setShowAlert}
          cart={cart}
        />
      </div>
      <div style={{ position: "absolute", width: "100%" }}>
        {" "}
        <BillCart
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          products={products}
        />
      </div>

      <div style={{ position: "relative" }}>
        <Modal
          size="lg"
          show={showAlertLogin}
          onHide={() => {
            console.log(showAlertLogin);
            setShowAlertLogin(false);
          }}
          backdrop="static"
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Body>
            <CloseButton
              onClick={() => setShowAlertLogin(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                zIndex: "1",
              }}
            ></CloseButton>
            <div
              style={{
                width: "100%",
              }}
            >
              <Signup
                setShowAlertLogin={setShowAlertLogin}
                fromCart={fromCart}
              />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
