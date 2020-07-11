import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function Home(props){
    return(
        <Container fluid id="home-image-bg">
            <Row>
                <Col xs={12} md={{offset: 7, span: 5}}>
                    <Row>
                        <Col xs={12} md={8}>
                            <h1 className="white-opacity text-green"><strong>SELL AND BUY</strong></h1>
                            <main className="white-opacity">
                                <span className="h4">YOUR PRODUCTS WITHOUT</span> <br/>
                                <span className="h4">LEAVING YOUR HOME</span>
                            </main>
                            <h3 className="white-opacity text-green ml-4 mt-2">
                                <strong>...AND EASIER THAN EVER!</strong>
                            </h3>
                        </Col> 
                    </Row>
                </Col>
            </Row>
            <div className="separator"></div><br/>
            <div className="d-flex justify-content-around">
                <Button variant="success" className="rounded-buttons-lg mx-2">SELL MY PRODUCTS</Button>
                <Button variant="success" className="rounded-buttons-lg">BUY PRODUCTS</Button>
            </div>
            <div className="d-flex justify-content-center mt-2">
                <h4 className="bg-grey white-text">#IStayAtHome</h4>
            </div>
        </Container>
    );
}

export default Home;