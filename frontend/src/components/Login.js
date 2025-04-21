import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            Password: ''
        };
        this.changename = this.changename.bind(this);
        this.changepwd = this.changepwd.bind(this);
        this.changeSubmit = this.changeSubmit.bind(this);
    }

    changename(event) {
        this.setState({
            Name: event.target.value
        });
    }

    changepwd(event) {
        this.setState({
            Password: event.target.value
        });
    }

    changeSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8080/login', {
            Password: this.state.Password,
            Name: this.state.Name,
        }, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => {
                if (res.data.data === 1) {
                    this.props.authContext.login(); // context login
                    this.props.history.push("/Homes");
                } else {
                    alert("Invalid Username or password");
                    this.props.history.push("/Login");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Invalid Username or password");
                this.props.history.push("/Login");
            });
    }

    render() {
        return (
            <div style={{ margin: '130px'}}>
                <div style={{ width: '55%', margin: 'auto' }}>
                    <br />
                    <h2 align='center'>Ready for More Pizza? 🔥</h2>
                    <br />
                    <form onSubmit={this.changeSubmit}>
                        <div className='form-group row'>
                            <label htmlFor="name" className="col-sm-2 col-form-label">Username</label>
                            <div className='col-sm-9'>
                                <input type="text" className="form-control" name='Name' id="Name" placeholder="Enter Username" value={this.state.Name} onChange={this.changename} required />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                            <div className='col-sm-9'>
                                <input type="password" className="form-control" name='Password' id="Password" placeholder="Enter Password" value={this.state.Password} onChange={this.changepwd} required />
                            </div>
                        </div>
                        <br />
                        <center>
                            <button type="submit" className="btn btn-success btn-xs">Login</button>
                        </center>
                    </form>
                    <div>
                        For New User <Link to='/Register' className="text-success">Registration</Link>
                    </div>
                </div>
            </div>
        );
    }
}

// Inject AuthContext into the class component
const LoginWithContext = (props) => (
    <AuthContext.Consumer>
        {(authContext) => <Login {...props} authContext={authContext} />}
    </AuthContext.Consumer>
);

export default withRouter(LoginWithContext);
