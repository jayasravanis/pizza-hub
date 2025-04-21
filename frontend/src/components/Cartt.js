import React from 'react';
import axios from 'axios';
import CheckLogin from './CheckLogin';
import { Link } from 'react-router-dom';
import './Cartt.css'; // Style file for Cartt page

export default class Cartt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/retrivetocart")
            .then((response) => {
                this.setState({ cart: response.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleLogout = () => {
        axios.get("http://localhost:8080/logout")
            .then(() => {
                // Assuming `logout` is a function to clear user session
                this.props.history.push("/Homes");
            })
            .catch(err => console.error(err));
    };

    render() {
        return (
            <div className="cartt-container">
                {this.state.cart && this.state.cart.length > 0 ? (
                    <div className="cartt-content">
                        <h1 className="cartt-heading">🍕 Your pizza is in the oven—get ready to indulge!!</h1>
                        <p className="cartt-message">Sit back and relax while your hot & cheesy pizza makes its way to you.</p>
                        <Link to="/OrderPizza" className="btn btn-success text cartt-back-btn">Back to Menu</Link>
                        <button onClick={this.handleLogout} className="btn btn-outline-secondary text-dark cartt-back-btn mx-2">Logout</button>
                    </div>
                ) : (
                    <div className="cartt-empty">
                        <h2>No items in cart to checkout 😕</h2>
                        <Link to="/OrderPizza" className="btn btn-outline-secondary text-dark cartt-back-btn">Go to Menu</Link>
                    </div>
                )}
            </div>
        );
    }
}
