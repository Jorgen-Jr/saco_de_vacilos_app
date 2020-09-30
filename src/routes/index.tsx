import React, { Component } from "react";
import { isAuthenticated } from "../../auth";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { toast } from "react-toastify";

// import history from "../../history";

import NotFound from "../pages/notfound";
import UnderConstruction from "../pages/underconstruction";
import Dashboard from "../pages/Dashboard";
//Usuários
import Login from "../pages/login";
import Users from "../pages/administrator/Users";
import User from "../pages/user";

import { ThemeProvider, CSSReset } from "@chakra-ui/core";

toast.configure({
  autoClose: 15000,
  draggable: true,
});

const PrivateRoute: React.FC = ({ component: Component, ...rest }) => (
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
      <ThemeProvider>
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
      </ThemeProvider>
    );
  }
}
export default App;
