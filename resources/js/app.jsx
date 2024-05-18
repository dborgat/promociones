import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Offers from './components/Offers';
//import Register from './components/Register';
import Home from './components/Home';

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <h1>ASDASDASDAaSD</h1>
        <Router>
            <Routes>
                {/* <Route path="/" element={<Register />} /> */}
                <Route path="/" element={<Home />} />
                <Route path="/offers" element={<Offers />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
