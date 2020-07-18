import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import {Loading} from './reusable/LoadingComp';


const RenderARow = (props) => {
    const nColumns = 3;
    const length = props.array.length;
    let index = props.index;
    let rowToRender = [];
    for(let j = 0; j < nColumns; j++){
        if(index === length) break;
        rowToRender.push(
            <div className="text-center mx-3" key={props.array[index].id.toString()}>
                <img className="img-fluid rounded-circle img-wh" src={props.array[index].img} 
                    alt={props.array[index].title}/>
                <hr className="items-line"/>
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
                    <Link to="/wanttosell">
                        <Button variant="success" className="rounded-buttons-lg mx-2">SELL MY PRODUCTS</Button>
                    </Link>
                    <Link to="/wanttobuy">
                        <Button variant="success" className="rounded-buttons-lg">BUY PRODUCTS</Button>
                    </Link>
                </div>
                <div className="d-flex justify-content-center mt-2">
                    <h4 className="bg-grey white-text">#IStayAtHome</h4>
                </div>
            </Container>
            <Container>
                <h2 className="mt-5">IF YOU HAVE A SHOP</h2>
                <hr className="title-line"/>
                <RenderData isLoading={props.descForOwnersData.isLoading} errmess={props.descForOwnersData.errmess} data={props.descForOwnersData.descForOwners}/>
                <div className="d-flex justify-content-center my-5">                    
                    <Link to="/wanttosell">
                        <Button variant="success" className="rounded-buttons-md">GET STARTED NOW</Button>
                    </Link>
                </div>
                <br/><br/>
                <h2>IF YOU WANT TO BUY PRODUCTS</h2>
                <hr className="title-line"/>
                <RenderData isLoading={props.descForBuyersData.isLoading} errmess={props.descForBuyersData.errmess} data={props.descForBuyersData.descForBuyers}/>
                <div className="d-flex justify-content-center my-5">                    
                    <Link to="/wanttobuy">
                        <Button variant="success" className="rounded-buttons-md">GET STARTED NOW</Button>
                    </Link>
                </div>
                <br/><br/>
            </Container>
            <Container fluid className="pre-footer">
                <Row>
                    <Col md={12} className="text-center">
                        <h3>IT DOESN'T MATTER IF YOU WANT TO BUY OR SELL</h3>
                        <hr className="title-line"/>
                        <h1 className="grenze-font">There is NO cost!</h1>
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