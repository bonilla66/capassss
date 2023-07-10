import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import Home from './pages/home';
import InfoPage from './pages/info';
import Comprar from './pages/comprar';
import EventosIndiv from './pages/eventosIndiv';
import Roles from './pages/roles';
import Eventoeditar from './pages/editevento';
import Addnewevent from './pages/addnewevent';
import Stadistics from './pages/stadistics';
import Login from './pages/login';
import Addnewevent2 from './pages/addnew2';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';


function App() {
  return (
    <UserProvider>
      <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/info-page" element={<InfoPage />} />
            <Route path="/info-page/buy-page" element={<Comprar />} />
            <Route path="/home/each-one" element={<EventosIndiv />} />
            <Route path="/home/eventos-usuarios" element={<Roles />} />
            <Route path="/info-page/edit-show" element={<Eventoeditar />} />
            <Route path="/home/add-event" element={<Addnewevent />} />
            <Route path="/add-event-secondpage" element={<Addnewevent2 />} />
            <Route path="/home/stadistics" element={<Stadistics />} />
            <Route path="/home/info-page/edit-show/info-page" element={<InfoPage />} />
      </Routes>
    </UserProvider>
  );
}

export default App;

