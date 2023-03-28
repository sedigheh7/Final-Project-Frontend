import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';

function Home() {
  return (
    <>
      <Container>
        <Row
          style={{
            display: "flex",
            alignItems: "end",
            justifyContent: "space-around",
          }}
        >
          <Col sm={12} lg={6}>
            <h1 className="display-1 text-white">Bloggy</h1>
            <h4 className=" text-white">
              Where words come to life
            </h4>
            <div className="d-grid gap-2">
              <Button variant="light" size="lg" as={Link} to="/create">
                create
              </Button>
              <Button variant="danger" size="lg" as={Link} to="/posts">
                view posts
              </Button>
            </div>
          </Col>
          <Col sm={12} lg={6}>
            <img
              src='https://hicoders.ch/wp-content/uploads/2022/03/11-Fullstack-Web-Programming.png'
              alt="hero"
              className="mt-3 px-5 w-100"
            />
          </Col>
        </Row>
      </Container>

      <Row className="m-5  text-center p-5">
        <Card>
          <Card.Header>Quote</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>
                Bloggy is the ultimate blogging platform for anyone looking to express themselves in the digital world. Whether you're a seasoned writer or a novice blogger, Bloggy has everything you need to create and publish your content. With its intuitive interface and easy-to-use tools, Bloggy makes it simple to write, edit, and format your blog posts. Plus, with a wide range of customizable templates and themes, you can make your blog truly your own. So why wait? Sign up for Bloggy today and start sharing your thoughts, ideas, and experiences with the world!
              </p>
              <footer className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
      </Row>
    </>
  )
}

export default Home