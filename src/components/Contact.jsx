import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import React, { useState } from "react";

export default function Contact() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <div
      style={{
        width: "90%",
        margin: "auto",
        marginTop: "2%",
        marginBottom: "2%",
      }}
    >
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Nombre(s)</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Ingrese su(s) nombre(s)"
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Apellido(s)</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Ingrese su(s) apellido(s)"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Nombre de usuario</Form.Label>
            <InputGroup hasValidation>
              .
              <Form.Control
                type="text"
                placeholder="Ingrese su nombre de usuario"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor indique un nombre de usuario
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustomEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese un correo electrónico"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor indique un correo electrónico válido
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="6" controlId="validationCustomText">
            <Form.Label>FAQ</Form.Label>
            <Form.Control as="textarea" placeholder="Ingrese su FAQ" required />
            <Form.Control.Feedback type="invalid">
              Por favor indique su FAQ.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Aceptar términos y condiciones"
            feedback="Debe aceptar los términos antes de enviar su FAQ."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit">Enviar</Button>
      </Form>
    </div>
  );
}
