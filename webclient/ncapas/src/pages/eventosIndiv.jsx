import React, { useState, useContext, useEffect } from "react";
import CadaEvento from "../components/cadaevento";
import "../stylesheets/eventosindiv.css";
import IndivTitulo from "../components/indivTitutlo";
import Navbar2 from "../components/navbar2";
import { UserContext } from '../UserContext.js';
import axios from 'axios';


function EventosIndiv() {
    const { user } = useContext(UserContext);
    const [data, setData] = useState([])

    const { URL } = useContext(UserContext);

    useEffect(() => {
        console.log(user.email)

        axios.get(URL + '/ticket/user',{
            params: {
                email: user.email
            }
        }).then(response => {
            setData(response.data);
            console.log(response.data)
        }).catch(error => {
            console.error('Error al obtener la lista de eventos:', error);
        });
    }, []);

    return(
        <>
        <Navbar2/>
        <div>
        <IndivTitulo/>
        
            <div className="eventos-container-ev">
                {data.map((item) => (
                    <CadaEvento
                    data={item}/>
                ))}
            </div>
            </div>
            
        </>
    );
}

export default EventosIndiv;

