import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/eventospre.css";

function EventosPre(props) {
    return (
        <>
            <div className="miniatura-shows">
                <div className="cada-uno">
                    <Link to="each-one">
                        <button className="img-button" onClick={props.onClick}>
                            <img src={require(`../images/${props.image}.jpg`)} className="img-miniatura" alt="Miniatura del evento" />
                        </button>
                    </Link>
                    <p>{props.tickets} ticket/s</p>
                    <p>{props.modi}</p>
                </div>
            </div>
        </>
    )
}

export default EventosPre;

