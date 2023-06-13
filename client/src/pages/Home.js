import React from "react";
import { NavLink } from "react-router-dom";
import Image from "react-bootstrap/Image";
import logo from "../logo/ela-logo.png";
import Button from "react-bootstrap/Button";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";

const Home = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <h1 className="hometext m-5">
        <center>Welcome to Ela Art Gallery</center>
      </h1>
      <Image src={logo} alt="ELA" className="fotoHomeCenter" />
      <div>
        {isAuthenticated ? (
          <>
            <Button variant="primary" className="login-button">
              <NavLink className="nav-link" to="/shop">
                Shop
              </NavLink>
            </Button>
          </>
        ) : (
          <>
          <div className="d-flex justify-content-center mt-3">
          <LoginButton />
          </div>
            
          </>
        )}
      </div>
    </>
  );
};
export default Home;
