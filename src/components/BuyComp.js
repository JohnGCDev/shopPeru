import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import ImgPanel from './reusable/ImgPanelComp';
import ServicesDescriptions from './reusable/ServicesDescriptionsComp';
import ImgPanelLogged from './reusable/ImgPanelLoggedComp';
import ProfileTab from './reusable/ProfileTabComp';
import SearchProductsTab from './SearchProductsTabComp';
import PreFooter from './reusable/PreFooterComp';

function IwantToBuy(props){
    const SimplerPage = () => {
        return(
            <React.Fragment>
                <ImgPanel idCss={"wanttobuy-image-bg"} title={"BUY AND ORDER"} subtitle1="YOUR PRODUCTS FREELY." subtitle2="YOU ONLY NEED AN ACCOUNT" handleShowLoginModal={props.handleShowLoginModal} handleShowSignupModal={props.handleShowSignupModal}/>
                <Container>
                    <h2 className="mt-5">ONCE YOUR ACCOUNT HAS BEEN CREATED, YOU WILL BE ABLE TO:</h2>
                    <hr className="title-line"/>
                    <ServicesDescriptions isLoading={props.descForBuyersData.isLoading} errmess={props.descForBuyersData.errmess} data={props.descForBuyersData.descForBuyers}/>
                    <br/>
                </Container>
                <PreFooter handleShowLoginModal={props.handleShowLoginModal} 
                handleShowSignupModal={props.handleShowSignupModal}/>
            </React.Fragment>
       );
    }
    
    //"state" for controlled TabPanel
    const [tabKey, setTabKey] = useState("home");
    const LoggedPage = () => {
        return(
            <React.Fragment>
                <ImgPanelLogged isLoading={props.buyerProfile.isLoading} errmess={props.buyerProfile.errmess}
                    data={props.buyerProfile.profile}/>
                <Container className="mt-4">
                    <Tab.Container activeKey={tabKey} onSelect={(k) => setTabKey(k)}>
                        <Row>
                            <Col md={12}>
                                <Nav variant="pills" className="flex-row">
                                    <Nav.Item className="flex-fill tabnav-items">
                                        <Nav.Link eventKey="home" className={(tabKey === 'home')?
                                        "tabnav-links tabnav-active": "tabnav-links"}>
                                            <strong>HOME</strong>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="flex-fill tabnav-items">
                                        <Nav.Link eventKey="search" className={(tabKey === 'search')?
                                        "tabnav-links tabnav-active": "tabnav-links"}>
                                            <strong>SEARCH PRODUCTS</strong>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="flex-fill tabnav-items">
                                        <Nav.Link eventKey="movements" className={(tabKey === 'movements')?
                                        "tabnav-links tabnav-active": "tabnav-links"}>
                                            <strong>MOVEMENTS HISTORY</strong>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="home">
                                        <ProfileTab isLoading={props.buyerProfile.isLoading} 
                                        errmess={props.buyerProfile.errmess} 
                                        data={props.buyerProfile.profile}/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="search">
                                        <SearchProductsTab products={props.products} 
                                        usefulData={props.usefulData} owners={props.owners}
                                        buyerProfile={props.buyerProfile}/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="movements">
                                        <Alert variant="warning" className="text-center">
                                            <h4>FEATURE UNDER MAINTENANCE</h4>
                                        </Alert>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Container>
            </React.Fragment>
        );
    }
    
    switch(props.userLogged){
        case null:
            return <SimplerPage/>;
        case 'buyer':
            return <LoggedPage/>;
        case 'seller':
            return <Redirect to='/wanttosell'/>;
        default:
            return <Redirect to='/home'/>;
    }
}

export default IwantToBuy;