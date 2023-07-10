import React, { useState, useEffect, useContext } from "react";
import "../stylesheets/login.css";
import jwt_decode from "jwt-decode";
import Home from '../pages/home';
import Modal from 'react-modal';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { UserContext } from '../UserContext';

function LoginC() {
    const { updateUser } = useContext(UserContext);
    const { updateRol } = useContext(UserContext);
    const { URL } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(false);
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [isPasswordEntered, setIsPasswordEntered] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const navigate = useNavigate();

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);

        postUsuario(response.credential);

        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject.name);
        setEmail(userObject.email);
        setToken(response.credential);
        setLoggedInUser(userObject);

        const userData = userObject;
        updateUser(userData);
    }

    const postUsuario = async (user) => {
        try {
            var userObject = jwt_decode(user);


            // Método findUsuarioByEmail
            await axios.get(URL + '/user/email?email=' + userObject.email).then(response => {
                console.log(response.data);
                if (response.data === false) { // False si el usuario no existe y se mete al if
                    // Método POST para guardar el usuario
                    console.log(user)

                    axios.post(URL + '/user/register', {
                        username: userObject.name,
                        email: userObject.email,
                        tokengoogle: user // Abre el modal solo si se guarda correctamente
                    }).catch(error => {
                        console.log(error);
                    });
                    
                    setShowModal(true);

                }else{
                    setIsPasswordEntered(true);
                    setLoggedInUser(true);
                }
                
                axios.get(URL + '/rol/user', {
                    params:{
                        email: userObject.email
                    }
                }).then(response => {
                    updateRol(response.data)
                    console.log(response.data)
                }).catch(error => {
                    console.log(error)
                });

            }).catch(error => {
                console.log(error);
            });
        } catch (error) {
            console.error('Error al realizar la solicitud POST:', error);
        }
    }

    const postPassword = async () => {
        try {
            const response = await axios.post(URL + '/user/register/password', {
                password: password,
                email: email
            });

            setLoggedInUser(true);
        } catch (error) {
            console.error('Error al realizar la solicitud POST:', error);
        }
    }

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: "356544695211-01nglumeq7i444dpquvae2mku7sp77vd.apps.googleusercontent.com",
            callback: handleCallbackResponse,
        });

        window.google.accounts.id.renderButton(
            document.getElementById("singIndiv"),
            { theme: "Outline", size: "large" }
        );
    }, []);

    const handlePasswordClick = () => {
        postPassword();
    }

    const Signin = async () => {
        try {
            console.log(password);
            console.log(email);
            await axios.post(URL + '/user/login', {
                email: email,
                password: password
            }).then(response => {
                console.log(response.data);
                var userObject = jwt_decode(response.data);
                updateUser(userObject);

                axios.get(URL + '/rol/user', {
                    params:{
                        email: userObject.email
                    }
                }).then(response => {
                    updateRol(response.data)
                    console.log(response.data)
                }).catch(error => {
                    console.log(error)
                });

            }).catch(error => {
                console.log(error);
            });
        } catch (error) {
            console.error('Error al realizar la solicitud: ', error);
        }
    }


    useEffect(() => {
        // Check if user is logged 
        if (loggedInUser && isPasswordEntered) {
            navigate("/home"); // Redirect to the home page
        }
    }, [loggedInUser]);

    return (
        <>
            <div className="login-com">
                <div className="login">
                    <div className="login-form">
                        <div className="logo-smung">
                            <img src={require("../images/SMUNGT.png")} alt="img-smung" className="img-smung" />
                        </div>
                        <div className="login-input">
                            <div className="welcome">
                                <p><b>Hola!</b></p>
                                <p>Bienvenido a <span>SmungTickets</span></p>
                                <div className="inputG">
                                    <div id="singIndiv" className="google-login-button"></div>
                                    <div className="or">
                                        <span></span>
                                        <p>o</p>
                                        <span></span>
                                    </div>
                                    <div className="btns">
                                        <input className="btn-em" type="text" placeholder="Email" value={email} onChange={handleEmailChange} />
                                        <input className="btn-us" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                                    </div>
                                    <Link to={"/home"}>
                                        <button className="btn-log-p" onClick={Signin}>Login</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="img-concierto"></div>
                </div>
            </div>

            <Modal
                isOpen={showModal}
                onRequestClose={() => { }}
                shouldCloseOnOverlayClick={false}
                className="modal-new"
            >
                <img src={require("../images/ss-pass.png")} alt="img-smung" className="img-pass" />
                <h2>Ayúdanos a completar tu información</h2>
                <label>Ingrese contraseña para su cuenta:</label>
                <input type="password" placeholder="Contraseña" className="input-pass" value={password} onChange={handlePasswordChange} />
                <Link to={"/home"}>
                    <button className="btn-log-pass" onClick={handlePasswordClick}>Continuar</button>
                </Link>
                
            </Modal>
        </>
    );
}

export default LoginC;

















