import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Loading} from './LoadingComp';

function ImgPanelLogged(props){
    if(props.isLoading){
        return <Loading/>;
    }

    if(props.errmess){
        return <Row><Col md={12}><h3 className="text-danger text-center">{props.errmess}</h3></Col></Row>;
    }

    if(props.data){
        return(
            <Container fluid key={props.data.id} style={{"paddingTop": "10px"}}>
                <Row>
                    <Col md={5} style={{paddingLeft: "0", marginLeft: "0", paddingRight: "0", marginRight: "0"}}>
                        <Card>
                            <Card.Img src={props.data.img} alt={props.data.name} height="350"/>
                            <Card.ImgOverlay style={{padding: 0}} className="d-flex flex-row-reverse">
                                <Card.Text className="align-self-end">
                                    <Button variant="success" className="rounded-buttons" onClick={()=>alert("Feature under maintenance")}>
                                        <span className="fa fa-pencil"></span> Change image
                                    </Button>
                                </Card.Text>
                            </Card.ImgOverlay>
                        </Card>
                    </Col>
                    <Col md={7} style={{paddingLeft: "0"}}>
                        <div className="d-flex">
                            <h4 className="bg-grey white-text">#IStayAtHome</h4>
                        </div>
                        <div className="p-5">
                            <h1 className="green-title text-uppercase display-4">{props.data.name}</h1><br/>
                            <h3 className="d-block d-md-inline">
                                <strong>{props.data.purchasedProducts + ' PURCHASED PRODUCTS'}</strong>
                            </h3>
                            <h5 className="d-block d-md-inline font-italic ml-md-5">{'Joined '+ props.data.joined}</h5>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
    return <div>??</div>;
}

export default ImgPanelLogged;
