import React, { Component } from 'react';
import axios from 'axios';

class BuildYourPizza extends Component {
    constructor() {
        super();
        this.state = {
            ingredients: [],
            bases: [
                { name: 'Gluten-Free', price: 7.5 },
                { name: 'Thick Base', price: 6.5 },
                { name: 'Thin Style', price: 5.0 },
            ],
            selectedBaseIndex: null,
            selectedIngredients: [],
            total: 0,
        };
    }

    handleIngredientSelection = (index) => {
        const updatedSelected = [...this.state.selectedIngredients];
        updatedSelected[index] = !updatedSelected[index];

        const toppingsTotal = updatedSelected.reduce((sum, isSelected, idx) => {
            return isSelected ? sum + this.state.ingredients[idx].price : sum;
        }, 0);

        const baseTotal = this.state.selectedBaseIndex !== null && this.state.selectedBaseIndex !== -1
            ? this.state.bases[this.state.selectedBaseIndex].price
            : 0;

        this.setState({
            selectedIngredients: updatedSelected,
            total: toppingsTotal + baseTotal,
        });
    };

    handleBaseSelection = (index) => {
        const baseTotal = index !== -1 ? this.state.bases[index].price : 0;

        const toppingsTotal = index !== -1 ? (this.state.selectedIngredients.reduce((sum, isSelected, idx) => {
            return isSelected ? sum + this.state.ingredients[idx].price : sum;
        }, 0)) : 0;

        this.setState({
            selectedBaseIndex: index,
            total: baseTotal + toppingsTotal,
        });
    };

    handleBuildPizza = () => {
        const { selectedBaseIndex, bases, selectedIngredients, ingredients } = this.state;

        // Add the selected base to the build API payload
        if (selectedBaseIndex === null) {
            alert("Please select a base for your pizza!");
            return;
        }

        const base = {
            Name: bases[selectedBaseIndex].name,
            Image: "https://media.istockphoto.com/id/1227621205/photo/pizza-dough-isolated-on-white-background-cooking-process-step-by-step-top-view.jpg?s=2048x2048&w=is&k=20&c=rxYm7-3QHNu-Q9Y_Dw4vDlt4d0lClPzaHgKF7lphrKo=", // Add an image URL for the base if available
            Price: bases[selectedBaseIndex].price,
            Quantity: 1,
        };

        // Add the selected ingredients to the build API payload
        const selectedToppings = selectedIngredients
            .map((isSelected, idx) => {
                if (isSelected) {
                    const ingredient = ingredients[idx];
                    return {
                        Name: ingredient.tname,
                        Image: ingredient.Image,
                        Price: ingredient.price,
                        Quantity: 1,
                    };
                }
                return null;
            })
            .filter((item) => item !== null);

        // Combine base and toppings into a single payload
        const payload = [base, ...selectedToppings];

        // Send the payload to the BuildPizza API
        axios.post("http://localhost:8080/build", payload)
            .then((res) => {
                console.log("Build API response:", res);
                alert("Pizza built successfully!");
                this.props.history.push("/Cart"); // Navigate to the Cart page
            })
            .catch((err) => {
                console.error("Error building pizza:", err);
                alert("Failed to build pizza. Please try again.");
            });
    };

    componentDidMount() {
        axios.get('http://localhost:8080/getingredients')
            .then((res) => {
                this.setState({
                    ingredients: res.data,
                    selectedIngredients: Array(res.data.length).fill(false),
                });
            })
            .catch((err) => console.error(err));
    }

    render() {
        return (
            <div className="py-4">
                {/* Heading */}
                <div className="row mb-4 mt-2">
                    <div className="col text-center">
                        <h3 className="fw-bold text">Build Your Own Pizza</h3>
                        <p className="text-muted">
                            Customize your pizza by choosing ingredients from the list below
                        </p>
                        <hr className="w-25 mx-auto" />
                    </div>
                </div>

                <h5 className="container fw-bold text-success text mb-4">Choose Your Pizza Base</h5>
                <div className="container mb-5">
                    <div className="row justify-content-center">
                        <div className="col-12 mx-2">
                            <div className="input-group shadow-sm rounded border p-2">
                                <select
                                    className="form-select border-0"
                                    id="baseSelect"
                                    value={this.state.selectedBaseIndex}
                                    onChange={(e) => this.handleBaseSelection(parseInt(e.target.value))}
                                >
                                    <option value="-1">-- Select a Base --</option>
                                    {this.state.bases.map((base, index) => (
                                        <option key={index} value={index}>
                                            {base.name} (+${base.price.toFixed(2)})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <h5 className="container fw-bold text-success text mb-4">Select toppings</h5>
                {/* Card Grid for Ingredients */}
                <div className="container">
                    <div className="row">
                        {this.state.ingredients.map((ingredient, index) => (
                            <div className="col-md-3 mb-4" key={index}>
                                <div className={`card h-80 shadow-sm ${this.state.selectedIngredients[index] ? 'border-success' : ''}`}>
                                    <img
                                        src={ingredient.Image}
                                        alt={ingredient.tname}
                                        className="card-img-top"
                                        style={{ height: '150px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <h5 className="card-title">{ingredient.tname}</h5>
                                        <p className="card-text text-muted mb-2">
                                            Price: ${ingredient.price.toFixed(2)}
                                        </p>
                                        <div className="form-check text-start">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={`ingredient-${index}`}
                                                checked={this.state.selectedIngredients[index]}
                                                onChange={() => this.handleIngredientSelection(index)}
                                            />
                                            <label className="form-check-label" htmlFor={`ingredient-${index}`}>
                                                Add to Pizza
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Total & Button */}
                <div className="row mt-4 justify-content-center">
                    <div className="col-md-6 d-flex justify-content-between align-items-center">
                        <h5>Total: <span className="text-primary">${this.state.total.toFixed(2)}</span></h5>
                        <button
                            className="btn btn-success"
                            onClick={this.handleBuildPizza}
                        >
                            Build Your Pizza
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BuildYourPizza;
