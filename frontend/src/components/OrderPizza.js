import React, { Component } from 'react';
import axios from 'axios';

export default class OrderPizza extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pizzas: [],
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/getmenu")
            .then((response) => {
                this.setState({ pizzas: response.data });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    handleAddToCart = (pizza) => {
        axios.post("http://localhost:8080/addtocart", { ...pizza, Quantity: 1 })
            .then(() => alert("Item Added Successfully"))
            .catch((err) => console.error(err));
    };

    render() {
        return (
            <div className="py-4">
                {/* Heading section */}
                <div className="row mb-4 mt-2">
                    <div className="col text-center">
                        <h3 className="fw-bold text">Choose Your Favorite Pizza</h3>
                        <hr className="w-25 mx-auto" />
                    </div>
                </div>
    
                {/* Pizza Cards Grid */}
                <div className="container">
                    <div className="row g-4 justify-content-center">
                        {this.state.pizzas.map((pizza, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={pizza.Image}
                                        className="card-img-top"
                                        alt={pizza.name}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h5 className="card-title mb-0">{pizza.name}</h5>
                                            <div
                                                style={{
                                                    height: "14px",
                                                    width: "14px",
                                                    borderRadius: "50%",
                                                    backgroundColor: pizza.type === "veg" ? "green" : "red",
                                                }}
                                                title={pizza.Type}
                                            ></div>
                                        </div>
                                        <h6 className="text-success">${pizza.price}</h6>
                                        <p className="card-text">{pizza.description}</p>
                                        <p className="mb-1"><strong>Ingredients:</strong> {pizza.ingredients.join(', ')}</p>
                                        <p><strong>Toppings:</strong> {pizza.topping.join(', ')}</p>
                                    </div>
                                    <div className="card-footer bg-white border-0">
                                        <button
                                            className="btn btn-success w-100"
                                            onClick={() => this.handleAddToCart(pizza)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    
}
