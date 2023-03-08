import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PaymentDetail from "./PaymentDetail";

export default function Payments() {
  const tests = useSelector((state) => state.tests);
  const [payments, setPayments] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const data = [
    {
      id: "1",
      PatientId: 797,
      TestId: [419, 1, 2],
      PaymentId: 1,
      createdAt: "2023-03-04T22:27:53.318Z",
      updatedAt: "2023-03-04T22:27:53.318Z",
    },
    {
      id: "2",
      PatientId: 797,
      TestId: [119, 1, 23],
      PaymentId: 2,
      createdAt: "2023-03-04T22:27:53.318Z",
      updatedAt: "2023-03-04T22:27:53.318Z",
    },
    {
      id: "3",
      PatientId: 797,
      TestId: [149, 12, 2],
      PaymentId: 3,
      createdAt: "2023-03-04T22:27:53.318Z",
      updatedAt: "2023-03-04T22:27:53.318Z",
    },
  ];

  useEffect(() => {
    setPayments(data);
  }, []);

  function getTestNamesById(ids) {
    const testNames = [];
    ids.forEach((id) => {
      const test = tests.find((test) => test.id === id);
      if (test) {
        testNames.push(test.name);
      }
    });
    return testNames;
  }

  function handleDetailData(e) {
    const { id } = e.target;
    const dataPayments = payments.find((p) => p.id === id);
    const dataTests = tests.filter((e) => payments.TestId?.includes(e.id));

    console.log(dataPayments);
    console.log(dataTests);
    setShowAlert(true);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "80%",
        margin: "auto",
        position: "relative",
      }}
    >
      <h2>Pagos</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Id de Pago</th>
            <th style={{ width: "65%" }}>Contenido</th>
            <th style={{ width: "15%" }}>Fecha de Pago</th>
            <th style={{ width: "10%" }}>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan={4}>No se ha realizado ningún pago.</td>
            </tr>
          ) : (
            payments.map((e, key) => {
              return (
                <tr key={key}>
                  <td>{e.PaymentId}</td>
                  <td>{getTestNamesById(e.TestId).join(", ")}</td>
                  <td>{e.createdAt.slice(0, 10)}</td>
                  <td>
                    <Button
                      id={e.PaymentId}
                      onClick={(e) => handleDetailData(e)}
                    >
                      Detalles
                    </Button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
      <PaymentDetail
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        detailData={detailData}
      />
    </div>
  );
}
