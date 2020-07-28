import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Loading} from './LoadingComp';
import EmbeddedMap from './EmbeddedMapComp';

function ProfileTab(props){
    if(props.isLoading){
        return <div style={{paddingTop: "20px", paddingBottom: "20px"}}><Loading/></div>;
    }

    if(props.errmess){
        return <Row><Col md={12}><h3 className="text-danger text-center">{props.errmess}</h3></Col></Row>;
    }
    if(props.data){
        const displayCategories = (categories, categoriesIds) => {
            let categoriesArray = [];
            categoriesIds.forEach(categoriesId => {
                for(let category of categories){
                    if(category.id === categoriesId){
                        categoriesArray.push(
                            <span key={categoriesId.toString()} 
                            className="mr-3 badge badge-primary p-2 text-uppercase">
                                {category.name}
                            </span>
                        );
                        break;
                    }
                }
            });
            return categoriesArray;
        };

        const displayPaymentMethods = (idsArray, dataArray) => {
            let method;
            return idsArray.map(id => {
                method = dataArray.filter(item => item.id === id)[0];
                if(method){
                    return(
                        <div key={method.id} className="mr-md-4">
                            <Card style={{background: 'none'}}>
                                <Card.Header className="text-center">
                                    <Card.Img variant="top" src={method.img} 
                                    style={{width: "130px", height: "100px"}}/>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title className="text-center">{method.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    );
                }
                return <div key={id}><h5 className="text-danger">Resource Not Found</h5></div>
            })
        }

        const paymentMethodsSection = (isLoading, errmess, data, paymentMethodsIds) => {
            if(isLoading){
                return <div style={{paddingTop: "20px", paddingBottom: "20px"}}><Loading/></div>;
            }
            if(errmess){
                return <h3 className="text-danger">{errmess}</h3>;
            } 
            if(data){
                return(
                    <React.Fragment>
                        <h2 className="mt-4">PAYMENT METHODS</h2>
                        <hr className="title-line"/>
                        <div className="d-flex p-3" style={{backgroundColor: "#E4E4E4"}}>
                            <div className="vertical-line mr-3">&nbsp;</div>
                            <div className="flex-fill">
                                <div className="text-right">
                                    <Button variant="success" className="rounded-buttons" 
                                    onClick={()=>alert("Feature under maintenance")}>
                                        <span className="fa fa-plus-circle" aria-hidden="true"></span> Add New Method
                                    </Button>
                                </div>
                                {(paymentMethodsIds && paymentMethodsIds.length &&
                                data.paymentMethods && data.paymentMethods.length)
                                ?
                                <div className="d-flex flex-column flex-md-row mt-4 mt-md-0">
                                    {displayPaymentMethods(paymentMethodsIds, data.paymentMethods)}
                                </div>
                                :
                                    <h5 className="text-danger">No available</h5>
                                }
                                <div className="text-right mt-4">
                                    <Button variant="success" className="rounded-buttons" 
                                    onClick={()=>alert("Feature under maintenance")}>
                                        <span className="fa fa-pencil" aria-hidden="true"></span> Edit Data
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                );
            }   
        }

        return(
            <React.Fragment>
                <h2 className="mt-4">BASIC DATA</h2>
                <hr className="title-line"/>
                <div className="d-flex p-3" style={{backgroundColor: "#E4E4E4"}}>
                    <div className="vertical-line mr-3">&nbsp;</div>
                    <div> 
                        <h4><strong>NAME</strong></h4>
                        <h5>{props.data.name}</h5><br/>
                        {props.data.ruc &&
                        <React.Fragment>
                            <h4><strong>RUC</strong></h4>
                            <h5>{props.data.ruc}</h5><br/>
                        </React.Fragment>
                        }
                        <h4><strong>DESCRIPTION</strong></h4>
                        <h5>{props.data.description}</h5><br/>
                        {(props.usfDataData && props.usfDataData.categories &&
                             props.usfDataData.categories.length && props.data && props.data.categoriesIds && props.data.categoriesIds.length) &&
                        <React.Fragment>
                            <h4><strong>CATEGORIES</strong></h4>
                            <h5>
                                {displayCategories(props.usfDataData.categories, props.data.categoriesIds)}
                            </h5><br/>
                        </React.Fragment>
                        }
                        <div className="d-flex flex-column flex-md-row">
                            <div className="flex-fill">
                                <h4><strong>ADDRESS</strong></h4>
                                <h5>{props.data.address}</h5><br/>
                            </div>
                            <div className="flex-fill">
                                <h4><strong>CELL PHONE NUMBER</strong></h4>
                                <h5>{props.data.cellPhoneNumber}</h5><br/>
                            </div>
                        </div>
                        <h4><strong>LOCATION</strong></h4>
                        {(props.data.urlMap)
                        ?
                            <EmbeddedMap url={props.data.urlMap}/>
                        :
                            <h5 className="text-danger">No available</h5>
                        }
                        <div className="text-right mt-4">
                            <Button variant="success" className="rounded-buttons" 
                            onClick={()=>alert("Feature under maintenance")}>
                                <span className="fa fa-pencil" aria-hidden="true"></span> Edit Data
                            </Button>
                        </div>
                    </div>
                </div>
                {paymentMethodsSection(props.usfDataIsLoading, props.usfDataErrmess, props.usfDataData,
                    props.data.paymentMethodsIds)}
            </React.Fragment>
        );
    }

    return <div>??</div>;

}

export default ProfileTab;