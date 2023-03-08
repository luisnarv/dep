import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import React from "react";

export default function About() {
  const creators = [
    { name: "Sergio Edgardo Del Pino" },
    { name: "Jose Edwin Elias Incio" },
    { name: "Nazareno Javier Carlesso Bruno" },
    { name: "Ivan Alfredo Quiroz Quiroz" },
    { name: "Jessica Elizabeth Ruiz Velazco" },
    { name: "Luis Kendor Vidal" },
    { name: "Juan Pablo Guzman Moreno" },
    { name: "Carlos Fabián Melgarejo Agudelo" },
  ];
  return (
    <div
      style={{
        width: "95%",
        margin: "auto",
        marginTop: "2%",
        marginBottom: "2%",
      }}
    >
      <h3>Acerca de nosotros:</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        {creators.map((e) => {
          return (
            <Card
              style={{
                width: "20rem",
                margin: "auto",
                marginTop: "2%",
                marginBottom: "2%",
              }}
            >
              <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: "19px",
                  }}
                >
                  {e.name}
                </Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <Button variant="ligth">LinkedIn</Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button variant="ligth">GitHub</Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button variant="ligth">E-Mail</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
