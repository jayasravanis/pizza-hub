import React from 'react';
import axios from 'axios';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);

        // Initialize state
        this.state = {
            cart: [], // Array to store cart items
            sum: 0, // Total sum of prices
            min: 0, // Minimum value
            itemsList: '' // String to store items list
        };
    }

    // Fetch cart items from server when component mounts
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
    }

    // Function to calculate total price of items in cart
    totalPrice = () => {
        if (this.state.cart) {
            let temp = 0;
            // Loop through cart items and calculate total price
            for (let i = 0; i < this.state.cart.length; i++) {
                temp += this.state.cart[i].price * this.state.cart[i].quantity;
            }
            return temp;
        } else {
            return 0;
        }
    }

    render() {
        // Render cart items
        let op;
        if (this.state.cart !== null) {
            op = this.state.cart.map((pizza, index) => {
                return (
                    <tr key={index}>
                        <td><img src={pizza.Image} style={{ height: '30px', width: '30px' }} alt="Pizza" /></td>
                        <td>{pizza.name}</td>
                        <td>&nbsp;&nbsp;{pizza.quantity}&nbsp;&nbsp;</td>
                        <td>{pizza.quantity * pizza.price}</td>
                        <td>
                            <button className="btn btn-warning" onClick={() => {
                                // Delete item from cart
                                axios.post("http://localhost:5000/deletefromcart", pizza)
                                    .then((response) => {
                                        alert("Item deleted from cart successfully");
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            }}>
                                Delete Item
                            </button>
                        </td>
                    </tr>
                );
            });
        } else {
            op = <div><h1>Nothing in the Cart!</h1></div>;
        }

        return (
            <div style={{ margin: '70px', textAlign: "center", border: '1px solid yellow' }}>
                <br />
                <h1>Order your Pizza Cart</h1>

                <div className='row' style={{ margin: '50px' }} >
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {op}
                        </tbody>
                    </table>
                    <div className='Bill' style={{ textAlign: 'left' }}>
                        <h2>Bill:</h2>
                        <hr />
                        <h6>Order Pizza: ${this.totalPrice()}</h6>
                        <h6>Total Cart: ${this.totalPrice()}</h6>
                    </div>

                    <div>
                        <br />
                        <button className="btn btn-warning" style={{ marginLeft: '450px' }} onClick={() => {
                            this.props.history.push('./Cartt');
                        }}>
                            Check Out
                        </button>
                        &nbsp;
                        <button className="btn btn-warning" style={{ marginLeft: '450px' }} onClick={() => {
                            this.props.history.push('./OrderPizza');
                        }}>
                            Menu
                        </button>
                    </div>
                    &nbsp;
                </div>
            </div>
        );
    }
}
