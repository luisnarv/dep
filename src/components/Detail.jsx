import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import logo from "../images/logo4.png"
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router-dom'
import { ArrowReturnLeft} from 'react-bootstrap-icons'
import Badge from 'react-bootstrap/esm/Badge'
import { useNavigate } from "react-router-dom";

const BACK = "http://localhost:3001"

export default function Detail() {
    const { id } = useParams()
    const navigate = useNavigate();
    const [test, setTest] = useState(id)

    useEffect(() => {
        fetch(`${BACK}/tests/${id}`)
            .then(response => response.json())
            .then(data => setTest(data))
    }, [id])

    return (
        
        <div className='container pt-4 mb-4 ' style={{ height: '400px', width: "900px"}}>
            <div className='pt-4'></div>
                
                <Badge bg='white' className="row rounded-pill" style={{width: "900px"}}>
                    <h1 className='text-primary'>{test.name}</h1>
                    <div class="row justify-content-center">
                    <div class="col-4">
                    <ul className="list-unstyled text-info-emphasis">
                    <li className='text-info'><strong>Test #{id}</strong></li>
                    <li className="col-md-3 d-flex aling-items-center justyfy-content-center">
                            <img src={logo} className="mx-2 p-4" style={{ height: '230px'}} alt=""/>
                        </li>   
                    </ul>  
                    </div>
                    <div class="col-4">
                    <ul className="pt-4 text-info list-unstyled" >
                        <li className='fs-4 pt-4'>{test.description}</li>
                        <li className='fs-4 pt-2'>Precio  ${test.price}.00 </li>  
                        <li className='fs-4 pt-2'>Tiempo estimado: {test.time}</li>   
                        <li className='fs-4 pt-2'>Tipo de muestra: {test.sample}</li> 
                        <li className='fs-4 pt-2'>Categoria: {test.category}</li> 
                    </ul>  
                    </div>
                    <div class="col-4 pt-4">
                    
                        <Button 
                            style={{ height: '50px', width: "150px"}} 
                            variant="outline-info" 
                            as={Link} 
                            to={-1}>
                            <ArrowReturnLeft></ArrowReturnLeft> Atrás
                        </Button> 
                    </div>
                    </div>
                </Badge>
            <div className='pt-4'></div>
        </div>
    )
}
