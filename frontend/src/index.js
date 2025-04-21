import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Homes from './components/Homes';
import OrderPizza from './components/OrderPizza';
import BuildUrPizza from './components/BuildUrPizza';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import Cartt from './components/Cartt';
import CheckLogin from './components/CheckLogin';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './AuthContext';

ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <App />
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/Homes" />} />
                <Route path="/Login" component={Login} />
                <Route path="/Register" component={Register} />
                <Route path="/Homes" component={Homes} />
                <ProtectedRoute path="/OrderPizza" component={OrderPizza} />
                <ProtectedRoute path="/BuildUrPizza" component={BuildUrPizza} />
                <ProtectedRoute path="/Cart" component={Cart} />
                <ProtectedRoute path="/Cartt" component={Cartt} />
                <ProtectedRoute path="/CheckLogin" component={CheckLogin} />
            </Switch>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

reportWebVitals();
