import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, Row, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";

function Header() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());

    };
    return (
        <header>
            <Navbar bg="warning" variant="light" expand="lg" collapseOnSelect>
                <Container fluid>
                    <LinkContainer to="/">
                        <Navbar.Brand>Valdivian</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className="right-aligned">
                        <Nav className="mr-auto">
                            <LinkContainer to='/'>
                                <Nav.Link>
                                    <i className="fa-solid fa-house"></i>Home
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i>cart
                                </Nav.Link>
                            </LinkContainer>
                            
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id={userInfo.email}>
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            <i className="fa-regular fa-address-card"></i>Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                    <i className="fas fa-user"></i>Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <i className="fas fa-user"></i>login
                                    </Nav.Link>
                                </LinkContainer>
                            )}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="adminmenu">
                                    {/* <LinkContainer to="/administration/userlist">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer> */}

                                    <LinkContainer to="/administration/productlist">
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/administration/orderslist">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
