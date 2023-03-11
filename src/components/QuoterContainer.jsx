import Row from "react-bootstrap/esm/Row"
import { Link } from "react-router-dom";
import Badge from 'react-bootstrap/esm/Badge'
import test from "../images/test.png"
import result from "../images/results.png"
import Button from "react-bootstrap/esm/Button";

export default function QuoterContainer() {


  return (
    <div className="container pt-4 mb-4" style={{ width: '100vw', maxWidth: '100%', textAlign: 'center' }}>
        <Badge bg='white' className="row shadow-lg" style={{width: "1100px", height: "250px"}}>
            <div className=" text-info row justify-content-center">
                <div className="col-4 p-4">
                    <h3 className="pt-4">Bienvenido</h3>
                    <h5>¿Qué te gustaría hacer hoy?</h5>    
                </div>
                <div className="col-4 pt-4">
                    
                    <Button 
                            style={{ height: '160px'}}
                            className="p-4 fs-4"
                            variant="outline-secondary" 
                            as={Link} 
                            to={`/quoter`}>
                        <img src={test} className="mx-2 p-2" style={{ height: '90px'}} alt=""/>Cotizar analisis
                           
                    </Button>
                  
                </div>
                <div className="col-4 pt-4">
                    <Button 
                            style={{ height: '160px'}}
                            className="p-4 fs-4"
                            variant="outline-secondary" 
                            as={Link} 
                            to={`/results`}>
                        <img src={result} className="mx-2 p-2" style={{ height: '90px'}} alt=""/>
                            Ver resultados
                    </Button>
                </div>
            </div>     
        </Badge>
    </div>
)
}
