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
          <Row className="p-4"/>
          <QuoterContainer/>
          <Row className="p-4"/>
          <div className='bg-light transition-fade'>
            <Row>
            <h3 className='d-flex justify-content-center pt-2 text-info'>Mas Vendidos</h3>
            </Row>
            <CarouselCards/>
          </div>
          <Row className="p-4"/>
        </div>
    )
}