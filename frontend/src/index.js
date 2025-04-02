import React from 'react';
import ReactDOM from 'react-dom/client';  // ✅ Import from 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homes from './components/Homes';
import BuildUrPizza from './components/BuildUrPizza';
import Login from './components/Login';
import Register from './components/Register';
import CheckLogin from './components/CheckLogin';

const root = ReactDOM.createRoot(document.getElementById('root'));  // ✅ Use createRoot
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
            <Routes>
                <Route path="/" element={<Navigate to="/Homes" />} />
                <Route path="/Homes" element={<Homes />} />
                <Route path="/BuildUrPizza" element={<BuildUrPizza />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/CheckLogin" element={<CheckLogin />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
