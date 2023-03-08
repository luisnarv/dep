import React from 'react';
import Stack from 'react-bootstrap/Stack'
import { useSelector } from 'react-redux'
import Test from '../components/Test'



export default  function CarouselCards (){
  const cov1 = useSelector(state => state.tests.find((test)=> test.id === 613))
  const cov2 = useSelector(state => state.tests.find((test)=> test.id === 619))
  const cov3 = useSelector(state => state.tests.find((test)=> test.id === 638))
  const cov4 = useSelector(state => state.tests.find((test)=> test.id === 647))
  

    return (
      
        <Stack
          direction="horizontal"
          className="pt-4 h-100 justify-content-center align-items-center"
          gap={3}>
            {cov1 ? <Test
              key={cov1.id}
              id={cov1.id}
              name={cov1.name}
              price={cov1.price}
          /> : null}
          {cov2 ? <Test
              key={cov2.id}
              id={cov2.id}
              name={cov2.name}
              price={cov2.price}
          /> : null}
          {cov3 ? <Test
              key={cov3.id}
              id={cov3.id}
              name={cov3.name}
              price={cov3.price}
          /> : null}
          {cov4 ? <Test
              key={cov4.id}
              id={cov4.id}
              name={cov4.name}
              price={cov4.price}
          /> : null}
          </Stack>
    );
  }