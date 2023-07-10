import React from "react";
import "../stylesheets/searchbar.css";
import {BsSearch} from "react-icons/bs";

function Searchbar() {
    return(
        <div className="searchBar">
            <input type="text" placeholder="Buscar..." />
            <BsSearch className="searchIcon"/>
        </div>
);
};

export default Searchbar;