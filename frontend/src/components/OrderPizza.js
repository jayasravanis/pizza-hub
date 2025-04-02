import React, { Component } from 'react';
import axios from 'axios';

export default class OrderPizza extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pizzas: [], // Changed variable name to pizzas for better readability
        };
    }

    componentDidMount() {
        // Fetch pizza menu from the server upon component mount
        axios.get("http://127.0.0.1:5000/getmenu")
            .then((response) => {
                console.log(response.data);
                this.setState({
                    pizzas: response.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                {/* Iterate over pizzas and render each one */}
                <div className='row' style={{ margin: '30px', border: '1px solid yellow', backgroundColor: 'lightcyan' }}>
                    {this.state.pizzas.map(pizza => (
                        <div className="col-md-10" style={{ marginLeft: '70px', marginTop: '30px', border: '1px solid orange', backgroundColor: 'white' }}>
                            <div class='container' style={{ alignItems: 'center', textAlign: "left" }}>
                                <div class='content'>
                                    <h6>{pizza.name}</h6>
                                    {/* Use a colored dot to indicate if the pizza is vegetarian or not */}
                                    <div style={{ height: "15px", width: "15px", backgroundColor: (pizza.Type === "veg") ? "green" : "red" }}></div>
                                    <h6>${pizza.price}</h6>
                                </div>

                                <div className="details">
                                    <p>{pizza.description}</p>
                                    <p><b>Ingredients:</b> {pizza.ingredients.join(', ')}</p>
                                    <p><b>Toppings:</b> {pizza.topping.join(', ')}</p>
                                </div>

                                <div class="order-image">
                                    <img src={pizza.Image} className="img-fluid" alt='Pizza Logo' style={{ height: "150px", width: '150px' }} />
                                    <div class="d-grid gap-2 d-md-flex ml-auto" style={{ margin: "10px" }}>
                                        {/* Button to add the pizza to the cart */}
                                        <button type="button" class="btn btn-success" onClick={() => {
                                            axios.post("http://localhost:5000/addtocart", { ...pizza, 'Quantity': 1 })
                                                .then((response) => {
                                                    alert("Item Added Successfully");
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                });
                                        }}>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
