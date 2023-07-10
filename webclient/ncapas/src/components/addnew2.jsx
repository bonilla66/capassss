import React, { useState, useEffect, useContext } from "react";
import "../stylesheets/addnewevent.css";
import { BiSearch } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import Modal from "react-modal";
import { Link, useLocation  } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import Addnewevent220 from "./indivusers.jsx";
import { UserContext } from '../UserContext';

function Addnewevent22() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [localidades, setLocalidades] = useState([]);
    const [nombreLocalidad, setNombreLocalidad] = useState("");
    const [capacidad, setCapacidad] = useState("");
    const [precio, setPrecio] = useState("");
    const [patrocinadores, setPatrocinadores] = useState('');
    const [urlImagenLocalidades, setUrlImagenLocalidades] = useState('');
    const [usuarios, setUsuarios] = useState([]);

    const { URL } = useContext(UserContext);

    

    useEffect(() => {
        const artistaalmacenado = localStorage.getItem('artista');
    }, [localidades]);

    function agregarEvento() {
        const nuevoEvento = {
            nombre: nombreLocalidad,
            capacidad: capacidad,
            precio: precio,
        };

        if (!nombreLocalidad || !capacidad || !precio) {
            toast.error(
                "Por favor, complete todos los campos antes de agregar el evento"
            );
            console.log("Por favor, complete todos los campos antes de agregar el evento");
            return;
        }

        setLocalidades([...localidades, nuevoEvento]);

        setNombreLocalidad("");
        setCapacidad("");
        setPrecio("");
    }

    const eliminarLocalidad = (index) => {
        const nuevasLocalidades = localidades.filter(
            (localidad, i) => i !== index
        );
        setLocalidades(nuevasLocalidades);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const handlepatrocinadoresChange = (event) => { setPatrocinadores(event.target.value); };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleCapacidadChange = (e) => {
        const value = e.target.value;
        if (value === "" || /^\d+$/.test(value)) {
            setCapacidad(value);
        }
    };

    const handlePrecioChange = (e) => {
        const value = e.target.value;
        if (value === "" || /^\d*\.?\d*$/.test(value)) {
            setPrecio(value);
        }
    };

    const handleInformacionClick = () => {
        postEventoExtra();
        openModal();
    };

    const postEventoExtra = async () => {

        try {

            localidades.forEach((localidad) => {
                axios.post(URL + '/localidad/save', {
                    nombre: localidad.nombre,
                    capacidad: localidad.capacidad,
                    precio: localidad.precio,
                    artista: localStorage.getItem('artista')
                });

            });

            axios.post(URL + '/eventos/save/patrocinadores', {
                artista: localStorage.getItem('artista'),
                patrocinadores: patrocinadores,
                imagenlocalidades: urlImagenLocalidades
            });
            
        } catch (error) {
            console.error('Error al realizar la solicitud POST:', error);
        }
    }

    const handleurlImagenLocalidadesChange = (event) => { setUrlImagenLocalidades(event.target.value)};


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
            <div className="add-new-event1">
                <h2>
                    Agregar un nuevo <span>evento</span>
                </h2>
                <div className="second-container">
                    <h3>Localidad:</h3>
                    <div className="second-container1">
                        <label>Localidad:</label>
                        <input
                            type="text"
                            placeholder="Nombre de la localidad"
                            value={nombreLocalidad}
                            onChange={(e) => setNombreLocalidad(e.target.value)}
                        />
                    </div>
                    <div className="second-container2">
                        <div className="capacity">
                            <label>Capacidad:</label>
                            <input
                                type="text"
                                placeholder="Capacidad"
                                value={capacidad}
                                onChange={handleCapacidadChange}
                            />
                        </div>
                        <div className="price">
                            <label>Precio:</label>
                            <input
                                type="text"
                                placeholder="Precio"
                                value={precio}
                                onChange={handlePrecioChange}
                            />
                        </div>
                    </div>
                    <div className="second-container3">
                        <button
                            className="sub-new-e"
                            type="submit"
                            onClick={agregarEvento}
                        >
                            Agregar localidad
                        </button>
                    </div>
                    <div className="second-container4">
                        <table>
                            <thead>
                                <tr>
                                    <th>Localidad</th>
                                    <th>Precio</th>
                                    <th>Capacidad</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {localidades.map((localidad, index)=> (
                                    <tr key={index}>
                                        <td>{localidad.nombre}</td>
                                        <td>{localidad.precio}</td>
                                        <td>{localidad.capacidad}</td>
                                        <td>
                                            <button onClick={() => eliminarLocalidad(index)}>
                                                <BiTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="second-container5">
                        <label>Ingrese la URL de la imagen:</label>
                        <input type="text" placeholder="URL" value={urlImagenLocalidades} onChange={handleurlImagenLocalidadesChange}/>
                    </div>
                </div>
                <div className="third-container">
                    <h3>Información complementaria:</h3>
                    <div className="third-container1">
                        <label>Patrocinadores:</label>
                        <input type="text" value={patrocinadores} onChange={handlepatrocinadoresChange}/>
                    </div>
                    <div className="third-container2">
                        <div className="third-cont-search">
                            <label>Colaboradores:</label>
                            
                        </div>
                        <div className="third-container2-1">
                            <div className="colabo-todos">
                            {usuarios.map((usuarios, index) => (
                                <Addnewevent220
                                    key={index}
                                    user={usuarios.usuario} 
                                    correo={usuarios.email} 
                                />
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="add-event-btn-new20"
                    onClick={handleInformacionClick}
                >
                    Agregar evento
                </button>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Modal"
                    className="custom-modal"
                    overlayClassName="custom-overlay"
                >
                    <img
                        src={require(`../images/ssSave.png`)}
                        alt="logo"
                        className="img-save-p"
                    />
                    <h2>Agregado con éxito</h2>
                    <p>
                        El evento fue agregado con toda la información que ha proporcionado
                    </p>
                    <Link to="/home">
                        <button onClick={closeModal} className="acepN">
                            Aceptar
                        </button>
                    </Link>
                </Modal>
            </div>
        </>
    );
}

export default Addnewevent22;