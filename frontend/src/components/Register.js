import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            mob: '',
            password: '',
            email: ''
        };

        this.changename = this.changename.bind(this);
        this.changeemail = this.changeemail.bind(this);
        this.changemob = this.changemob.bind(this);
        this.changepassword = this.changepassword.bind(this);
        this.changeSubmit = this.changeSubmit.bind(this);
    }

    changename(event) {
        this.setState({ name: event.target.value });
    }

    changeemail(event) {
        this.setState({ email: event.target.value });
    }

    changemob(event) {
        this.setState({ mob: event.target.value });
    }

    changepassword(event) {
        this.setState({ password: event.target.value });
    }

    changeSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8080/register', {
            mob: this.state.mob,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        })
            .then((res) => {
                console.log(res);
                alert("You have successfully registered " + this.state.name);
                this.props.history.push("/Login");
            })
            .catch((err) => {
                console.log(err);
                alert("Registration failed");
            });
    }

    render() {
        return (
            <div style={{ margin: '130px' }}>
                <div style={{ width: '55%', margin: 'auto' }}>
                    <br />
                    <h2 align='center'>
                        Join the Pizza Party! 🎉
                    </h2>
                    <br />
                    <form onSubmit={this.changeSubmit}>
                        <div className='form-group row'>
                            <label htmlFor="name" className="col-sm-2 col-form-label">Username</label>
                            <div className='col-sm-9'>
                                <input type="text" className="form-control" id="name" placeholder="Enter Username" value={this.state.name} onChange={this.changename} required />
                            </div>
                        </div>
                        <br />
                        <div className='form-group row'>
                            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                            <div className='col-sm-9'>
                                <input type="email" className="form-control" id="email" placeholder="Enter Your Email" value={this.state.email} onChange={this.changeemail} required />
                            </div>
                        </div>
                        <br />
                        <div className='form-group row'>
                            <label htmlFor="mobile" className="col-sm-2 col-form-label">Mobile</label>
                            <div className='col-sm-9'>
                                <input type="text" className="form-control" id="mobile" placeholder="Enter Mobile Number" value={this.state.mob} onChange={this.changemob} required />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                            <div className='col-sm-9'>
                                <input type="password" className="form-control" id="password" placeholder="Enter Password" value={this.state.password} onChange={this.changepassword} required />
                            </div>
                        </div>
                        <br />
                        <center>
                            <button type="submit" className="btn btn-success btn-xs">Register</button>
                        </center>
                    </form>
                    <div>
                        Existing User? <Link to='/Login' className="text-success">Login</Link>
                    </div>
                </div>
            </div>
        );
    }
}

// Inject AuthContext into the class component
const RegisterWithContext = (props) => (
    <AuthContext.Consumer>
        {(authContext) => <Register {...props} authContext={authContext} />}
    </AuthContext.Consumer>
);

export default withRouter(RegisterWithContext);
