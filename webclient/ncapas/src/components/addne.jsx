import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../stylesheets/addnewevent.css";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';

function Addne() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [artista, setArtista] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [duracion, setDuracion] = useState('');
    const [urlImagen, setUrlImagen] = useState('');
    const { URL } = useContext(UserContext);

    useEffect(() => {
        localStorage.setItem('artista', artista);
        fetchCategoria();
        fetchUbicacion();
    }, [artista]);

    //------------------------------------------------------------------------------------

    // Categoria
    const [categoria, setCategoria] = useState([]);
    const [selectedCategoria, setCategoriaValue] = useState('');

    const fetchCategoria = async () => {
        try {
            const response = await axios.get(URL + '/categoria/all');
            setCategoria(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCategoriaChange = (event) => {
        setCategoriaValue(event.target.value);
    };

    // Metodo POST
    const [category, setCategory] = useState('');
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const postCategoria = async () => {
        if (category.trim() === '') {
            return; // No category input provided, do nothing
        }

        // Check for duplicate category
        const isCategoryDuplicate = categoria.some(
            (categoriaObj) =>
                categoriaObj.nombre.toLowerCase() === category.toLowerCase()
        );

        if (isCategoryDuplicate) {
            toast.error('Categoría ya almacenada, ingrese nuevos datos.');
            return;
        }

        try {
            const response = await axios.post(URL + '/categoria/save', {
                nombre: category
            });
            console.log('Respuesta del servidor:', response.data);
            toast.success('Categoría almacenada con éxito.');
            // Update the category dropdown after successful addition
            fetchCategoria();
            setCategory('');
        } catch (error) {
            console.error('Error al realizar la solicitud POST:', error);
            toast.error('Ocurrió un error al guardar la categoría.');
        }
    };

    //-------------------------------------------------------------------------------------

    // Ubicacion
    const [ubicacion, setUbicacion] = useState([]);
    const [selectedUbicacion, setUbicacionValue] = useState('');

    const fetchUbicacion = async () => {
        try {
            const response = await axios.get(URL + '/ubicacion/all');
            setUbicacion(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleUbicacionChange = (event) => {
        setUbicacionValue(event.target.value);
    };

    // Metodo POST
    const [ubicacionInput, setUbicacionInput] = useState('');
    const handleUbicacionInputChange = (event) => {
        setUbicacionInput(event.target.value);
    };

    const postUbicacion = async () => {
        if (ubicacionInput.trim() === '') {
            return; // No location input provided, do nothing
        }

        // Check for duplicate location
        const isUbicacionDuplicate = ubicacion.some(
            (ubicacionObj) =>
                ubicacionObj.nombre.toLowerCase() === ubicacionInput.toLowerCase()
        );

        if (isUbicacionDuplicate) {
            toast.error('Ubicación ya almacenada, ingrese nuevos datos.');
            return;
        }

        try {
            const response = await axios.post(URL + '/ubicacion/save', {
                nombre: ubicacionInput
            });
            console.log('Respuesta del servidor:', response.data);
            toast.success('Ubicación almacenada con éxito.');
            // Update the location dropdown after successful addition
            fetchUbicacion();
            setUbicacionInput('');
        } catch (error) {
            console.error('Error al realizar la solicitud POST:', error);
            toast.error('Ocurrió un error al guardar la ubicación.');
        }
    };

    //--------------------------------------------------------------------------------------
    // Agregar Evento

    const postEvento = async () => {
        try {
            if (artista === '' || fecha === '' || hora === '' || duracion === '' || selectedUbicacion === '' || selectedCategoria === '' || urlImagen === '') {
                toast.error('Ingrese todos los campos requeridos.');
                return;
            }

            const response = await axios.post(URL + '/eventos/save', {
                artista: artista,
                fecha: fecha,
                hora: hora,
                duracion: duracion,
                imagen: urlImagen,
                ubicacion: selectedUbicacion,
                categoria: selectedCategoria
            });

            localStorage.setItem('artista', artista);
            console.log('Respuesta del servidor:', response.data);
        } catch (error) {
            console.error('Error al realizar la solicitud POST:', error);
        }
    };

    //-------------------------------------------------------------------------------------
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleArtistaChange = (event) => {
        setArtista(event.target.value);
    };

    const handlefechaChange = (event) => {
        setFecha(event.target.value);
    };

    const handlehoraChange = (event) => {
        setHora(event.target.value);
    };

    const handleduracionChange = (event) => {
        setDuracion(event.target.value);
    };

    const handleurlImagenChange = (event) => {
        setUrlImagen(event.target.value);
    };

    const handleEventoClick = () => {
        postEvento();
        openModal();
    };

    const handleCategoriaUbicacionClick = () => {
        if (category !== '') {
            postCategoria();
        }
        if (ubicacionInput !== '') {
            postUbicacion();
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="add-new-event1">
                <h2>Agregar un nuevo <span>evento</span></h2>
                <div className="first-container">
                    <h3>Información principal:</h3>
                    <div className="first-container1">
                        <label>Nombre del artista:</label>
                        <input type="text" placeholder="Nombre del artista" value={artista} onChange={handleArtistaChange} />
                    </div>
                    <div className="first-container2">
                        <div className='date-add'>
                            <label>Fecha:</label>
                            <input type="date" placeholder="Fecha" value={fecha} onChange={handlefechaChange} />
                        </div>
                        <div className='time-add'>
                            <label>Hora:</label>
                            <input type="time" placeholder="Hora" value={hora} onChange={handlehoraChange} />
                        </div>
                        <div className='duracion-add'>
                            <label>Duración:</label>
                            <input type="time" placeholder="Duración" value={duracion} onChange={handleduracionChange} />
                        </div>
                    </div>
                    <div className='first-container3'>
                        <div className="categoria-dropdown">
                            <select id="categoria" value={selectedCategoria} onChange={handleCategoriaChange}>
                                <option value="">Categoria</option>
                                {categoria.map((categoriaObj) => (
                                    <option key={categoriaObj.id} value={categoriaObj.id}>{categoriaObj.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="ubicacion-dropdown">
                            <select id="ubicacion" value={selectedUbicacion} onChange={handleUbicacionChange}>
                                <option value="">Ubicación</option>
                                {ubicacion.map((ubicacionObj) => (
                                    <option key={ubicacionObj.id} value={ubicacionObj.id}>{ubicacionObj.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="first-container4">
                        <p><b>*Si su ubicación y/o categoría no se encuentran, puede llenar los campos para agregar:</b></p>
                        <div className='first-cat'>
                            <label>Categoría:</label>
                            <input type="text" placeholder="Categoría" value={category} onChange={handleCategoryChange} />
                        </div>
                        <div className='first-ubi'>
                            <label>Ubicación:</label>
                            <input type="text" placeholder="Ubicación" value={ubicacionInput} onChange={handleUbicacionInputChange} />
                        </div>
                        <input type="submit" value="agregar" className='sub-new-e' onClick={handleCategoriaUbicacionClick} />
                    </div>
                    <div className="first-container5">
                        <label>Ingrese el URL de la imagen:</label>
                        <input type="url" name="website" id="website" value={urlImagen} onChange={handleurlImagenChange}></input>
                    </div>
                </div>
                <Link to={artista !== '' && fecha !== '' && hora !== '' && duracion !== '' && selectedUbicacion !== '' && selectedCategoria !== '' && urlImagen !== '' ? "/add-event-secondpage" : "#"}>
                    <input type="submit" value="Agregar evento" className='sub-new-ev' onClick={handleEventoClick} />
                </Link>
            </div>
        </>
    );
}

export default Addne;

