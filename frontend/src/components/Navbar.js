import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import logo from '../images/pizza_ordering_platform.png';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const Navbar = (props) => {
    const { isLoggedIn, logout } = useContext(AuthContext);

    const handleLogout = () => {
        axios.get("http://localhost:8080/logout")
            .then(() => {
                logout();
                props.history.push("/Homes");
            })
            .catch(err => console.error(err));
    };

    const handleNavigate = (path) => props.history.push(path);

    return (
        <nav className="navbar navbar-expand-lg navbar-light px-3" style={{ background: '#e8f5e9', boxShadow: '0 2px 6px rgba(0,0,0,0.08)', borderBottom: '1px solid #dfece6' }}>
            <a className="navbar-brand d-flex align-items-center" href="./Homes">
                <img src={logo} alt="Logo" height="40" className="d-inline-block align-top me-2" />
                <span className="fw-bold fs-5 text-success">Pizza-Hub</span>
            </a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-4">
                    {isLoggedIn && (
                        <>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-dark" onClick={() => handleNavigate("/OrderPizza")}>Order Pizza</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-dark" onClick={() => handleNavigate("/BuildUrPizza")}>Build Your Own</button>
                            </li>
                        </>
                    )}
                </ul>

                <div className="d-flex align-items-center gap-2">
                    {isLoggedIn ? (
                        <>
                            <button className="btn btn-success d-flex align-items-center" onClick={() => handleNavigate("/Cart")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart me-2" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
                                Cart</button>
                            <button className="btn btn-outline-success" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-outline-success" onClick={() => handleNavigate("/Login")}>Login</button>
                            <button className="btn btn-outline-success" onClick={() => handleNavigate("/Register")}>Register</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default withRouter(Navbar);
