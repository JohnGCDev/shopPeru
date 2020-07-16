import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Loading} from './LoadingComp';


const RenderARow = (props) => {
    const nColumns = 3;
    const length = props.array.length;
    let index = props.index;
    //const ActualnColumns = (index+3 > length)? length-index : nColumns; 
    //const offset = (index+3 > length)? 1 : 0; 
    let rowToRender = [];
    for(let j = 0; j < nColumns; j++){
        if(index === length) break;
        rowToRender.push(
            <div className="text-center mx-3" key={props.array[index].id.toString()}>
                <img className="img-fluid rounded-circle img-wh" src={props.array[index].img} 
                    alt={props.array[index].title}/>
                <hr/>
                <h5>{props.array[index].title}</h5>
            </div>
        );
        index++;
    }
    return rowToRender;
}


const RenderData = (props) => {
    
    if(props.isLoading){
        return <Loading/>;
    }

    if(props.errmess){
        return <Row><Col md={12}><h3 className="text-danger text-center">{props.errmess}</h3></Col></Row>;
    }

    if(props.data){
        let length = props.data.length;
        let Rows = [];
        for(let i=0; i<length; i+=3){
            if(i >= length) break;
            Rows.push(
                <div key={i.toString()} className="d-flex flex-md-row flex-column justify-content-around">
                    <RenderARow array={props.data} index={i}/>
                </div>
            );
        }
        return Rows;
    }
}


function Home(props){

    return(
     <React.Fragment>
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
            <Container>
                <h2>IF YOU HAVE A SHOP</h2>
                <hr/>
                <RenderData isLoading={props.descForOwnersData.isLoading} errmess={props.descForOwnersData.errmess} data={props.descForOwnersData.descForOwners}/>
                <div className="d-flex justify-content-center my-5">                    
                    <Button variant="success" className="rounded-buttons-md">GET STARTED NOW</Button>
                </div>
                <br/><br/>
                <h2>IF YOU WANT TO BUY PRODUCTS</h2>
                <hr/>
                <RenderData isLoading={props.descForBuyersData.isLoading} errmess={props.descForBuyersData.errmess} data={props.descForBuyersData.descForBuyers}/>
                <div className="d-flex justify-content-center my-5">                    
                    <Button variant="success" className="rounded-buttons-md">GET STARTED NOW</Button>
                </div>
                <br/><br/>
            </Container>
            <Container fluid className="pesudo-footer">
                <Row>
                    <Col md={12} className="text-center">
                        <h3>IT DOESN'T MATTER IF YOU WANT TO BUY OR SELL</h3>
                        <hr/>
                        <h1>THERE IS NO COST!</h1>
                    </Col>
                </Row>
                <div className="d-flex justify-content-center mt-2">
                    <h4 className="bg-grey white-text">#IStayAtHome</h4>
                </div>
            </Container>
        </React.Fragment>
    );
}

export default Home;