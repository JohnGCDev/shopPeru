import React from 'react';
import {Redirect} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ImgPanel from './reusable/ImgPanelComp';
import ServicesDescriptions from './reusable/ServicesDescriptionsComp';
import ImgPanelLogged from './reusable/ImgPanelLoggedComp';
import PreFooter from './reusable/PreFooterComp';

function IwantToBuy(props){
    const SimplerPage = () => {
        return(
            <React.Fragment>
                <ImgPanel idCss={"wanttobuy-image-bg"} title={"BUY AND ORDER"} subtitle1="YOUR PRODUCTS FREELY." subtitle2="YOU ONLY NEED AN ACCOUNT"/>
                <Container>
                    <h2 className="mt-5">ONCE YOUR ACCOUNT HAS BEEN CREATED, YOU WILL BE ABLE TO:</h2>
                    <hr className="title-line"/>
                    <ServicesDescriptions isLoading={props.descForBuyersData.isLoading} errmess={props.descForBuyersData.errmess} data={props.descForBuyersData.descForBuyers}/>
                    <br/>
                </Container>
                <PreFooter/>
            </React.Fragment>
       );
    }

    const LoggedPage = () => {
        return(
            <React.Fragment>
                <ImgPanelLogged isLoading={props.buyerProfile.isLoading} errmess={props.buyerProfile.errmess}
                    data={props.buyerProfile.profile}/>
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