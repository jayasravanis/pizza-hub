import React from 'react';
import Logo from '../images/pizza_ordering_platform.png';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const handleClick = () => navigate('/Cart');

    const handlemouse = () => {
        <img src={Logo} alt="Logo" />
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light"> &nbsp;
                <a className="navbar-brand" href="./Homes">Grab Your Pizza</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <a className="nav-item active" href="./Homes">
                            <img src={Logo} style={{ width: 60, height: 50, marginTop: -5 }} alt="Logo" />
                        </a>
                        <li className="nav-item">
                            <a className="nav-link" href="./OrderPizza">Order Pizza</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="./BuildUrPizza">Build Ur Pizza</a>
                        </li>
                    </ul>
                </div>
                <div className="a">
                    <button type="button" className="btn btn-warning" data-toggle="tooltip" data-placement="bottom" title="Shopping Cart" onClick={handleClick} onMouseOver={handlemouse}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg> Shopping Cart
                    </button>
                </div> &nbsp;
            </nav>
        </div>
    );
}
