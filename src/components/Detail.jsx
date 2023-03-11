import React, { useEffect, useState } from "react";
import logo from "../images/logo4.png";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/esm/Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../reducer";

const BACK = process.env.REACT_APP_BACK;

export default function Detail(props) {
  const { id, showDetails, setShowDetails } = props;
  //   const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [test, setTest] = useState(id);

  useEffect(() => {
    fetch(`${BACK}/tests/${id}`)
      .then((response) => response.json())
      .then((data) => setTest(data));
  }, [id]);

  return (
    <div>
      {showDetails === true ? (
        <Modal
          show={showDetails}
          onHide={() => setShowDetails(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Detalles de Test
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                width: "100%",
              }}
            >
              <Badge bg="white" style={{ width: "100%" }}>
                <h1 className="text-primary">{test.name}</h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "30%",
                    }}
                  >
                    <img
                      src={logo}
                      className="mx-2 p-4"
                      style={{ height: "230px" }}
                      alt=""
                    />
                  </div>

                  <div
                    class="col-4"
                    style={{
                      width: "70%",
                    }}
                  >
                    <ul className="pt-4 text-info list-unstyled">
                      <li className="fs-4 pt-4">
                        {test.description}
                      </li>
                      <li className="fs-4 pt-2">Precio ${test.price}.00 </li>
                      <li className="fs-4 pt-2">
                        Tiempo estimado: {test.time}
                      </li>
                      <li className="fs-4 pt-2">
                        Tipo de muestra: {test.sample}
                      </li>
                      <li className="fs-4 pt-2">Categoria: {test.category}</li>
                    </ul>
                    <div class="col-4 pt-4" style={{ margin: "auto" }}>
                      <Button
                        style={{ height: "50px", width: "150px" }}
                        variant="secondary"
                        onClick={() => dispatch(addToCart(id))}
                      >
                        Agregar al carrito
                      </Button>
                    </div>
                  </div>
                </div>
              </Badge>
              <div className="pt-4"></div>
            </div>
          </Modal.Body>
        </Modal>
      ) : null}
    </div>
  );
}
