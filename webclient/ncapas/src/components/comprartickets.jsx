import React, { useState, useEffect, useContext } from "react";
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BiCalendar } from 'react-icons/bi';
import { GoLocation } from 'react-icons/go';
import { BsClockHistory } from 'react-icons/bs';
import '../stylesheets/comprar.css';
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { UserContext } from '../UserContext.js';
import Modal from 'react-modal';




function Comprartickets(props) {
    const { user } = useContext(UserContext);

    const navigate = useNavigate();
    const [email, setEmail] = useState('')

    const [nombreTitular, setNombreTitular] = useState('');
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [fechaExpiracion, setFechaExpiracion] = useState('');
    const [codigoSeguridad, setCodigoSeguridad] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [cantidadTickets, setCantidadTickets] = useState(1);
    const [precio, setPrecio] = useState(0);

    const [showModal, setShowModal] = useState(false);


    const [localidades, setLocalidades] = useState([]);

    const { URL } = useContext(UserContext);

    useEffect(() => {
        axios.get(URL + '/localidad/all/?id=' + props.id)
            .then(response => {
                setLocalidades(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error al obtener la lista de eventos:', error);
            });
    }, [props.id]);

    const preparingpage = () => {

        axios.get(URL + '/localidad/all/?id=' + props.id)
            .then(response => {

                setLocalidades(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error al obtener la lista de eventos:');
            });
        comprartickets();
    }


    const comprartickets = async () => {

        try {

            

            for (let i = 0; i < cantidadTickets; i++) {

                const respuesta = await axios.post(URL + '/ticket/save', {
                    idLocalidad: localidad,
                    emailUsuario: user.email
                });

                console.log(respuesta.data)
            }

            setShowModal(true);


        } catch (error) {
            console.error('Error al realizar la solicitud POST:', error);
        }
    }

    const handleDecrement = () => {
        if (cantidadTickets > 1) {
            setCantidadTickets(cantidadTickets - 1);
        }
    };

    const handleIncrement = () => {
        setCantidadTickets(cantidadTickets + 1);
    };

    const handleLocalidadSelection = (selectedLocalidad) => {
        setLocalidad(selectedLocalidad.id);
        setPrecio(selectedLocalidad.precio);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (
            nombreTitular.trim() === '' ||
            numeroTarjeta.trim() === '' ||
            fechaExpiracion.trim() === '' ||
            codigoSeguridad.trim() === '' ||
            localidad === ''
        ) {
            toast.error('Por favor, llenar todos los campos y seleccionar una categoría.');
            return;
        }

        console.log('Datos enviados:', {
            nombreTitular,
            numeroTarjeta,
            fechaExpiracion,
            codigoSeguridad,
            localidad,
            cantidadTickets
        });

        try {
            await comprartickets();
            setShowModal(true);
        } catch (error) {
            console.error('Error al realizar la compra:', error);
            toast.error('Error al realizar la compra. Por favor, intenta nuevamente.');
        }
    };


    return (
        <>
            <ToastContainer />
            <div className="completo-compra">
                <div className="contenedor-total-compra">
                    <h1>{props.artista}</h1>
                    <div className="contenedor-principal-compra-info">
                        <p className='compra-fecha'><BiCalendar /> {props.fecha}</p>
                        <p className='compra-ubi'><GoLocation /> {props.ubi}</p>
                        <p className='compra-hora'><AiOutlineClockCircle /> {props.hora}</p>
                        <p className='compra-duracion'><BsClockHistory />{props.duracion} hora/s de duración</p>
                    </div>
                    <p className="titulos-pequeños-datos">
                        Ingrese los siguientes datos:
                    </p>
                    <p className="titulos-pequeños-tarjeta">
                        Ingrese los datos de su tarjeta:
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="division-secundaria">
                            <div className="contenedor-secundario-datos">
                                <div className="localidades-cont-check">
                                    <p className="titulos-pequeñitos-local">
                                        Seleccione la localidad:
                                    </p>
                                    <div className="ul-lista">
                                        <ul className="checkbox-list-compra">
                                            {localidades.slice(0).map((item) => (
                                                <li key={item.id}>
                                                    <button
                                                        className={`buton-localidad ${localidad === item.id ? 'selected' : ''}`}
                                                        type="button"
                                                        onClick={() => handleLocalidadSelection(item)}
                                                    >
                                                        {item.nombre} ${item.precio}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <p className="titulos-pequeñitos-tickets class2">Seleccione la cantidad de tickects:</p>
                                <div className="divmas">
                                    <div className="tickets-dropdown">
                                        <span className="minus" onClick={handleDecrement}>-</span>
                                        <span className="number">{cantidadTickets.toString().padStart(2, '0')}</span>
                                        <span className="plus" onClick={handleIncrement}>+</span>
                                    </div>
                                </div>
                                <div className="espacio-total">
                                    <p className="titulos-pago-total">
                                        Total a cancelar ${precio * cantidadTickets}
                                    </p>
                                </div>
                            </div>
                            <div className="contenedor-secundario-tarjeta">
                                <div className="espacios">
                                    <p className="titulos-pequeñitos">
                                        Nombre del titular:
                                    </p>
                                    <input
                                        className="input-nombre"
                                        type="text"
                                        placeholder="Nombre del titular"
                                        value={nombreTitular}
                                        onChange={(e) => setNombreTitular(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="espacios">
                                    <p className="titulos-pequeñitos">No. de la tarjeta:</p>
                                    <input
                                        className="input-tarjeta"
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]{13,16}"
                                        placeholder="Número de tarjeta"
                                        value={numeroTarjeta}
                                        onChange={(e) => setNumeroTarjeta(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="espacios">
                                    <p className="titulos-pequeñitos">Fecha de expiración:</p>
                                    <input
                                        className="input-fecha"
                                        type="text"
                                        pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                                        placeholder="MM/AA"
                                        value={fechaExpiracion}
                                        onChange={(e) => setFechaExpiracion(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="espacios">
                                    <p className="titulos-pequeñitos">Código de seguridad:</p>
                                    <input
                                        className="input-cvv"
                                        type="text"
                                        pattern="[0-9]{3}"
                                        placeholder="cvv"
                                        value={codigoSeguridad}
                                        onChange={(e) => setCodigoSeguridad(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <button className="buton-comprar-tickets" type="submit" onClick={comprartickets}>Comprar tickets</button>
                    </form>
                </div>
            </div>

            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Resumen de la compra"
                className="modalResumen"
                shouldCloseOnOverlayClick={false}
            >
                <h3 className="titu-res">¡Gracias por tu confianza!</h3>
                <p className="pionts">----------------------------------------------------</p>
                <h5 className="h5-titu">Detalles de la compra:</h5>
                <div className="resume1">
                    <div  className="div-res-1">
                        <p> Artista:</p>
                        <p> Fecha: </p>
                        <p> Ubicación: </p>
                        <p> Hora: </p>
                        <p> Localidad: </p>
                        <p> Cantidad de tickets: </p>
                        <p> Precio unitario:</p>
                    </div>
                    <div className="div-res-2">
                        <p> {props.artista}</p>
                        <p> {props.fecha}</p>
                        <p> {props.ubi}</p>
                        <p> {props.hora}</p>
                        <p>  {localidades.find((item) => item.id === localidad)?.nombre}</p>
                        <p>{cantidadTickets}</p>
                        <p> {localidades.find((item) => item.id === localidad)?.precio}</p>
                    </div>
                </div>
                <div className="div-res-3">
                    <p><span>Total:</span> ${precio * cantidadTickets}</p>
                </div>
                <button onClick={() => navigate('/home')}>Ir a inicio</button>
            </Modal>
        </>
    );
}

export default Comprartickets;

