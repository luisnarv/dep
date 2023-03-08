import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { addToCart } from '../reducer'
import logo from "../images/logo5.png"

export default function Test({ id, name, description, price }) {
    const dispatch = useDispatch()

    return (
        <Card className="shadow-sm p-3 mb-5 bg-white rounded" style={{ width: 250, height: 320, marginLeft: 10, marginRight: 10}}>
            <Card.Img variant="top" src={logo} style={{width: 220, height: 100}}/>
            <Card.Body>
                <Card.Title className='text-secondary' style={{ height: 70 }}>{name}</Card.Title>
                <Card.Title className='text-secondary d-flex flex-row-reverse' style={{ marginBottom: 10 }}>${price}.00</Card.Title>
                <Button variant="info" as={Link} to={`/detail/${id}`}>Detail</Button>
                <Button variant="primary" onClick={() => dispatch(addToCart(id))} style={{ marginLeft: 10 }}>Add to Cart</Button>
            </Card.Body>
        </Card>
    )
}
