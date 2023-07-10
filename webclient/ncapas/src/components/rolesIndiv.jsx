import React, { useState } from "react";
import "../stylesheets/roles.css";

function Indvroles(props) {
    const [selectedOption, setSelectedOption] = useState("Administrador");
    const [toggleOn, setToggleOn] = useState(true);


    const handleRoleChange = (event) => {
        console.log(event);
        setSelectedOption(event.target.value);
    };

    const handleToggle = () => {
        setToggleOn(!toggleOn);
    };

    return (
        <>
            <div className="usuarios-div-rol">
                <div
                    className={`toggle-button ${toggleOn ? "active" : ""}`}
                    onClick={handleToggle}
                >
                    <span className="toggle-slider"></span>
                </div>
                <div className="usuario-rol">
                    <p>{props.nombre}</p>
                    <p>{props.correo}</p>
                </div>
                <div className="evento-rol">
                    <ul className="ul-roles">
                        <li className="li-rol">
                            <label className="rol-label">
                                <input
                                    type="checkbox"
                                    className="rol-checkbox"
                                />
                                <span className="rol-name">Administrador</span>
                            </label>
                        </li>
                        <li className="li-rol">
                            <label className="rol-label">
                                <input
                                    type="checkbox"
                                    className="rol-checkbox"
                                />
                                <span className="rol-name">Empleado</span>
                            </label>
                        </li>
                        <li className="li-rol">
                            <label className="rol-label">
                                <input
                                    type="checkbox"
                                    className="rol-checkbox"
                                />
                                <span className="rol-name">Cliente</span>
                            </label>
                        </li>
                        <li className="li-rol">
                            <label className="rol-label">
                                <input
                                    type="checkbox"
                                    className="rol-checkbox"
                                />
                                <span className="rol-name">Moderador</span>
                            </label>
                        </li>
                    </ul>

                </div>
            </div>
        </>
    );
}

export default Indvroles;
