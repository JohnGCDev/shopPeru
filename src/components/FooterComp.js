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
                            {(props.userLogged === null) &&
                                <React.Fragment>
                                    <li><Link to="/wanttosell" className="links-white">I Want to Sell</Link></li>
                                    <li><Link to="/wanttobuy" className="links-white"> I Want to Buy</Link></li>
                                </React.Fragment>
                            }
                            {(props.userLogged === 'seller') &&
                                <li><Link to="/wanttosell" className="links-white">I Want to Sell</Link></li>
                            }
                            {(props.userLogged === 'buyer') &&
                                <li><Link to="/wanttobuy" className="links-white"> I Want to Buy</Link></li>
                            }
                        </ul>
                    </Col>
                    <Col md={6}>
                        <h4>Media:</h4>
                        <a className="btn btn-social-icon btn-facebook btn-lg m-3" href="http://www.facebook.com/"><i className="fa fa-facebook"></i></a>
                        <a className="btn btn-social-icon btn-google btn-lg m-3" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                        <a className="btn btn-social-icon btn-twitter btn-lg m-3" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                        <a className="btn btn-social-icon btn-info btn-lg m-3" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                    </Col>
                </Row>
                <div className="d-flex justify-content-center mt-2">
                    <div className="text-center"><h4><span style={{"fontSize": "38px"}}>©</span> Copyright 2020 ShopPeru</h4></div>
                </div>
            </Container>    
        </footer>
    );
}

export default Footer;