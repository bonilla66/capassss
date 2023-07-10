import React, {useState} from "react";
import {BiSearch} from "react-icons/bi";
import "../stylesheets/editare.css";
import Navbar2 from "./navbar2";
import { Link } from "react-router-dom";

function EditE(props) {
    const [ubicaciones, setUbicaciones] = React.useState(["salamanca", "cuscatlan"]);
    const [categorias, setCategorias] = React.useState(["musical", "comedia", "debate", "teatro", "danza"]);
    const [nuevaUbicacion, setNuevaUbicacion] = React.useState("");
    const [nuevaCategoria, setNuevaCategoria] = React.useState("");

    const agregarNuevaUbicacionCategoria = (event) => {
        event.preventDefault();

        if (nuevaUbicacion !== "") {
        setUbicaciones([...ubicaciones, nuevaUbicacion]);
        setNuevaUbicacion("");
        }

        if (nuevaCategoria !== "") {
        setCategorias([...categorias, nuevaCategoria]);
        setNuevaCategoria("");
        }
    };
    const [showModal, setShowModal] = useState(false);

const handleGuardarCambios = () => {
    setShowModal(true);
};

const closeModal = () => {
    setShowModal(false);
};

    return (
        <>
        <Navbar2 />
        <div>
        <div className="principal-container-edit">
            <h2>Editando evento:</h2>
            <div className="edit-info-general">
            <div className="edit-info-principal">
                <div className="edit-tittle">
                <h3>Información principal</h3>
                </div>
                <div className="add-new-info">
                <div className="edit-img">
                    <img src={require(`../images/${props.image}.jpg`)} className="img-show-edit" />
                    <input type="file" name="file" id="file" className="inputfile" />
                </div>
                <div className="edit-info-tittle">
                    <div className="first-half-placeholders">
                    <div className="each-placeholder">
                        <label>Artista:</label>
                        <input type="text" placeholder={props.artista} />
                    </div>
                    <div className="each-placeholder">
                        <label>Fecha:</label>
                        <input type="text" placeholder={props.fecha} />
                    </div>
                    <div className="each-placeholder">
                        <label>Hora:</label>
                        <input type="text" placeholder={props.hora} />
                    </div>
                    <div className="each-placeholder">
                        <label>Duración:</label>
                        <input type="text" placeholder={props.duracion} />
                    </div>
                    </div>
                    <div className="second-half-drop">
                    <div className="each-placeholder">
                        <label htmlFor="ubicacion">Ubicaciones:</label>
                        <select id="ubicacion">
                        {ubicaciones.map((ubicacion) => (
                            <option value={ubicacion}>{ubicacion}</option>
                        ))}
                        </select>
                    </div>
                    <div className="each-placeholder">
                        <label htmlFor="categoria">Categoría:</label>
                        <select id="categoria">
                        {categorias.map((categoria) => (
                            <option value={categoria}>{categoria}</option>
                        ))}
                        </select>
                    </div>
                    </div>
                </div>
                </div>
                <div className="add-new-list">
                <p><b>*Si desea agregar alguna categoría o ubicación nueva:</b></p>
                <form onSubmit={agregarNuevaUbicacionCategoria}>
                    <input
                    type="text"
                    placeholder="Nueva ubicación"
                    className="input-add"
                    value={nuevaUbicacion}
                    onChange={(event) => setNuevaUbicacion(event.target.value)}
                    />
                    <input
                    type="text"
                    placeholder="Nueva categoría"
                    className="input-add"
                    value={nuevaCategoria}
                    onChange={(event) => setNuevaCategoria(event.target.value)}
                    />
                    <div className="agregar-new">
                    <input type="submit" value="Agregar" />
                    </div>
                </form>
                </div>
            </div>
            <div className="edit-info-localidades3">
                <h3>Localidades:</h3>
                <div className="edit-info-localidades">
                    <div className="editar-img-local">
                        <img src={require("../images/Localidades.jpg")} className="img-localidades-edit" />                    </div>
                    <div className="edit-info-localidades2">
                        <div className="div-titulos-local">
                            <h4>Localidad</h4>
                            <h4>Precio</h4>
                            <h4>Capacidad</h4>
                        </div>
                        <div className="div-placeholders">
                            <div className="placeholders-localidad">
                                <input type="text" placeholder="VIP" />
                                <input type="text" placeholder="Gold" />
                                <input type="text" placeholder="General" />
                            </div>
                            <div className="placeholders-precios">
                                <input type="text" placeholder="$100" />
                                <input type="text" placeholder="$50" />
                                <input type="text" placeholder="$30" />
                            </div>
                            <div className="placeholders-capacidad">
                                <input type="text" placeholder="15" />
                                <input type="text" placeholder="15" />
                                <input type="text" placeholder="123" />
                            </div>
                        </div>
                        <div className="add-new-local">
                            <p><b>*Si desea agregar alguna localidad nueva:</b></p>
                            <div className="add-new-localidad">
                                <form>
                                    <input type="text" placeholder="Localidad" className="input-new-local"/>
                                    <input type="text" placeholder="Precio" className="input-new-local" />
                                    <input type="text" placeholder="Capacidad" className="input-new-local"/>
                                </form>
                                <input type="submit" value="Agregar" className="boton-submit-localidad"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="edit-info-patro-colaboradores">
                <h3>Información complementaria</h3>
                <div className="div-patro-mitad">
                    <div className="label-patro">
                        <label>Patrocinadores:</label>
                    </div>
                    <div className="input-patro">
                        <input type="text" placeholder="" />
                    </div>
                </div>
                <div className="div-colab">
                    <div className="titulo-search">
                        <label>Colaboradores:</label>
                        <div className="search-bar-ed">
                            <input placeholder= "Usuario o correo" type="text" id="search" className="search-input-ed" />
                            <BiSearch className="search-icon" />
                        </div>
                    </div>
                    <div className="usuarios">
                        <div className="cada-usuario-colab">
                                <div className="cadaUno">
                                    <input type="checkbox" id="usuario1" name="usuario1" value="usuario1" className="input-c" />
                                    <p>Usuario</p>
                                    <p className="c">correo</p>
                                </div>
                                <div className="cadaUno">
                                    <input type="checkbox" id="usuario1" name="usuario1" value="usuario1" className="input-c" />
                                    <p>Usuario</p>
                                    <p className="c">correo</p>
                                </div>
                                <div className="cadaUno2">
                                    <input type="checkbox" id="usuario1" name="usuario1" value="usuario1" className="input-c" />
                                    <p>Usuario</p>
                                    <p className="c">correo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="boton-submit-editar-show" onClick={handleGuardarCambios}>Guardar cambios</button>
            </div>
            </div>

            {showModal && (
                <div className="modal">
                <div className="modal-content">
                <img src={require("../images/ssSave.png")} className="img-confirmacion" />
                    <h3 className="conf-g">Los cambios se han guardado con éxito!</h3>
                    <Link to="info-page">
                        <button className="btn-savvve">Ver evento</button>
                    </Link>
                </div>
                </div>
            )}
        </>
    );
}

export default EditE;
