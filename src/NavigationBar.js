import React from "react";
import { NavLink } from "react-router-dom";
import Image from "react-bootstrap/Image";
import logo from "./logo/ela-logo.png";
import { BsFillCartFill, BsFillPersonFill } from "react-icons/bs";
import LoginButton from "./components/LoginButton.js";
import LogoutButton from "./components/LogoutButton.js";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedLink from "./components/ProtectedLink.js";
import { useContext } from "react";
import { CustomerContext } from "./contexts/customerContext.js";
import { CartContext } from "../src/contexts/cartContext";
const NavigationBar = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const customer = useContext(CustomerContext);
  const { cartItems } = useContext(CartContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow">
      <div className="container-fluid d-flex justify-content-around">
        <div>
          <NavLink className="navbar-brand" to="/">
            <Image
              src={logo}
              alt="ELA logo"
              roundedCircle
              className="navLogoFoto"
            />
          </NavLink>
        </div>
        {isLoading ? (
          <>loading</>
        ) : !isAuthenticated ? (
          <>
            <NavLink className="nav-link" exact to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/about-me">
              About Me
            </NavLink>
          </>
        ) : (
          <>
          {console.log(user)}
          <NavLink className="nav-link" exact to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/about-me">
              About Me
            </NavLink>
            <NavLink className="nav-link" to="/shop">
              Shop
            </NavLink>
            <ProtectedLink name="Dashboard" link="/dashboard" user={customer}  roles={['admin']}/>
            <div className="right-side-links">
              <NavLink className="nav-link" to="/cart">
                <BsFillCartFill />
                {cartItems?.length > 0 && (
                  <span className="cart-item-count">{cartItems.length}</span>
                )}
              </NavLink>
              <NavLink className="nav-link" to="/profile">
                <BsFillPersonFill />
              </NavLink>
            </div>
          </>
        )}
        {isAuthenticated ? (
                <LogoutButton className="logout-button" />
              ) : (
                <LoginButton />
              )}
      </div>
    </nav>
  );
};

export default NavigationBar;

// import { Nav, Navbar, Container } from 'react-bootstrap';
// import { NavLink } from 'react-router-dom';

// function NavigationBar({isLoggedIn}) {
//     return (
//         {isLoggedIn ? (
//           <Navbar bg="dark" variant="dark" expand="lg">
//           <Container>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Brand>Ela Art gallary</Navbar.Brand>
//             <Navbar.Collapse id="basic-navbar-nav">
//               <Nav className="me-auto">
//                 <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
//                 <Nav.Link as={NavLink} to="/shop">Shop</Nav.Link>
//                 <Nav.Link as={NavLink} to="/about-me">About Me</Nav.Link>
//                 <Nav.Link as={NavLink} to="/contact-us">Contact us</Nav.Link>
//                 <Nav.Link as={NavLink} to="/cart">Cart</Nav.Link>
//                 <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
//               </Nav>
//             </Navbar.Collapse>
//           </Container>
//         </Navbar>
//         ): (
//             <Navbar bg="dark" variant="dark" expand="lg">
//             <Container>
//               <Navbar.Toggle aria-controls="basic-navbar-nav" />
//               <Navbar.Brand>Ela Art gallary</Navbar.Brand>
//               <Navbar.Collapse id="basic-navbar-nav">
//                 <Nav className="me-auto">
//                   <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
//                   <Nav.Link as={NavLink} to="/about-me">About Me</Nav.Link>
//                   <Nav.Link as={NavLink} to="/profile">Login</Nav.Link>
//                 </Nav>
//               </Navbar.Collapse>
//             </Container>
//           </Navbar>
//         )
//         }
//       );
// }

// export default NavigationBar;

// {isLoggedIn ? (
//   <>
//     <li className="nav-item">
//       <NavLink className="nav-link" to="/shop">Shop</NavLink>
//     </li>
//     <li className="nav-item">
//       <NavLink className="nav-link" to="/contact-us">Contact Us</NavLink>
//     </li>
//     <li className="nav-item">
//       <NavLink className="nav-link" to="/cart">Cart</NavLink>
//     </li>
//     <li className="nav-item">
//       <NavLink className="nav-link" to="/profile">Profile</NavLink>
//     </li>
//   </>
// ) : (
//   <li className="nav-item">
//     <NavLink className="nav-link" to="/login">Login</NavLink>
//   </li>
// )}
