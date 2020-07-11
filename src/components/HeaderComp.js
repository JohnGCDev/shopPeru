import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {NavLink} from 'react-router-dom';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogout(){
        this.props.handleLogout();
    }

    handleLogin(){
        this.props.handleLogin();
    }

    render(){
        return(
            <React.Fragment>
                <Navbar className="navbar-green" variant="dark" expand="md" fixed="top">
                    <Navbar.Brand>
                        <img src={'../shopicon.ico'} alt="logo" height="45"/>{' '}ShopPeru
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
                            {this.props.isLogged
                            ? 
                            <React.Fragment>
                                <Navbar.Text className="white-text mx-3">
                                    <span className="fa fa-user fa-lg" aria-hidden="true"></span> John Doe
                                </Navbar.Text>
                                <Button variant="outline-light" className="mx-3" onClick={this.handleLogout}>
                                    <span className="fa fa-sign-out fa-lg" aria-hidden="true"></span> Log Out
                                </Button>
                            </React.Fragment>
                            : 
                            <React.Fragment>
                                <Button variant="outline-light" className="mx-3" onClick={this.handleLogin}>
                                    Sign Up
                                </Button>
                                <Button variant="outline-light" className="mx-3" onClick={this.handleLogin}>
                                    Log In
                                </Button>
                            </React.Fragment>}
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <div className="separator"></div>
            </React.Fragment>
        );
    }
}

export default Header;