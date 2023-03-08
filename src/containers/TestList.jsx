import React from 'react'
import { useSelector } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Test from '../components/Test'



export default function TestList() {
    const tests = useSelector(state => state.tests)

    return (
        <div>
            <Row md={3} className="g-4">
                {tests.map(test =>
                    <Test
                        key={test.id}
                        id={test.id}
                        name={test.name}
                        description={test.description}
                        price={test.price}
                    />
                )}
            </Row>
        </div>
    )
}