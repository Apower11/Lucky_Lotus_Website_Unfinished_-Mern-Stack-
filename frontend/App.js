import React from "react";
import Navbar from "./shared/UIElements/Navbar";
import Footer from "./shared/UIElements/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Reviews from "./pages/Reviews";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.css";

function App() {
  const { token, login, logout, user } = useAuth();

  let routes;

  routes = token ? (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/about" exact>
        <About />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/reviews">
        <Reviews />
      </Route>
      <Route path="/menu">
        <Menu />
      </Route>
      <Redirect to="/" />
    </Switch>
  ) : (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/about" exact>
        <About />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/reviews">
        <Reviews />
      </Route>
      <Route path="/menu">
        <Menu />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        user: user,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <Navbar />
        <main>{routes}</main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
