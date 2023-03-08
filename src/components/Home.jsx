import React from 'react'
import Row from "react-bootstrap/Row";
import QuoterContainer from './QuoterContainer'
import Slides from './Slides'
import CarouselCards from './CarouselCards'


export default function Home() {
    
    return (
        <div>  
          <div>
            <Slides/>
          </div>
            <hr/>
            <QuoterContainer/>
            <hr/>
            <div style={{background: "aliceblue"}}>
            <Row>
            <h3 className='d-flex justify-content-center'style={{padding: 10, color: "navy"}}>Mas Vendidos</h3>
            <p className='d-flex justify-content-center'style={{color: "navy"}}>Los favoritos de nuestros clientes.</p>
            </Row>
                <CarouselCards/>
            </div>
            <Row className="pt-4"/>
        </div>
    )
}