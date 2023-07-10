import React, { useEffect, useState, useContext } from 'react';
import Navbar2 from '../components/navbar2.jsx';
import Presentation from '../components/presentation.jsx';
import Cartelera from '../components/cartelera.jsx';
import Footer from '../components/footer.jsx';
import '../stylesheets/example.css';
import axios from 'axios';
import { UserContext } from '../UserContext.js';
import { useNavigate } from 'react-router-dom';

function Home() {
    const { user } = useContext(UserContext);
    const { rol } = useContext(UserContext);

    const [showCount, setShowCount] = useState(6);
    const [isLineVisible, setIsLineVisible] = useState(true);
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    const { URL } = useContext(UserContext);

    useEffect(() => {

        console.log(rol)

        axios.get(URL + '/eventos/all')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error al obtener la lista de eventos:', error);
            });
    }, []);

    const navigate = useNavigate();

    const handleShowInfo = (eventId) => {
        // Redirige a la página InfoPage con el ID del evento como parámetro en la URL
        navigate(`/home/info-page/${eventId}`);
    };

    const handleLoadMore = () => {
        setShowCount(6);
        setIsLineVisible(showCount + 6 < events.length);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <Navbar2 searchTerm={searchTerm} onSearch={handleSearch} />
            <Presentation />
            <div className="contenedor-shows-todo">
                <h1 className="titulo">Eventos próximos...</h1>
                <div className="contenedor-solo-shows">
                    {events.slice(0, showCount).map((item) => (
                        <Cartelera
                            key={item.id}
                            image={item.imagen}
                            artista={item.artista}
                            fecha={item.fecha}
                            ubi={item.ubicacion}
                            evento={item}
                        />
                    ))}
                </div>
                <div className="contenedor-btn">
                    {isLineVisible && <div className="horizontal-line"></div>}
                    {showCount < events.length && (
                        <div className="button-wrapper">
                            <button className="boton-mas" onClick={handleLoadMore}>
                                Cargar más eventos
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;