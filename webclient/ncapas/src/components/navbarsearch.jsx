import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import '../stylesheets/navbar2.css';


function NavbarSearch({ events, onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="search-bar-nav">
            <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearch}
                className="input-search-nav"
            />
            <BiSearch className="searchIcon" />
        </div>
    );
}

export default NavbarSearch;
