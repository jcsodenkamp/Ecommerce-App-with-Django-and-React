import React from "react";
import { Navbar, Nav, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
    return (
        <header>
            <Navbar bg="warning" variant="dark" expand="lg" collapseOnSelect>
                <Container fluid>
                    <LinkContainer to="/">
                        <Navbar.Brand >BRAINSTORM BRAND IDEAS</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="mr-auto">

                            <LinkContainer to="/cart">
                                <Nav.Link><i className="fas fa-shopping-cart"></i>cart</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/login">
                                <Nav.Link><i className="fas fa-user"></i>login</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
