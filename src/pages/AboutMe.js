import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import foto from "../aboutMeFoto/aboutMeEla.jpg";
import Image from "react-bootstrap/Image";
import { NavLink } from "react-router-dom";

const AboutMe = () => {
  return (
    <Container className="aboutMeContainer">
      <Row>
        <Col xs={2}></Col>
        <Col xs={4}>
          <Image src={foto} alt="Ela foto" className="elaFoto" />
        </Col>
        <Col xs={4}>
          <p className="aboutMeText">
            As a passionate painter, I love creating art that evokes emotions
            and sparks imagination. My name is Ela Asgari and I have been
            painting for over 10 years. I specialize in charcoal drawing,
            Portrait, Landscape, Still Life, Nature, Oil, Watercolor, Acrylic, Airbrush.<br></br>
            My goal is to create unique pieces of art that can
            transform any space into a work of art. I use high-quality materials
            and pay attention to every detail to ensure that my paintings are of
            the highest quality. I also offer custom paintings, so if you have a
            specific idea in mind, feel free to contact me and we can work
            together to create a one-of-a-kind piece. Thank you for visiting my
            website and I hope you enjoy my paintings as much as I enjoy
            creating them.
          </p>
          <NavLink className="nav-link" exact to="/">
            <button type="submit" className="btn-send-email">
              back Home
            </button>
          </NavLink>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Container>
  );
};
export default AboutMe;
