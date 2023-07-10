import React, { useState } from "react";
import EventosPas from "../components/eventospas";
import EventosPre from "../components/eventospro";
import "../stylesheets/miseventos.css";
import Navbar2 from "../components/navbar2";

function MisEventos() {
    const [seleccionado, setSeleccionado] = useState("proximos");
    const [mostrarPasados, setMostrarPasados] = useState(false);

    const handleSeleccionado = (opcion) => {
        setSeleccionado(opcion);
        if (opcion === "pasados") {
        setMostrarPasados(true);
        } else {
        setMostrarPasados(false);
        }
    };

    return (
        <>
        <Navbar2/>
        <div className="mis-eventos-cont-total">
            <p className="titulo-eventos">Mis eventos</p>
            <div className="pasopre">
            <button
                className={seleccionado === "proximos" ? "seleccionado" : ""}
                onClick={() => handleSeleccionado("proximos")}
            >
                Próximos
            </button>
            <button
                className={seleccionado === "pasados" ? "seleccionado" : ""}
                onClick={() => handleSeleccionado("pasados")}
            >
                Pasados
            </button>
            </div>
            <div className="eventos-container">
            {seleccionado === "proximos" && (
                <>
                <EventosPre image="JuanLuisGuerra" tickets="1" modi="" />
                <EventosPre
                    image="JuanLuisGuerra"
                    tickets="1"
                    modi="*Se han realizado cambios a este evento"
                />
                <EventosPre image="JuanLuisGuerra" tickets="5" modi="" />
                <EventosPre image="JuanLuisGuerra" tickets="2" modi="" />
                <EventosPre image="JuanLuisGuerra" tickets="6" modi="" />
                <EventosPre image="JuanLuisGuerra" tickets="1" modi="" />
                <EventosPre image="JuanLuisGuerra" tickets="1" modi="" />
                <EventosPre image="JuanLuisGuerra" tickets="1" modi="" />
                </>
            )}
            {seleccionado === "pasados" && mostrarPasados && <EventosPas />}
            </div>
        </div>
        </>
    );
}

export default MisEventos;