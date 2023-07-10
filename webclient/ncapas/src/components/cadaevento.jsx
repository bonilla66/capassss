import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalBodyProps, ModalHeaderProps, ModalFooterProps} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../stylesheets/cadaevento.css";
import axios from 'axios';
import QRCode from 'qrcode.react';
import { UserContext } from '../UserContext';

const CadaEvento = (props) => {
    const [activeTab, setActiveTab] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showModalContent, setShowModalContent] = useState(true);
    const [modalContent, setModalContent] = useState("main");
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [destinatario, setDestinatario] = useState('');

    const [codigo, setCodigo] = useState(""); //Codigo que guarda para que sea igual
    const [code, setCode] = useState("") //Codigo que ingresa el usuario

    const { URL } = useContext(UserContext);

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    const handleTransferClick = () => {
        setShowModalContent(false);
        setModalContent("transfer");
    };

    const handleDestinatarioChange = (event) => {
        setDestinatario(event.target.value);
    };

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    const generateRandomNumber = () => {
        const min = 100000; // Valor mínimo de 6 dígitos
        const max = 999999; // Valor máximo de 6 dígitos
      
        const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
        return randomNumber.toString();
    };

    const sendEmail = async () => {
        const codeRandom = generateRandomNumber();
        setCodigo(codeRandom);
        
        const emailData = {
            toUser: destinatario,
            subject: "Codigo SMUNG TICKET",
            code: codeRandom
        };
    
        try {

            console.log(emailData);

            await axios.post(URL + '/mail/send', emailData).then(response => {
                console.log("logica para cambiar ticket en la Base")
            });
          console.log('Correo electrónico enviado correctamente');
        } catch (error) {
          console.error('Error al enviar el correo electrónico:', error);
        }
    };

    useEffect(()=>{
        console.log(props.data.evento.artista)
        const date = new Date(props.data.evento.fecha).toISOString().split('T')[0];
        setFecha(date)

        const time = props.data.evento.hora.slice(0, 5);
        setHora(time)
    });
    
    const handleQRClick = () => {
        setShowModalContent(false);
        setModalContent("qr");
    };
    
    const handleCardClick = () => {
        setShowModal(true);
    };
    
    const closeModal = () => {
        setShowModal(false);
        setShowModalContent(true);
        setModalContent("main");
    };
    
    const handleCancelClick = () => {
        setModalContent("main");
    };
    
    const handleIngresarClick = () => {
        sendEmail();
        setShowModalContent(false);
        setModalContent("correoEnviado");
    };
    
    const handleTransferCode = () => {
        setShowModalContent(false);
        setModalContent("transferCode");
    };
    
    const handleTransferCodeConfirmed = async () => {

        try {
            console.log(code)
            console.log(codigo)
            if(code==codigo){

                
                await axios.post(URL + '/ticket/share', {
                    idTicket: props.data.id_ticket,
                    correoDestinatario: destinatario
                }).then(response => {
                    console.log("Todo Correcto")
                });

                setShowModalContent(false);
                setModalContent("transferCodeConfirmed");
            }else{
                console.log("Codigo incorrecto");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return(
            <>
                <div className="cadaevento-cont-total">
                    <div className="miniatura-shows-ev">
                        <div className="cada-uno-ev">
                            <div className="img-button-ev" onClick={handleCardClick}>
                                <img src={props.data.evento.imagen} className="img-miniatura-ev" />
                            </div>
                            <p>1 ticket</p>
                        </div>
                    </div>
                    {showModal && (
            <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>
                    &times;
                </span>

                {modalContent === "main" && (
                <>
                    <h2 className="title-event-modal">{props.data.evento.artista}</h2>
                    <div className="container-detail-modal">
                    <div className="img-modal-container">
                        <img src={props.data.evento.imagen} alt="" className="img-modal-info" />
                    </div>

                    <div className="container-info-modal">
                        <p className="">{fecha}</p>
                        <p className="">{props.data.evento.ubicacion.nombre}</p>
                        <p className="">{hora}</p>
                        <p className="">1 ticket ({props.data.localidad.nombre})</p>
                    </div>
            </div>
                    <div className="cont-btn-modal">
                    <button
                        className="tns-ticket"
                        onClick={handleTransferClick}
                    >
                        Transferir ticket
                    </button>
                    <button className="gen-qr" onClick={handleQRClick}>
                        Generar QR
                    </button>
                    </div>
                </>
                )}

                {modalContent === "transfer" && (
                <>
                    <h2 className="title-event-modal-2">
                        ¿Desea transferir alguno de sus boletos?
                    </h2>
                    <p className="txt-2modal">
                    Ingrese la siguiente información:
                    </p>
                    <p className="user-txt-modal">
                        Ingrese el usuario destino:
                    </p>
                    <input type="text" className="input-modal-user" value={destinatario} onChange={handleDestinatarioChange}/>
                    <div className="cont-btn-modal">
                    <button
                        className="ingresar-btn"
                        onClick={handleIngresarClick}
                    >
                        Confirmar
                    </button>
                    <button
                        className="return-btn-modal"
                        onClick={handleCancelClick}
                    >
                        Cancelar
                    </button>
                    </div>
                </>
                )}

                {modalContent === "correoEnviado" && (
                <>
                    <div className="mail-confirmed">
                        <img
                            src={require(`../images/logoSend.png`)}
                            alt=""
                            className="img-confirm-modal"
                        />
                    <h2 className="title-qr-modal-2">Correo enviado</h2>
                    <p className="txt-confirmed">
                    Se ha enviado un correo con la información del boleto
                    </p>
                    <button
                        className="confirmation-btn"
                        onClick={handleTransferCode}
                    >
                        Aceptar
                    </button>
                    </div>
                </>
                )}

                {modalContent === "transferCode" && (
                <>
                <h2 className="title-event-modal-2">Ingresa el código</h2>
                <p className="txt-2modal">
                    Ingrese código enviado al usuario destino
                </p>
                <p className="user-txt-modal">Código:</p>
                <input type="text" className="input-modal-user" value={code} onChange={handleCodeChange}/>
                <div className="cont-btn-modal">
                    <button className="ingresar-btn" onClick={handleTransferCodeConfirmed}>Confirmar</button>
                        <button className="return-btn-modal" onClick={closeModal}>
                        Cancelar
                    </button>
                </div>
                </>
            )}

                {modalContent === "transferCodeConfirmed" && (
                    <>
                        <div className="mail-confirmed">
                        <img
                            src={require(`../images/logoSend.png`)}
                            alt=""
                            className="img-confirm-modal"
                        />
                        <h2 className="title-qr-modal-2">
                            Transferencia exitosa
                        </h2>
                        <p className="txt-confirmed">
                            Se han transferido 1 ticket al usuario USUARIO
                        </p>
                        <button className="confirmation-btn" onClick={closeModal}>
                            Regresar
                        </button>
                        </div>
                    </>
                )}

                {modalContent === "qr" && (
                    <>
                        <h2 className="title-qr-modal">Código QR</h2>
                            <div className="qr-div">
                                <QRCode value={props.data.id_ticket} />
                            </div>
                        <p className="txt-qr-content">
                        <span className="txt-alternative">*Recordar:</span> Al
                        momento de ingresar al evento, debe presentar el código QR
                        de la entrada.
                        </p>
                    </>
                    )}
                </div>
                </div>
            )}
            </div>
                </>
            
    );
}

export default CadaEvento;

