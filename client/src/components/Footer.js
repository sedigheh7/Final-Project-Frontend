import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
  return (
    <div className="footer container-fluid fixed-bottom">
      <Row className="d-flex justify-content-between ">
        <Col className="g-3" lg={6}>
          <NavLink className="nav-link me-3" to="/about-me">
            About Me
          </NavLink>
          <NavLink className="nav-link" to="/contact-us">
            Contact Us
          </NavLink>
        </Col>
       
        <Col className="iconsFooter g-4" lg={6}>
          <NavLink
            to="https://instagram.com/original.painting.ela2020?igshid=NTc4MTIwNjQ2YQ=="
            target="blank"
            className="ms-4"
          >
            <FontAwesomeIcon icon={faInstagram} className="mx-auto" />
          </NavLink>

          <NavLink
            to="https://www.facebook.com/elahe.asgarifard.90?mibextid=ZbWKwL"
            target="blank"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </NavLink>
        </Col>
        <Col xs={12} className="copy-right-text text-center">
          ©copyright 2023
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
