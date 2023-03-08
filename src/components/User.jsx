import React,  { useState } from 'react';
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';




export default function User() {
  const orders = useSelector((state) => state.orders);
  const [show, setShow] = useState(false);
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <div>
      <h1>welcome </h1>
 
    <>
      {values.map((v, idx) => (
        <Button key={idx} className="me-2 mb-2" onClick={() => handleShow(v)}>
          Ver ordenes
          {typeof v === 'string' && `below ${v.split('-')[0]}`}
        </Button>
      ))}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Mis ordenes</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          
        <Row md={"8"} className="g-4">
        {orders.map((order,key) => (
        <div key={key}>
          
        
    <>
    
    
        <Card  style={{ width: 250, height: 250, marginRight:"10px" }}>
        <Card.Body>
            <Card.Title style={{ height: 50 }}>{order.test}</Card.Title>
                <Card.Text style={{ height: 70 }}>
             <p>Id: {order.id}</p> 
              <p>Numero de orden: {order.payment}</p>
              <p>Descripción: {order.test}</p>
                </Card.Text>
        </Card.Body> 
       </Card>
         </>
           </div>  

  
        ))}

      </Row>
      </Modal.Body>
      </Modal>
    </>

    


    {/* <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Mis ordenes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row md={"8"} className="g-4">
        {orders.map((order) => (
          <Col key={order.id}>
            <div>
              <p>Id: {order.id}</p>
              <p>Numero de orden: {order.payment}</p>
              <p>Descripción: {order.test}</p>
            </div>
          </Col>
        ))}
      </Row></Modal.Body>
      </Modal> */}



   

      {/* <Row md={""} className="g-4">
        {orders.map((order) => (
          <Col key={order.id}>
            <div>
              <p>Id: {order.id}</p>
              <p>Name: {order.payment}</p>
              <p>Description: {order.test}</p>
            </div>
          </Col>
        ))}
      </Row> */}
    </div>
  );
}
