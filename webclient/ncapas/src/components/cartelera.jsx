import React from "react";
import { Link } from "react-router-dom";
import {AiOutlineArrowRight} from 'react-icons/ai';
import {BiCalendar} from 'react-icons/bi';
import {GoLocation} from 'react-icons/go';
import '../stylesheets/cartelera.css';

function Cartelera(props) {

    const handleInfoClick = () => {
        localStorage.setItem('artista', props.artista);
    };

    return (
            <div className="contenedor-show">
                <img src={(props.image)} className="img-show-cartelera" alt="Evento"/>
                <div className="texto-superpuesto">
                    <div className="contenedor-texto">
                        <h1 className="artista">{props.artista}</h1>
                        <p className="fecha">
                            <BiCalendar /> {props.fecha}
                        </p>
                        <p className="ubicacion">
                            <GoLocation /> {props.ubi}
                        </p>
                            <Link to={"/info-page"}>
                                <button className="btn-info" onClick={handleInfoClick}>
                                    Ver detalles<AiOutlineArrowRight/>
                                </button>
                            </Link>
                    </div>
                </div>
            </div>
    );
}
export default Cartelera;