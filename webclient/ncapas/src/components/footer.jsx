import React from "react";
import "../stylesheets/piedepagina.css";
import { BsInstagram, BsFacebook, BsTwitter  } from 'react-icons/bs';



function Footer() {
    return (
        <div className="pie">
            <div className="primer-div">
                <img src={require("../images/logoGrande.png")} className="logo" />
                <p className="texto-logo">mungTickets</p>
            </div>
            <div className="segundo-div">
                <p className="titulo-footer">
                    Contáctanos
                </p>
                <p className="correo">
                    smungTickets@gmail.com
                </p>
            </div>
            <div className="tercer-div">
                <p className="titulo-footer">
                    Descarga
                </p>
                <p className="texto-tercer">
                    Android
                </p>
            </div>
            <div className="cuarto-div">
                <p className="titulo-footer">
                    Síguenos en redes sociales
                </p>
                <div className="iconos">
                    <button className="boton"><BsInstagram /></button>
                    <button className="boton"><BsFacebook /></button>
                    <button className="boton"><BsTwitter /></button>
                </div>
            </div>
        </div>
    )

}

export default Footer;