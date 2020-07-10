import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {NavLink} from 'react-router-dom';

function Header(props){
    return(
        <React.Fragment>
            <Navbar bg="dark" variant="dark" expand="md" fixed="top">
                <Navbar.Brand>
                    <img src={'../shopicon.ico'} alt="logo" height="45"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="website-navbar"/>
                <Navbar.Collapse id="website-navbar">
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <NavLink className="nav-link" to="/home">Home</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className="nav-link" to="/wanttosell">I Want to Sell</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className="nav-link" to="/wanttobuy">I Want to Buy</NavLink>
                        </Nav.Item>
                    </Nav>
                    <Form inline>
                        <Button variant="outline-info" className="mx-2">Sign Up</Button>
                        <Button variant="outline-info" className="mx-2">Log In</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <div id="seprator-navbar"></div>
        </React.Fragment>
    );
}

export default Header;