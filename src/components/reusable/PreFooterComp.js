import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function PreFooter(props){
    return(
        <Container fluid className="pre-footer">
            <Row>
                <Col md={12} className="text-center">
                    <h3>AND THE BEST OF ALL</h3>
                    <hr className="title-line"/>
                    <h1 className="grenze-font">There is NO cost!</h1>
                    <hr className="title-line"/>
                    <h3>GET STARTED NOW!</h3>
                    <div className="d-flex justify-content-around">
                        <Button variant="success" className="rounded-buttons-lg mx-2">
                            I WANT TO CREATE AN ACCOUNT
                        </Button>
                        <Button variant="success" className="rounded-buttons-lg">
                            I ALREADY HAVE AN ACCOUNT
                        </Button>
                    </div>
                </Col>
            </Row>
            <div className="d-flex justify-content-center mt-2">
                <h4 className="bg-grey white-text">#IStayAtHome</h4>
            </div>
        </Container>
    );
}

export default PreFooter;