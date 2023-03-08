import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { deleteOfCart } from "../reducer";
import { setItem } from "../utils/localStorage";

import OffCanvasCart from "./OffCanvasCart";
import BillCart from "./BillCart";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Panel de pagos (agregar)
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
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
        width: "80%",
        position: "relative",
      }}
    >
      <hr />
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
          paddingTop: "2%",
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
                ${products.map((e) => e.price || 0).reduce((a, b) => a + b, 0)}
                .00
              </th>
            </tr>
          </tbody>
        </Table>
      </div>
      {sessionId ? (
        <div
          style={{
            display: "flex",
            width: "400px",
            justifyContent: "space-around",
            marginBottom: "2%",
          }}
        >
          <Button
            variant="success"
            style={{ padding: "1%", paddingRight: "3%", paddingLeft: "3%" }}
            as={Link}
            to="/quoter"
          >
            SEGUIR COMPRANDO
          </Button>
          <Button
            variant="primary"
            style={{ padding: "1%", paddingRight: "3%", paddingLeft: "3%" }}
            onClick={handleSubmit}
          >
            PROCESAR COMPRA
          </Button>
        </div>
      ) : (
        <div>
          <h4>Debe iniciar sesión</h4>
          <Button
            variant="primary"
            style={{ padding: "1%", paddingRight: "3%", paddingLeft: "3%" }}
            onClick={() => navigate("/signup")}
          >
            Iniciar sesión
          </Button>
        </div>
      )}
      <div>
        {" "}
        <OffCanvasCart
          show={show}
          setShow={setShow}
          setShowAlert={setShowAlert}
          products={products}
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
    </div>
  );
}
