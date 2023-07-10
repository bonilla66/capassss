import React from "react";
import "../stylesheets/stats.css";
import StadisticsC from "../components/stadisticsC.jsx";
import Navbar2 from "../components/navbar2";

function Stadistics(){
    return(
        <>
            <Navbar2/>
            <div className="all20">   
                <StadisticsC/>
            </div>
        </>
    );
}

export default Stadistics;