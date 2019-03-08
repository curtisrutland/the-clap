import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Content from "./Content";

function App() {



  return (
    <>
      <Navbar bg="info" variant="dark">
        <Container>
          <Navbar.Brand href="#">The Clap</Navbar.Brand>
        </Container>
      </Navbar>
      <Container style={{marginTop: 20}}>
        <Row>
          <Col sm={{span: 8, offset: 2}}>
            <Content />
          </Col>
        </Row>
      </Container>
    </>
  );
}


export default App;
