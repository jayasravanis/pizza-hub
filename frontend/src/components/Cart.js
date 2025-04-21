import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Cart.css'; // Import CSS for styling

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            sum: 0,
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
    }

    totalPrice = () => {
        return this.state.cart!=null ? this.state.cart.reduce((total, item) => total + (item.price * item.quantity), 0) : 0;
    };

    handleRemove = (pizza) => {
        axios.post("http://localhost:8080/deletefromcart", pizza)
            .then(() => {
                this.setState(prevState => ({
                    cart: prevState.cart.filter(item => item !== pizza),
                }));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleCheckout = () => {
        axios.post("http://localhost:8080/clearcart")
            .then(() => {
                this.setState({ cart: [] }); // Clear the cart in the frontend
                alert("Checkout successful! Your cart has been cleared.");
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to complete checkout. Please try again.");
            });
    };

    render() {
        const taxRate = 0.1; // 10% tax
        const deliveryFee = 5; // Flat delivery fee
        const subtotal = this.totalPrice();
        const tax = subtotal * taxRate;
        const total = subtotal + tax + deliveryFee;

        return (
            <div className="cart-page">
                <header className="cart-header">
                    <div className="hero-banner">
                        <h1>Place your order now</h1>
                    </div>
                </header>

                <div className="cart-main-content">
                    <div className="cart-items">
                        {this.state.cart == null || this.state.cart.length === 0 ? (
                            <h2>Your cart is empty!</h2>
                        ) : (
                            this.state.cart.map((pizza, index) => (
                                <div key={index} className="cart-item-card">
                                    <img src={pizza.Image} alt={pizza.name} className="pizza-img" />
                                    <div className="item-details">
                                        <h5>{pizza.name}</h5>
                                        <p>Price: ${pizza.price}</p>
                                        <p>Quantity: {pizza.quantity}</p>
                                        <p>Total: ${pizza.price * pizza.quantity}</p>
                                    </div>
                                    <button className="btn btn-danger" onClick={() => this.handleRemove(pizza)}>
                                        Remove
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="cart-summary">
                        <div className="summary-card">
                            <h2>Summary</h2>
                            <hr />
                            <p><strong>Subtotal: </strong>${subtotal.toFixed(2)}</p>
                            <p><strong>Tax (10%): </strong>${tax.toFixed(2)}</p>
                            <p><strong>Delivery Fee: </strong>${deliveryFee.toFixed(2)}</p>
                            <hr />
                            <p><strong>Total: </strong>${total.toFixed(2)}</p>
                            <Link to="/Cartt">
                                <button className="btn btn-success" onClick={this.handleCheckout}>Checkout</button>
                            </Link>
                            <Link to="/OrderPizza">
                                <button className="btn btn-outline-secondary mx-2">Back to Menu</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
