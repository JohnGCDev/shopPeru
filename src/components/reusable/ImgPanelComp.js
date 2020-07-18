import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function ImgPanel(props){
    return(
        <Container fluid id={props.idCss}>
            <Row>
                <Col xs={12} md={{offset: 2, span: 10}} className="white-opacity">
                    <div className="d-flex justify-content-center mt-2">
                        <h4 className="bg-grey white-text">#IStayAtHome</h4>
                    </div>
                    <div className="separator"></div>
                    <div className="ml-4">
                        <h1 className="text-green">
                            <strong>{props.title}</strong>
                        </h1>
                        <span className="h4"><strong>{props.subtitle1}</strong></span><br/><br/>
                        <span className="h4"><strong>{props.subtitle2}</strong></span>
                    </div>
                    <div className="separator"></div>
                    <div className="d-flex justify-content-around">
                        <Button variant="success" className="rounded-buttons-lg mx-1">
                            I WANT TO CREATE AN ACCOUNT
                        </Button>
                        <Button variant="success" className="rounded-buttons-lg">
                            I ALREADY HAVE AN ACCOUNT
                        </Button>
                    </div>
                    <div className="separator"></div>
                </Col>
            </Row>
        </Container>
    );
}

export default ImgPanel;