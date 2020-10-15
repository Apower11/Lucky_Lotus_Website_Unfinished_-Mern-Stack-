import React, { useState, useContext } from "react";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";
import Button from "./Button";
import ErrorModal from "./ErrorModal";
import LoadingSpinner from "./LoadingSpinner";
import Modal from "./Modal";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import { useAuth } from "../hooks/auth-hook";
import "./css/Navbar.css";

const Navbar = (props) => {
  const auth = useContext(AuthContext);
  const { login } = useAuth();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMode, setLoginMode] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const toggleLoginMode = () => {
    setLoginMode(!loginMode);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (loginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/one/login",
          "POST",
          JSON.stringify({
            email,
            password,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        login(responseData.user._id, responseData.user, responseData.token);
        window.location.href = '/';
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/one/register",
          "POST",
          JSON.stringify({
            fullName,
            email,
            password,
            confirmPassword,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        login(responseData.user._id, responseData.user, responseData.token);
        window.location.href = '/';
      } catch (err) {}
    }
    setShowLoginModal(false);
  };

  const logoutHandler = async (event) => {
    event.preventDefault();
    auth.logout();
    window.location.href = '/';
  }

  const errorModalCancelHandler = async (event) => {
    event.preventDefault();
    clearError();
    setShowLoginModal(true);
  }

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <NavLinks mode="sideDrawer" />
      </SideDrawer>
      <ErrorModal error={error} onClear={errorModalCancelHandler} />
      <Modal
        className={`login-modal ${!showLoginModal && "modal-close"}`}
        contentClass="login-modal__content"
        action={'/about'}
        onSubmit={authSubmitHandler}
        show={showLoginModal}
        onCancel={closeLoginModal}
        header={loginMode ? "Login" : "Register"}
        footer={
          <React.Fragment>
            <h3>
              {loginMode
                ? "Haven't got an account yet?"
                : "Already got an account?"}
            </h3>
            <h4 onClick={toggleLoginMode}>
              {loginMode ? "Register Here" : "Login Here"}
            </h4>
          </React.Fragment>
        }
      >
        {isLoading && <LoadingSpinner asOverlay />}
        {loginMode && (
          <input
            className="authentication-input"
            type="text"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        {!loginMode && (
          <input
            className="authentication-input"
            type="text"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        {!loginMode && (
          <input
            className="authentication-input"
            type="text"
            placeholder="Full Name"
            onChange={(e) => setFullName(e.target.value)}
          />
        )}
        <input
          className="authentication-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {!loginMode && (
          <input
            className="authentication-input"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <Button type="submit">
          {loginMode ? "Login" : "Register"}
        </Button>
      </Modal>

      <div className={`navbar`}>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1>Lucky Lotus</h1>
        <NavLinks mode="navbar" />
        <Button className="login-button" onClick={auth.isLoggedIn ? logoutHandler : toggleLoginModal}>
          {auth.isLoggedIn ? "Logout" : "Login"}
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
