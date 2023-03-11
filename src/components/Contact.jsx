import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import React, { useState } from "react";
import { validateContact } from "../utils/validate";

export default function Contact() {
  const [term, setTerm] = useState(false);
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    faq: "",
    term: false,
    touched: {
      firstName: false,
      lastName: false,
      username: false,
      email: false,
      faq: false,
      term: false,
    },
  });

  const [errorsContact, setErrorsContact] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    faq: "",
    term: false,
  });

  function handleChange(e) {
    let { name, value } = e.target;
    if (name === "term") {
      value = term;
    }

    setContact((prevState) => ({
      ...prevState,
      [name]: value,
      touched: { ...prevState.touched, [name]: true },
    }));

    setErrorsContact(
      validateContact({
        ...contact,
        [name]: value,
      })
    );
  }

  const hasValues = Object.values(contact).some((value) => value === ""); // Verificar si hay algún input vacío
  const hasErrors = Object.values(errorsContact).some((value) => value !== ""); // Verificar si hay algún valor en el objeto errores (algún error en los datos introducidos)

  function showErrors() {
    for (const key in contact) {
      setContact((prevState) => ({
        ...prevState,
        touched: {
          ...prevState.touched,
          [key]: true,
        },
      }));
    }
    setErrorsContact(
      validateContact({
        ...contact,
      })
    );
  }

  function handleSubmit(e) {
    if (hasValues) {
      e.preventDefault();
      alert("Debe completar todos los espacios.");
      showErrors();
    } else if (hasErrors) {
      e.preventDefault();
      alert("De completar los campos correctamente.");
      showErrors();
    } else {
      alert("Enviado");
    }
  }

  return (
    <div
      style={{
        width: "90%",
        margin: "auto",
        marginTop: "2%",
        marginBottom: "2%",
      }}
    >
      <h2>Contáctanos</h2>
      <p>
        ¿Tienes alguna duda o necesitas ayuda con nuestros productos y
        servicios? Nos encantaría escuchar de ti. Puedes comunicarte con
        nosotros por correo electrónico a{" "}
        <a href="mailto:medilab@gmail.com">medilab@gmail.com</a> o por teléfono
        al 123 456 789. Si prefieres que nos comuniquemos contigo, simplemente
        completa el siguiente formulario y nos pondremos en contacto lo antes
        posible.
      </p>
      <Form noValidate onSubmit={(e) => handleSubmit(e)}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>Nombre(s)</Form.Label>
            <Form.Control
              required
              type="text"
              name="firstName"
              placeholder="Ingrese su(s) nombre(s)"
              onChange={(e) => handleChange(e)}
            />
            <p style={{ color: "red", fontSize: "12px" }}>
              {contact.touched.firstName ? errorsContact.firstName : null}
            </p>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label>Apellido(s)</Form.Label>
            <Form.Control
              required
              type="text"
              name="lastName"
              placeholder="Ingrese su(s) apellido(s)"
              onChange={(e) => handleChange(e)}
            />
            <p style={{ color: "red", fontSize: "12px" }}>
              {contact.touched.lastName ? errorsContact.lastName : null}
            </p>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Group>
              <Form.Control
                type="text"
                name="username"
                placeholder="Ingrese su nombre de usuario"
                onChange={(e) => handleChange(e)}
              />
              <p style={{ color: "red", fontSize: "12px" }}>
                {contact.touched.username ? errorsContact.username : null}
              </p>
            </Form.Group>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Ingrese un correo electrónico"
              onChange={(e) => handleChange(e)}
            />
            <p style={{ color: "red", fontSize: "12px" }}>
              {contact.touched.email ? errorsContact.email : null}
            </p>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="6">
            <Form.Label>FAQ</Form.Label>
            <Form.Control
              as="textarea"
              name="faq"
              placeholder="Ingrese su FAQ"
              onChange={(e) => handleChange(e)}
            />
            <p style={{ color: "red", fontSize: "12px" }}>
              {contact.touched.faq ? errorsContact.faq : null}
            </p>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            name="term"
            onChange={(e) => handleChange(e)}
            label="Aceptar términos y condiciones"
            onClick={() => setTerm(!term)}
          />
          <p style={{ color: "red", fontSize: "12px" }}>
            {contact.touched.term ? errorsContact.term : null}
          </p>
        </Form.Group>
        <Button type="submit">Enviar</Button>
      </Form>
    </div>
  );
}
