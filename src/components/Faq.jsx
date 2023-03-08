import Accordion from "react-bootstrap/Accordion";

import React from "react";

export default function Faq() {
  return (
    <div
      style={{
        width: "90%",
        margin: "auto",
        marginTop: "2%",
        marginBottom: "2%",
      }}
    >
      <h2>Preguntas Frecuentes:</h2>
      <div style={{ marginTop: "2%", marginBottom: "2%" }}>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              ¿Cómo puedo comprar exámenes en su sitio web?
            </Accordion.Header>
            <Accordion.Body>
              R: Para comprar exámenes en nuestro sitio web, simplemente
              seleccione el examen que desea realizar y agregue al carrito de
              compras. Luego, siga los pasos para completar la compra y se le
              asignará una cita para realizar el examen.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              ¿Cuánto tiempo tardan en procesar los resultados de los exámenes?
            </Accordion.Header>
            <Accordion.Body>
              R: El tiempo de procesamiento de los resultados puede variar
              dependiendo del tipo de examen que haya realizado. En general, los
              resultados de los exámenes de laboratorio estarán disponibles en
              un plazo de 24 a 72 horas.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              ¿Cómo puedo acceder a mis resultados de exámenes en línea?
            </Accordion.Header>
            <Accordion.Body>
              R: Para acceder a sus resultados de exámenes en línea, simplemente
              inicie sesión en su cuenta en nuestro sitio web y seleccione la
              opción para ver sus resultados. Allí encontrará los resultados de
              todos los exámenes que haya realizado con nosotros.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              ¿Cómo puedo cancelar o cambiar una cita para un examen?
            </Accordion.Header>
            <Accordion.Body>
              R: Si necesita cancelar o cambiar una cita para un examen, por
              favor comuníquese con nosotros con al menos 24 horas de
              anticipación para que podamos reprogramar su cita o realizar el
              reembolso correspondiente.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              ¿Cómo puedo saber si necesito hacer algún examen en particular?
            </Accordion.Header>
            <Accordion.Body>
              R: Si no está seguro de qué exámenes debe realizarse, le
              recomendamos que consulte a su médico de cabecera o especialista
              de confianza para obtener asesoramiento. Además, nuestro sitio web
              también ofrece información detallada sobre los exámenes que
              ofrecemos, sus indicaciones y el procedimiento para realizarlos.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}
