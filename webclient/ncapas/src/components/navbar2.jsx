import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { IoTicketOutline } from 'react-icons/io5';
import { BiUser } from 'react-icons/bi';
import { MdElectricalServices } from 'react-icons/md';
import { FaUsersCog } from 'react-icons/fa';
import { BiFilterAlt } from 'react-icons/bi';
import { BiSearch } from 'react-icons/bi';
import '../stylesheets/navbar2.css';
import { UserContext } from '../UserContext';

function Navbar2() {
    const { user } = useContext(UserContext);
    const { rol } = useContext(UserContext);

    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(user && Object.keys(user).length > 0);
    }, [user]);

    const toggleDropdown = () => {
        setActiveDropdown(activeDropdown === 'dropdown1' ? null : 'dropdown1');
    };

    const toggleDropdown2 = () => {
        setActiveDropdown(activeDropdown === 'dropdown2' ? null : 'dropdown2');
    };

    const toggleDropdown4 = () => {
        setActiveDropdown(activeDropdown === 'dropdown4' ? null : 'dropdown4');
    };

    const toggleDropdown5 = () => {
        setActiveDropdown(activeDropdown === 'dropdown5' ? null : 'dropdown5');
    };

    const toggleDropdown6 = () => {
        setActiveDropdown(activeDropdown === 'dropdown6' ? null : 'dropdown6');
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const navbarRef = useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleOutsideClick = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            setActiveDropdown(null);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        window.location.href = '/';
    };

    return (
        <>
            <nav ref={navbarRef}>
                <div className="logo">
                    <Link to="/home" className="dropdown-link">
                        <img src={require(`../images/SMUNGT.png`)} alt="logo" className="logo-nav" />
                    </Link>
                </div>
                <div className="list-icons">
                    <ul className="nav-ul">
                        <li className="li-nav">
                            <button
                                onClick={toggleDropdown}
                                className={activeDropdown === 'dropdown1' ? 'isDropdownOpen' : ''}
                            >
                                <IoTicketOutline />
                            </button>
                            {activeDropdown === 'dropdown1' && (
                                <div className="dropdown-tic" style={{ color: 'white' }}>
                                    <ul>
                                        <Link to="/home" style={{ color: 'white', textDecoration: 'none' }}>
                                            <li>Cartelera</li>
                                        </Link>
                                        {rol.id === 2 && (
                                            <Link to="/home/add-event" style={{ color: 'white', textDecoration: 'none' }}>
                                                <li>Agregar nuevo evento</li>
                                            </Link>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </li>
                        {rol.id === 2 && (
                        <li className="li-nav">
                            <button
                                onClick={toggleDropdown2}
                                className={activeDropdown === 'dropdown2' ? 'isDropdownOpen' : ''}
                            >
                                <FaUsersCog />
                            </button>
                            {activeDropdown === 'dropdown2' && (
                                <div className="dropdown-tic" style={{ color: 'white' }}>
                                    <ul>
                                        <Link to="/home/eventos-usuarios" style={{ color: 'white', textDecoration: 'none' }}>
                                            <li>Configurar cuentas</li>
                                        </Link>
                                    </ul>
                                </div>
                            )}
                        </li>)}
                        <li className="li-nav">
                            <button
                                onClick={toggleDropdown6}
                                className={activeDropdown === 'dropdown6' ? 'isDropdownOpen' : ''}
                            >
                                <BiUser />
                                {isLoggedIn && <span className="user-name">{user.given_name}</span>}
                            </button>
                            {activeDropdown === 'dropdown6' && (
                                <div className="dropdown-tic dropdown-tic-user" style={{ color: 'white' }}>
                                    <ul>
                                        {isLoggedIn ? (
                                            <>
                                                <Link to="/home/each-one" style={{ color: 'white', textDecoration: 'none' }}>
                                                    <li>Mis eventos</li>
                                                </Link>
                                                <li onClick={handleLogout}>Cerrar sesión</li>
                                            </>
                                        ) : (
                                            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                                                <li>Iniciar sesión</li>
                                            </Link>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleModalClose}
                className="modal-second"
                overlayClassName="modal-overlay-second"
            >
                <div className="modal-content-second">
                    <img src={require(`../images/ssServicio.png`)} alt="logo" className="img-serv" />
                    <h3>¿Desea apagar el servicio?</h3>
                    <div className="botones-m">
                        <button className="acep" onClick={handleModalClose}>
                            Aceptar
                        </button>
                        <button className="can" onClick={handleModalClose}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Navbar2

