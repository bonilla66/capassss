import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BiCalendar } from 'react-icons/bi';
import { GoLocation } from 'react-icons/go';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsClockHistory } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import '../stylesheets/info.css';
import Modal from 'react-modal';
import axios from 'axios';
import { UserContext } from '../UserContext';

function ShowInfo(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);
    const [localidades, setLocalidades] = useState([]);
    const { rol } = useContext(UserContext);

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

    const handleModalOpen = () => {
        setIsModalOpen(true);
        setIsButtonsDisabled(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setIsButtonsDisabled(false);
    };

    const deleteEvento = () => {

        axios.delete(URL + '/eventos/delete', {
            params:{
                id: props.id
            }
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log("ha sucedido un error" + error)
        });

    }

    return (
        <>
            <div className='contenedor-info-total'>
                <div className='card-info-totalll'>
                    <div className='img-card-fondo' style={{ backgroundImage: `url(${props.image})`}}>
                        <div className='titulo-card-info'>
                            <h1>{props.artista}</h1>
                        </div>
                    </div>
                    <div className='info-icons-card'>
                        <p>
                            <BiCalendar />
                            {props.fecha}
                        </p>
                        <p>
                            <GoLocation />
                            {props.ubi}
                        </p>
                        <p>
                            <AiOutlineClockCircle />
                            {props.hora}
                        </p>
                        <p>
                            <BsClockHistory />
                            {props.duracion}
                        </p>
                        <p>
                            <BiCategory />
                            {props.cat}
                        </p>
                    </div>
                    <h2>Localidades:</h2>
                    <div className='localidades-card-info'>
                        <div className='localidades-card-info1'>
                            <div className='localidades-card-info1-1'>
                                {localidades.slice(0).map((item) => (
                                    <p>{item.nombre}</p>
                                ))}
                            </div>
                            <div className='localidades-card-info1-2'>
                                {localidades.slice(0).map((item) => (
                                    <p>${item.precio}</p>
                                ))}
                            </div>
                        </div>
                        <div className='localidades-card-info2'>
                            <img
                                src={props.image2}
                                className='img-local-card'
                                alt='Localidades'
                            />
                        </div>
                    </div>
                    <div className='patro-colab-cont'>
                        <div className='patro-cont'>
                            <h2>Patrocinadores:</h2>
                            <p>{props.patro}</p>
                        </div>
                        <div className='colab-cont'>
                            <h2>Colaboradores:</h2>
                            <p>personas</p>
                            <p>personas</p>
                        </div>
                    </div>
                    <div className='contenedor-botones'>
                        {rol.id === 2 &&(
                            <button
                            className={`cancelar-evento-button ${isButtonsDisabled ? 'disabled' : ''}`}
                            onClick={handleModalOpen}
                        >
                            Cancelar evento
                        </button>
                        )}
                        <Link to="buy-page" className='link-button'>
                            <button className={`comprar-button ${isButtonsDisabled ? 'disabled' : ''}`}>
                                Comprar
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleModalClose}
                className='modal-second border'
                overlayClassName='modal-overlay-second'
            >
                <div className='modal-content-second'>
                    <img
                        src={require(`../images/ssServicio.png`)}
                        alt='logo'
                        className='img-serv-info'
                    />
                    <h3>¿Desea cancelar este evento?</h3>
                    <div className='botones-m'>
                        <Link to={"/home"}>
                            <button className='acep-card' onClick={deleteEvento}>
                                Aceptar
                            </button>
                        </Link>
                        <button className='can-card' onClick={handleModalClose}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default ShowInfo;
