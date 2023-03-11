import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Twitter, Telephone, EnvelopeAt} from 'react-bootstrap-icons';
import logo from "../images/logo3.png"

export default function Footer() {
    return (
        <div>
      <div style={{background: "aliceblue"}}>
        <footer className="text-primary py-4">
            <div className="container">
                <nav className="row">
                    <ul className="col-12 col-md-3 list-unstyled">
                        
                            <Link to="/" className="col-12 col-md-3 d-flex aling-items-center justyfy-content-center">
                                <img src={logo} className="mx-2 pb-4" style={{ height: '70px'}} alt=""/>
                            </Link>
                        
                        <li>
                            <Telephone/>
                               123 456 789
                        </li>
                        <li>
                            <EnvelopeAt/>
                               medilab@gmail.com
                        </li>
                    </ul>
                    <ul className="col-12 col-md-3 list-unstyled">
                        <li className="pb-2"> <strong>Nosotros</strong></li>
                        
                        <li>
                            <Link to='/about' className="text-reset">Sobre Medilab</Link>
                        </li>
                        <li>
                            <Link to='/faq' className="text-reset">Preguntas Frecuentes</Link>
                        </li>
                        <li>
                            <Link to='/about' className="text-reset">Politica de privacidad</Link>
                        </li>     
                    </ul>
                    <ul className="col-12 col-md-3 list-unstyled">
                        <li className="pb-2"><strong>Nuestros Servicios</strong></li>
                        <li>
                            <Link to='/quoter' className="text-reset">Analisis Clinicos</Link>
                        </li>
                        <li>
                            <Link to='/results' className="text-reset">Resultados</Link>
                        </li>  
                        <li>
                            <Link to='/covid' className="text-reset">Pruebas Covid</Link>
                        </li>    
                    </ul>
                    <ul className="col-12 col-md-3 list-unstyled">
                    <li className="pb-2"><strong>Siguenos</strong></li>
                        <li> 
                            <Facebook></Facebook>
                        </li>
                        <li>
                            <Instagram></Instagram>
                        </li>  
                        <li>
                            <Youtube></Youtube>
                        </li>  
                        <li>
                            <Twitter></Twitter>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
      </div>
      </div>
    )
  }