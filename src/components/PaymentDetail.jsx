import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

import React, { useRef } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";

export default function PaymentDetail(props) {
  const { showAlert, setShowAlert, detailData, dateToDetail } = props;

  const tableRef = useRef(null); // Ref para referenciar la tabla en el DOM

  // const getDate = new Date(dateToDetail);
  // const timeZone = "America/Bogota";
  // const dateColombia = utcToZonedTime(getDate, timeZone);
  const fecha = dateToDetail ? new Date(dateToDetail) : null;
  const formattedDate = fecha ? format(fecha, "dd/MM/yyyy HH:mm:ss") : null;
  const date = formattedDate?.slice(0, 10);
  const time = formattedDate?.slice(11, 16);

  const handleClose = () => {
    setShowAlert(false);
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: tableRef.current });
    doc.save("recibo.pdf");
  };

  return (
    <div style={{ position: "absolute" }}>
      <Modal
        show={showAlert}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Resúmen de orden</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover ref={tableRef}>
            <thead>
              <tr>
                <td style={{ width: "20%" }}>Fecha de pago:</td>
                <td style={{ width: "50%" }}>
                  {date} {time}
                </td>
                <td style={{ width: "30%" }}></td>
              </tr>
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {detailData?.map((e, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{e.name}</td>
                    <td>${e.price}.00</td>
                  </tr>
                );
              })}
              <tr>
                <td> </td>
                <td>TOTAL</td>
                <td>
                  $
                  {detailData
                    ?.map((e) => e.price || 0)
                    .reduce((a, b) => a + b, 0)}
                  .00
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDownload}>
            Descargar Recibo
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
