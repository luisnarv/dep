import React from "react";
import { useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { addToCart } from "../reducer";
import logo from "../images/logo5.png";

export default function Test({
  id,
  name,
  description,
  price,
  setDetailId,
  setShowDetails,
}) {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        width: "300px",
        height: "320px",
        marginTop: "1%",
        marginBottom: "5%",
      }}
    >
      <Card
        className="shadow-sm p-3 mb-5 bg-white"
        style={{
          width: "95%",
          height: "100%",
          margin: "auto",
        }}
      >
        <Card.Img
          variant="top"
          src={logo}
          style={{ width: "100%", height: "80px" }}
        />
        <Card.Body>
          <Card.Title
            className="text-info"
            style={{
              marginTop: "-10px",
              fontSize: "18px",
              textAlign: "center",
              height: "50px",
            }}
          >
            {name}
          </Card.Title>
          <Card.Title
            className="text-info"
            style={{
              fontSize: "16px",
              textAlign: "center",
              height: "40px",
            }}
          >
            {description}
          </Card.Title>
          <hr style={{ marginBottom: "4%" }} />
          <Card.Title className="text-primary d-flex flex-row-reverse">
            ${price}.00
          </Card.Title>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "2%",
            }}
          >
            <Button
              id={id}
              variant="outline-primary"
              onClick={() => {
                setDetailId(id);
                setShowDetails(true);
              }}

              //   as={Link}
              //   to={`/detail/${id}`}
            >
              Detalles
            </Button>
            <Button variant="success" onClick={() => dispatch(addToCart(id))}>
              Agregar
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
