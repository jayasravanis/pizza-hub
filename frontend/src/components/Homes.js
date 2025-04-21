import React from 'react';
import IngredientsLogo from '../images/ingredients.png';
import ChefLogo from '../images/chef.png';
import TimeLogo from '../images/timer.png';

export default class Homes extends React.Component {
    render() {
        return (
            <div>
                <div className="hero-section d-flex flex-column align-items-center justify-content-center text-white text-center" style={{
                    height: '100vh',
                    backgroundImage: 'url(https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    padding: '40px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.65)',
                        padding: '50px 40px',
                        borderRadius: '20px',
                        maxWidth: '850px',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
                    }}>
                        <h1 className="display-4 fw-bold mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            Fresh. Fast. Fired to Perfection.
                        </h1>
                        <p className="lead mb-4" style={{ fontSize: '1.2rem', color: '#f1f1f1' }}>
                            Handcrafted pizzas, delivered hot and fresh. Get yours in just 30 minutes!
                        </p>
                        <a href="/OrderPizza" className="btn btn-success btn-lg fw-semibold px-5 py-2 rounded-pill mb-4">
                            Order Now
                        </a>

                        {/* Highlights Row */}
                        <div className="d-flex flex-column flex-md-row justify-content-center gap-4 mt-2">
                            <div className="d-flex flex-column align-items-center px-3">
                                <img src={IngredientsLogo} alt="Fresh Ingredients" style={{ height: '60px' }} className="mb-2" />
                                <h6 className="fw-bold text-white mb-1">Fresh Ingredients</h6>
                                <p className="small text-white-50 text-center" style={{ maxWidth: '180px' }}>
                                    Peak-season produce and top-tier cheese—nothing but the best.
                                </p>
                            </div>
                            <div className="d-flex flex-column align-items-center px-3">
                                <img src={ChefLogo} alt="Master Chefs" style={{ height: '60px' }} className="mb-2" />
                                <h6 className="fw-bold text-white mb-1">Master Chefs</h6>
                                <p className="small text-white-50 text-center" style={{ maxWidth: '180px' }}>
                                    Trained chefs tossing dough and crafting every slice like art.
                                </p>
                            </div>
                            <div className="d-flex flex-column align-items-center px-3">
                                <img src={TimeLogo} alt="Fast Delivery" style={{ height: '60px' }} className="mb-2" />
                                <h6 className="fw-bold text-white mb-1">30 Min Delivery</h6>
                                <p className="small text-white-50 text-center" style={{ maxWidth: '180px' }}>
                                    Lightning-fast delivery. From oven to your doorstep in no time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
