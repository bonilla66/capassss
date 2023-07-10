import React from "react";
import "../stylesheets/editare.css";
import EditE from "../components/eventoeditar";

function Eventoeditar(){
    return(
        <>
        <EditE 
        image="JuanLuisGuerra"
        artista="Juan Luis Guerra"
        fecha="12/02/29"
        hora="20:00"
        duracion="1:30 hrs"/>
        </>
    );
}

export default Eventoeditar;