import React from "react";
import "../stylesheets/addnewevent.css";
import Navbar2 from "../components/navbar2";
import Addnewevent22 from "../components/addnew2";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Addnewevent2(){
    return(
        <>
        <Navbar2/>
        <ToastContainer />
        <Addnewevent22/>
        </>
    );
}

export default Addnewevent2;
