import React from "react";
import "../stylesheets/eventospas.css";
import {BsFillTicketPerforatedFill} from "react-icons/bs";
import {BsTicketPerforated} from "react-icons/bs";
import { Link } from "react-router-dom";




function EventosPas() {
    return (
        <>
            <div className="sin-eventos">
                <div className="cir-icon">
                <div className="circle">
                </div>
                    <BsFillTicketPerforatedFill className="icono-sin-eventos-nube"/>
                    <BsTicketPerforated className="icono-sin-eventos"/>
                </div>
                <div className="cir-info">
                        <p>Al parecer no tienes ningun evento.</p>
                        <p>
                        ¿Quieres ver los disponibles?{" "}
                        <Link to="/home">Aquí</Link>
                        </p>
                </div>
            </div>
        </>
    );    
}

export default EventosPas;