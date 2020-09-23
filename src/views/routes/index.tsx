import React, { Component } from "react";
import { isAuthenticated } from "../../auth";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { toast } from "react-toastify";

// import history from "../../history";

import NotFound from "../pages/NotFound";
import UnderConstruction from "../pages/UnderConstruction";
import Dashboard from "../pages/Dashboard";
//Usuários
import Login from "../pages/Login";
import Users from "../pages/Administrator/Users";
import User from "../pages/User";

toast.configure({
  autoClose: 15000,
  draggable: true,
});

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/Login", state: { from: props.location } }}
        />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/Login" exact component={Login} />

          {/* Rotas que necessitam de autenticação */}
          <PrivateRoute path="/" exact component={Dashboard} />
          <PrivateRoute path="/Home" component={Dashboard} />
          <PrivateRoute path="/Profile/:username" component={Dashboard} />
          <PrivateRoute path="/Administrator/Users" component={Users} />
          <PrivateRoute path="/User" component={User} />

          {/* Not Found Page (Mantenha essa rota na ultima rota) */}
          <Route path="/SobConstrucao" component={UnderConstruction} />
          {/* Not Found Page (Mantenha essa rota na ultima rota) */}
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
