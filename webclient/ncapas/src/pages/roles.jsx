import React from "react";
import "../stylesheets/roles.css";
import Indvroles from "../components/rolesIndiv";
import Navbar2 from "../components/navbar2";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserContext } from '../UserContext.js';
import { useContext } from 'react';


function Roles() {
    const { user } = useContext(UserContext);
    const [usuarios, setUsuarios] = useState([]);

    const { URL } = useContext(UserContext);

    useEffect(() => {

        axios.get(URL + '/user/all')
            .then(response => {
                setUsuarios(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error al obtener la lista de usuarios:', error);
            });
    }, []);


    return (
        
        <>
            <Navbar2 />
            <div className="rol-encabezado-total">
                <div className="rol-encabezado">
                    <h3>Administrar <span>rol</span> para cada usuario</h3>
                    <h5>Selecciona los roles para cada usuario</h5>
                </div>
                <div className="cont-rol-completo">
                    <div className="roldiv">
                        <div className="titulos-div-rol">
                            <p>on/off</p>
                            <p>Usuario</p>
                            <p>Rol</p>
                        </div>
                        <div className="indiv-roles-pr">
                            {usuarios.map((usuarios, index) => (
                                <Indvroles
                                    key={index}
                                    nombre={usuarios.usuario} 
                                    correo={usuarios.email} 
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Roles;