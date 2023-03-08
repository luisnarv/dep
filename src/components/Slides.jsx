import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import slide1 from "../images/slide1.png"
import slide2 from "../images/slide2.png"
import slide3 from "../images/slide3.png"
  
  export default function Slides() {
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ height: '600px'}}
            src={slide1}
            alt="First slide"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide2}
            style={{ height: '600px'}}
            alt="Second slide"
          />
  
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide3}
            style={{ height: '600px'}}
            alt="Third slide"
          />
  
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
  
