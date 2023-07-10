import React, { useEffect, useState, useContext } from 'react';
import Navbar2 from "../components/navbar2.jsx";
import ShowInfo from "../components/showInfo.jsx";
import axios from 'axios'
import { UserContext } from '../UserContext';


function InfoPage(props) {

    const [id, setId] = useState('')
    const [artista, setArtista] = useState('')
    const [image, setImage] = useState('')
    const [fecha, setFecha] = useState('')
    const [ubi, setUbi] = useState('')
    const [hora, setHora] = useState('')
    const [duracion, setDuracion] = useState('')
    const [cat, setCat] = useState('')
    const [image2, setImage2] = useState('')
    const [patro, setPatro] = useState('')
    const [rol, setRol] = useState(false);

    const [localidades, setLocalidades] = useState([])

    useEffect(() => {

        getfields();

    }, []);

    const { URL } = useContext(UserContext);

    //const { artista, image, fecha, ubi, hora, duracion, cat, image2, patro } = props.location.state.event;

    const getfields = async () => {

        try {

            const response =  await axios.get(URL + '/eventos/one?artista=' + localStorage.getItem('artista'));

            console.log(response)

            setId(response.data.id);
            setArtista(response.data.artista);
            setImage(response.data.imagen);
            const date = new Date(response.data.fecha).toISOString().split('T')[0];
            setFecha(date);
            setUbi(response.data.ubicacion.nombre);

            const time = response.data.hora.slice(0, 5);
            setHora(time);

            const duration = response.data.duracion.slice(0, 5);
            setDuracion(duration);
            setCat(response.data.categoria.nombre);
            setImage2(response.data.imagenlocalidades);
            setPatro(response.data.patrocinadores);

        } catch (error) {
            console.error('Error al realizar la solicitud GET:', error);
        }
    }

    return (
    <>
        <Navbar2 />
        <ShowInfo
        id={id}
        artista={artista}
        image={image}
        fecha={fecha}
        ubi={ubi}
        localidades={localidades}
        hora={hora}
        duracion={duracion}
        cat={cat}
        image2={image2}
        patro={patro}
        />
    </>
    );
}

export default InfoPage;