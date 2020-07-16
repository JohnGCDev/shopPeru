import React from 'react';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = (props) => {
    return(
        <footer className="footer">
            <Container>
                <Row>
                    <Col md={6}>
                        <h4>Links:</h4>
                        <ul className="list-unstyled">
                            <li><Link to="/home" className="links-white">Home</Link></li>
                            <li><Link to="/wanttosell" className="links-white">I Want to Sell</Link></li>
                            <li><Link to="/wanttobuy" className="links-white"> I Want to BUy</Link></li>
                        </ul>
                    </Col>
                    <Col md={6}>
                        <h4>Media:</h4>
                    </Col>
                </Row>
                <div className="d-flex justify-content-center mt-4">
                    <div><h4><span style={{"fontSize": "38px"}}>©</span> Copyright 2020 ShopPeru</h4></div>
                </div>
            </Container>    
        </footer>
    );
}

export default Footer;