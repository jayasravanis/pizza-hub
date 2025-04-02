import React from 'react';
import axios from 'axios';
import CheckLogin from './CheckLogin'; // Assuming this is a component to check login status

export default class Cartt extends React.Component {
    constructor(props) {
        super(props);

        // Initialize state
        this.state = {
            cart: [] // Array to store cart items
        };
    }

    // Fetch cart items from the server when component mounts
    componentDidMount() {
        axios.get("http://localhost:5000/retrivetocart")
            .then((response) => {
                console.log(response);
                // Update state with fetched cart items
                this.setState({
                    cart: response.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        // Check if cart is not empty
        if (this.state.cart !== null) {
            return (
                <div className='cartt-main-container'>
                    <h1 style={{ textAlign: 'center' }}>Hey Foodie, Order placed successfully!! </h1>
                    {/* Component to check login status */}
                    <CheckLogin />
                </div>
            );
        } else { // If cart is empty
            return (
                <div>
                    <h1>Nothing in Cart to CheckOut</h1>
                    <button className="btn btn-warning" style={{ marginLeft: '450px' }} onClick={() => {
                        // Redirect to menu page
                        this.props.history.push('./OrderPizza');
                    }}>
                        Menu
                    </button>
                </div>
            );
        }
    }
}
