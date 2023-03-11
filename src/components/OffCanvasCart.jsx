import axios from "axios";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/esm/DropdownButton";

import React, { useState } from "react";
import { validatePayCard } from "../utils/validate";
import { useSelector } from "react-redux";

const BACK = process.env.REACT_APP_BACK;

export default function OffCanvasCart(props) {
  const { show, setShow, setShowAlert, cart } = props;
  const handleClose = () => setShow(false);
  const token = useSelector((state) => state.sessionId?.token);
  const [creditCard, setCreditCard] = useState({
    name: "",
    number: "",
    month: "",
    year: "",
    cvv: "",
    dni: "",
    touched: {
      name: false,
      number: false,
      month: false,
      year: false,
      cvv: false,
      dni: false,
    },
  });

  const [errorsCreditCard, setErrorsCreditCard] = useState({
    name: "",
    number: "",
    month: "",
    year: "",
    cvv: "",
    dni: "",
  });

  function handleChange(e) {
    const { name, value, innerText } = e.target;
    if (innerText && name === "month") {
      setCreditCard((prevState) => ({
        ...prevState,
        [name]: innerText,
        touched: { ...prevState.touched, [name]: true },
      }));
      setErrorsCreditCard(
        validatePayCard({
          ...creditCard,
          [name]: innerText,
        })
      );
    } else if (innerText && name === "year") {
      setCreditCard((prevState) => ({
        ...prevState,
        [name]: innerText,
        touched: { ...prevState.touched, [name]: true },
      }));
      setErrorsCreditCard(
        validatePayCard({
          ...creditCard,
          [name]: innerText,
        })
      );
    } else {
      setCreditCard((prevState) => ({
        ...prevState,
        [name]: value,
        touched: {
          ...prevState.touched,
          [name]: true,
        },
      }));
      setErrorsCreditCard(
        validatePayCard({
          ...creditCard,
          [name]: value,
        })
      );
    }
  }

  const hasErrors = Object.values(errorsCreditCard).some(
    (value) => value !== ""
  ); // Verificar si hay algún valor en el objeto errores (algún error en los datos introducidos)
  const hasValues = Object.values(creditCard).some((value) => value === ""); // Verificar si hay algún input vacío

  async function handleSubmit(e) {
    e.preventDefault();
    if (hasValues) {
      alert("Debe completar todos los campos.");
      return;
    } else if (hasErrors) {
      alert("Debe completar los campos correctamente.");
      return;
    } else {
      try {
        const config = {
          headers: { token: `${token}` }, // se envía el token por header
        };
        const data = {
          tests: cart, // se envían los id de los productos agregados al carrito
        };
        await axios.post(`${BACK}/orders`, data, config);
      } catch (error) {
        console.log(error.response.data);
      }
    }

    handleClose();
    setShowAlert(true);
  }

  const showErrors = function (e) {
    const { innerText } = e.target;
    if (innerText === "FINALIZAR COMPRA") {
      for (const key in creditCard) {
        setCreditCard((prevState) => ({
          ...prevState,
          touched: {
            ...prevState.touched,
            [key]: true,
          },
        }));
      }
      setErrorsCreditCard(
        validatePayCard({
          ...creditCard,
        })
      );
    }
  };

  return (
    <div>
      <Offcanvas
        show={show}
        placement={"end"}
        onHide={handleClose}
        backdrop="static"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Método de pago</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Selecciona un método de pago:
          <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Tarjeta de crédito</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre del Titular</Form.Label>
                    <Form.Control
                      name="name"
                      placeholder="Ingrese el nombre del titular"
                      onChange={(e) => handleChange(e)}
                    />
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {creditCard.touched.name ? errorsCreditCard.name : null}
                    </p>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Número de Tarjeta</Form.Label>
                    <Form.Control
                      name="number"
                      placeholder="Ingrese el número de la tarjeta"
                      onChange={(e) => handleChange(e)}
                    />
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {creditCard.touched.number
                        ? errorsCreditCard.number
                        : null}
                    </p>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Mes y Año de Expiración</Form.Label>
                    <div style={{ display: "flex" }}>
                      <DropdownButton
                        variant="light"
                        title={
                          creditCard.month === "" ? "Mes" : creditCard.month
                        }
                        onClick={(e) => {
                          if (e.target.name !== "") {
                            handleChange(e);
                          }
                        }}
                        name="month"
                      >
                        <Dropdown.Item name="month" value="01">
                          01
                        </Dropdown.Item>
                        <Dropdown.Item name="month" value="02">
                          02
                        </Dropdown.Item>
                        <Dropdown.Item name="month" value="03">
                          03
                        </Dropdown.Item>
                        <Dropdown.Item name="month" value="04">
                          04
                        </Dropdown.Item>
                        <Dropdown.Item name="month" value="05">
                          05
                        </Dropdown.Item>
                        <Dropdown.Item name="month" value="06">
                          06
                        </Dropdown.Item>
                        <Dropdown.Item name="month" value="07">
                          07
                        </Dropdown.Item>
                        <Dropdown.Item name="month" value="08">
                          08
                        </Dropdown.Item>
                        <Dropdown.Item name="month" value="09">
                          09
                        </Dropdown.Item>
                        <Dropdown.Item name="month" value="10">
                          10
                        </Dropdown.Item>
                        <Dropdown.Item name="month" value="11">
                          11
                        </Dropdown.Item>
                        <Dropdown.Item name="month" value="12">
                          12
                        </Dropdown.Item>
                      </DropdownButton>

                      <DropdownButton
                        variant="light"
                        title={creditCard.year === "" ? "Año" : creditCard.year}
                        onClick={(e) => {
                          if (e.target.name !== "") {
                            handleChange(e);
                          }
                        }}
                        name="year"
                      >
                        <Dropdown.Item name="year" value="2023">
                          2023
                        </Dropdown.Item>
                        <Dropdown.Item name="year" value="2024">
                          2024
                        </Dropdown.Item>
                        <Dropdown.Item name="year" value="2025">
                          2025
                        </Dropdown.Item>
                        <Dropdown.Item name="year" value="2026">
                          2026
                        </Dropdown.Item>
                        <Dropdown.Item name="year" value="2027">
                          2027
                        </Dropdown.Item>
                        <Dropdown.Item name="year" value="2028">
                          2028
                        </Dropdown.Item>
                        <Dropdown.Item name="year" value="2029">
                          2029
                        </Dropdown.Item>
                        <Dropdown.Item name="year" value="2030">
                          2030
                        </Dropdown.Item>
                        <Dropdown.Item name="year" value="2031">
                          2031
                        </Dropdown.Item>
                        <Dropdown.Item name="year" value="2032">
                          2032
                        </Dropdown.Item>
                        <Dropdown.Item name="year" value="2033">
                          2033
                        </Dropdown.Item>
                        <Dropdown.Item name="year" value="2034">
                          2034
                        </Dropdown.Item>
                        <Dropdown.Item name="year" value="2035">
                          2035
                        </Dropdown.Item>
                        <Dropdown.Item name="year" value="2036">
                          2036
                        </Dropdown.Item>
                        <Dropdown.Item name="year" value="2037">
                          2037
                        </Dropdown.Item>
                        <Dropdown.Item name="year" value="2038">
                          2038
                        </Dropdown.Item>
                        <Dropdown.Item name="year" value="2039">
                          2039
                        </Dropdown.Item>
                        <Dropdown.Item name="year" value="2040">
                          2040
                        </Dropdown.Item>
                        <Dropdown.Item name="year" value="2041">
                          2041
                        </Dropdown.Item>
                        <Dropdown.Item name="year" value="2042">
                          2042
                        </Dropdown.Item>
                        <Dropdown.Item name="year" value="2043">
                          2043
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>

                    <p style={{ color: "red", fontSize: "12px" }}>
                      {creditCard.touched.month || creditCard.touched.year
                        ? errorsCreditCard.month
                        : null}
                    </p>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                      name="cvv"
                      placeholder="Ingrese el código CVV"
                      onChange={(e) => handleChange(e)}
                    />
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {creditCard.touched.cvv ? errorsCreditCard.cvv : null}
                    </p>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control
                      name="dni"
                      placeholder="Ingrese el DNI del titular"
                      onChange={(e) => handleChange(e)}
                    />
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {creditCard.touched.dni ? errorsCreditCard.dni : null}
                    </p>
                  </Form.Group>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingBottom: "5%",
                    }}
                  >
                    <Button
                      onClick={(e) => {
                        showErrors(e);
                        handleSubmit(e);
                      }}
                    >
                      FINALIZAR COMPRA
                    </Button>
                  </div>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>MercadoPago</Accordion.Header>
              <Accordion.Body>
                <Button>CONTINUAR COMPRA MERCADOPAGO</Button>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>CryptoPago</Accordion.Header>
              <Accordion.Body>
                <Button>CONTINUAR COMPRA CRYPTOPAGO</Button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
