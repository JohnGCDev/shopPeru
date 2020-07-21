import React from 'react';
import {Redirect} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ImgPanel from './reusable/ImgPanelComp';
import ServicesDescriptions from './reusable/ServicesDescriptionsComp';
import ImgPanelLogged from './reusable/ImgPanelLoggedComp';
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

    const LoggedPage = () => {
        return(
            <React.Fragment>
                <ImgPanelLogged isLoading={props.ownerProfile.isLoading} errmess={props.ownerProfile.errmess}
                    data={props.ownerProfile.profile}/>
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