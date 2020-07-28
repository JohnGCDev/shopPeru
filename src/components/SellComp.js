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
import SellerProductsTab from './SellerProductsTabComp';
import PreFooter from './reusable/PreFooterComp';

function IwantToSell(props){
    
    const SimplerPage = () => {
        return(
        <React.Fragment>
            <ImgPanel idCss={"wanttosell-image-bg"} title={"SELL AND MANAGE"} subtitle1="YOUR PRODUCTS FREELY." subtitle2="YOU ONLY NEED AN ACCOUNT" handleShowLoginModal={props.handleShowLoginModal} handleShowSignupModal={props.handleShowSignupModal}/>
            <Container>
                <h2 className="mt-5">ONCE YOUR ACCOUNT HAS BEEN CREATED, YOU WILL BE ABLE TO:</h2>
                <hr className="title-line"/>
                <ServicesDescriptions isLoading={props.descForOwnersData.isLoading} errmess={props.descForOwnersData.errmess} data={props.descForOwnersData.descForOwners}/>
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
                <ImgPanelLogged isLoading={props.ownerProfile.isLoading} errmess={props.ownerProfile.errmess}
                    data={props.ownerProfile.profile}/>
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
                                        <Nav.Link eventKey="products" className={(tabKey === 'products')?
                                        "tabnav-links tabnav-active": "tabnav-links"}>
                                            <strong>PRODUCTS</strong>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="flex-fill tabnav-items">
                                        <Nav.Link eventKey="statistics" className={(tabKey === 'statistics')?
                                        "tabnav-links tabnav-active": "tabnav-links"}>
                                            <strong>STATISTICS AND REPORTS</strong>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="flex-fill tabnav-items">
                                        <Nav.Link eventKey="opinions" className={(tabKey === 'opinions')?
                                        "tabnav-links tabnav-active": "tabnav-links"}>
                                            <strong>OPINIONS</strong>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="home">
                                        <ProfileTab isLoading={props.ownerProfile.isLoading} 
                                        errmess={props.ownerProfile.errmess} 
                                        data={props.ownerProfile.profile}
                                        usfDataIsLoading={props.usefulData.isLoading}
                                        usfDataErrmess={props.usefulData.errmess}
                                        usfDataData={props.usefulData.data}
                                        />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="products">
                                        <SellerProductsTab products={props.products} 
                                        usefulData={props.usefulData}
                                        ownerProfile={props.ownerProfile}
                                        />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="statistics">
                                        <Alert variant="warning" className="text-center">
                                            <h4>FEATURE UNDER MAINTENANCE</h4>
                                        </Alert>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="opinions">
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
        case 'seller':
            return <LoggedPage/>;
        case 'buyer':
            return <Redirect to='/wanttobuy'/>;
        default:
            return <Redirect to='/home'/>;
    }
}

export default IwantToSell;