import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {LocalForm, Control} from 'react-redux-form';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import FormCheck from 'react-bootstrap/FormCheck';
import FormText from 'react-bootstrap/FormText';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

//---LOGIN MODAL---
export const LoginModal = (props) => {

    const handleLoginSubmit = (values) => {
        props.handleClose();
        props.handleLogin(values.logAccountType.toString());
    }

    return(
        <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>LOG IN</Modal.Title>
            </Modal.Header>
            <LocalForm onSubmit={handleLoginSubmit}>
                <Modal.Body>
                    <FormGroup>
                        <FormLabel>Email address</FormLabel>
                        <Control.text type="email" model=".logEmail" defaultValue="jhondoe@foo.com" placeholder="Enter email" className="form-control"/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Password</FormLabel>
                        <Control.text type="password" model=".logPass" defaultValue="johndoe123" 
                        placeholder="Enter password" className="form-control"/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Select an option</FormLabel>
                        <FormCheck>
                            <FormLabel>
                                <Control.radio className="form-check-input" model=".logAccountType" value="seller" name="accountTypeSet"/>{' '}Log in as a Seller
                            </FormLabel>
                        </FormCheck>
                        <FormCheck>
                            <FormLabel>
                                <Control.radio className="form-check-input" model=".logAccountType" value="buyer" name="accountTypeSet" defaultValue="seller"/>{' '}Log in as a Buyer
                            </FormLabel>
                        </FormCheck>    
                        <FormText>
                            <Alert variant="warning">
                                These options are only available for demonstration purposes
                            </Alert>
                        </FormText>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                    <Button variant="primary" type="submit" style={{"backgroundColor": "#43a82c",
                     "borderColor": "grey"}}>Log In</Button>
                </Modal.Footer>
            </LocalForm>
        </Modal>
    );
}
//---END:LOGIN MODAL---
//---SIGNUP MODAL---
export const SignupModal = (props) => {

    const handleSignupSubmit = (values) => {
        props.handleClose();
        props.handleLogin(values.sgnAccountType.toString());
    }

    return(
        <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>SIGN UP</Modal.Title>
            </Modal.Header>
            <LocalForm onSubmit={handleSignupSubmit}>
                <Modal.Body>
                    <FormGroup>
                        <FormLabel>First Name</FormLabel>
                        <Control.text type="text" model=".sgnFirstName" defaultValue="John"
                        placeholder="Enter your first name" className="form-control"/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Last Name</FormLabel>
                        <Control.text type="text" model=".sgnLastName" defaultValue="Doe"
                        placeholder="Enter your last name" className="form-control"/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Email address</FormLabel>
                        <Control.text type="email" model=".sgnEmail" defaultValue="jhondoe@foo.com" placeholder="Enter email" className="form-control"/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Create a password</FormLabel>
                        <Control.text type="password" model=".sgnPass" defaultValue="johndoe123" 
                        placeholder="Enter password" className="form-control"/>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Select an option</FormLabel>
                        <FormCheck>
                            <FormLabel>
                                <Control.radio className="form-check-input" model=".sgnAccountType" value="seller" name="accountTypeSet"/>{' '}Sign up as a Seller
                            </FormLabel>
                        </FormCheck>
                        <FormCheck>
                            <FormLabel>
                                <Control.radio className="form-check-input" model=".sgnAccountType" value="buyer" name="accountTypeSet" defaultValue="seller"/>{' '}Sign up as a Buyer
                            </FormLabel>
                        </FormCheck>    
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Cancel</Button>
                    <Button variant="primary" type="submit" style={{"backgroundColor": "#43a82c",
                     "borderColor": "grey"}}>Sign Up</Button>
                </Modal.Footer>
            </LocalForm>
        </Modal>
    );
}
//---END:SIGNUP MODAL ---