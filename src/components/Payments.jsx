import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PaymentDetail from "./PaymentDetail";

const BACK = process.env.REACT_APP_BACK;

export default function Payments() {
  const tests = useSelector((state) => state.tests);
  const [payments, setPayments] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [dateToDetail, setDateToDetail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const token = useSelector((state) => state.sessionId?.token);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const config = {
          headers: { token: `${token}` }, // se envía el token por header
        };
        const response = await axios.get(`${BACK}/payments/patient`, config);
        setPayments(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPayments();
  }, [token]);

  function getTestNamesById(orders) {
    const testNames = [];
    orders.forEach((e) => {
      const test = tests.find((test) => {
        return test.id === e.TestId;
      });
      if (test) {
        testNames.push(test.name);
      }
    });

    return testNames;
  }

  function handleDetailData(e) {
    const { id } = e.target;
    const dataPayments = payments.find((p) => p.id === parseInt(id));
    const dataTests = [];
    dataPayments?.Orders.forEach((e) => {
      const test = tests.find((test) => {
        return test.id === e.TestId;
      });
      if (test) {
        dataTests.push(test);
      }
    });

    setDetailData(dataTests);
    setDateToDetail(dataPayments.createdAt);
    setShowAlert(true);
  }

  return (
    <div
      style={{
        margin: "auto",
        marginTop: "2%",
        marginBottom: "2%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "90%",
      }}
    >
      <h2>Pagos</h2>
      <Table striped bordered hover size="sm" style={{ marginTop: "2%" }}>
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
                  <td style={{ display: "flex", justifyContent: "center" }}>
                    {e.id}
                  </td>
                  <td>{getTestNamesById(e.Orders).join(", ")}</td>
                  <td>{e.createdAt.slice(0, 10)}</td>
                  <td style={{ display: "flex", justifyContent: "center" }}>
                    <Button id={e.id} onClick={(e) => handleDetailData(e)}>
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
        dateToDetail={dateToDetail}
      />
    </div>
  );
}
