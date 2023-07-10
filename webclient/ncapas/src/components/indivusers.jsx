import React, { useState, useEffect } from "react";
import "../stylesheets/addnewevent.css";
import Modal from "react-modal";
import { Link, useLocation  } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from '../UserContext.js';
import { useContext } from 'react';



function Addnewevent220(props) {
    const { user } = useContext(UserContext);
    return (
        <>
        <div className="select-user-colab">
            <input
                type="checkbox"
                id="colaborador1"
                name="colaborador1"
                value="colaborador1"
                defaultChecked

            />
            <p>{props.user}</p>
            <p>{props.correo}</p>
        </div>   
        </>
    );
}

export default Addnewevent220;