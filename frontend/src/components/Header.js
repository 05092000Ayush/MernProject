import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "../from/Login";
import Registration from "../from/Registration";
import { useNavigate } from "react-router-dom";
function Header() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);
  const navigate = useNavigate();

  const handleRegistrationClick = () => {
    navigate('/registration')
    // setShowRegistration(true);
    // setShowLogin(false);
  };

  const handleLoginClick = () => {
    navigate('/login')
    //setShowLogin(true);
    //setShowRegistration(false);
  };
  const toggleNavbar = () => {
    setNavbarCollapsed(!navbarCollapsed);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg  navbar-expand-md navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Header</a>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse justify-content-end ${navbarCollapsed ? '' : 'show'}`} id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button className="navbar-brand btn btn-dark pt-1 px-3" onClick={handleRegistrationClick}>Sign up</button>
              </li>
              <li className="nav-item">
                <button className="px-3 btn btn-dark" onClick={handleLoginClick}>Login</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showRegistration && <Registration />}
      {showLogin && <LoginForm />}
    </>
  );
}


export default Header;
