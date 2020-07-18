import React from 'react';
import Container from 'react-bootstrap/Container';
import ImgPanel from './reusable/ImgPanelComp';
import ServicesDescriptions from './reusable/ServicesDescriptionsComp';
import PreFooter from './reusable/PreFooterComp';

function IwantToSell(props){
    return(
        <React.Fragment>
            <ImgPanel idCss={"wanttosell-image-bg"} title={"SELL AND MANAGE"} subtitle1="YOUR PRODUCTS FREELY." subtitle2="YOU ONLY NEED AN ACCOUNT"/>
            <Container>
                <h2 className="mt-5">ONCE YOUR ACCOUNT HAS BEEN CREATED, YOU WILL BE ABLE TO:</h2>
                <hr className="title-line"/>
                <ServicesDescriptions isLoading={props.descForOwnersData.isLoading} errmess={props.descForOwnersData.errmess} data={props.descForOwnersData.descForOwners}/>
                <br/>
            </Container>
            <PreFooter/>
        </React.Fragment>
       );
}

export default IwantToSell;