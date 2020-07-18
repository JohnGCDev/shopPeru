import React from 'react';
import Container from 'react-bootstrap/Container';
import ImgPanel from './reusable/ImgPanelComp';
import ServicesDescriptions from './reusable/ServicesDescriptionsComp';
import PreFooter from './reusable/PreFooterComp';

function IwantToBuy(props){
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

export default IwantToBuy;