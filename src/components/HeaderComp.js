import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {NavLink} from 'react-router-dom';

class Header extends React.Component{

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
                            {(this.props.userLogged === null) &&
                                <React.Fragment>
                                    <Nav.Item>
                                        <NavLink className="nav-link" to="/wanttosell">I Want to Sell</NavLink>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <NavLink className="nav-link" to="/wanttobuy">I Want to Buy</NavLink>
                                    </Nav.Item>
                                </React.Fragment>
                            }
                            {(this.props.userLogged === 'seller') &&
                                <Nav.Item>
                                    <NavLink className="nav-link" to="/wanttosell">I Want to Sell</NavLink>
                                </Nav.Item>
                            }
                            {(this.props.userLogged === 'buyer') &&
                                <Nav.Item>
                                    <NavLink className="nav-link" to="/wanttobuy">I Want to Buy</NavLink>
                                </Nav.Item>
                            }
                        </Nav>
                        <Form inline>
                            {this.props.userLogged
                            ? 
                            <React.Fragment>
                                <Navbar.Text className="white-text mx-3">
                                    <span className="fa fa-user fa-lg" aria-hidden="true"></span> John Doe
                                </Navbar.Text>
                                <Button variant="outline-light" className="mx-3" onClick={this.props.handleLogout}>
                                    <span className="fa fa-sign-out fa-lg" aria-hidden="true"></span> Log Out
                                </Button>
                            </React.Fragment>
                            : 
                            <React.Fragment>
                                <Button variant="outline-light" className="mx-3" 
                                onClick={this.props.handleShowSignupModal}>
                                    Sign Up
                                </Button>
                                <Button variant="outline-light" className="mx-3" 
                                onClick={this.props.handleShowLoginModal}>
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