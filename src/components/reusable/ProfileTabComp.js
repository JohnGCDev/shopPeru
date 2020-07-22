import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Loading} from './LoadingComp';
//import GgMap from './GgMapComp';

function ProfileTab(props){
    if(props.isLoading){
        return <div style={{paddingTop: "20px", paddingBottom: "20px"}}><Loading/></div>;
    }

    if(props.errmess){
        return <Row><Col md={12}><h3 className="text-danger text-center">{props.errmess}</h3></Col></Row>;
    }
    if(props.data){
        const displayCategories = (categories) => {
            return categories.map((category, index) => {
                return(
                <span key={index} className="mr-3 badge badge-primary p-2 text-uppercase">{category}</span>
                );
            })
        };

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
                        {(props.data.categories && props.data.categories.length) &&
                        <React.Fragment>
                            <h4><strong>CATEGORIES</strong></h4>
                            <h5>{displayCategories(props.data.categories)}</h5><br/>
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
                        {(props.data.location.latitude && props.data.location.longitude)
                        ?
                        <iframe title="location map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.9110796354626!2d-77.03943868518738!3d-12.049638891465415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDAyJzU4LjciUyA3N8KwMDInMTQuMSJX!5e0!3m2!1ses-419!2spe!4v1595397835554!5m2!1ses-419!2spe" width="600" height="450"  style={{border:"solid 1px #43a82c", width:"100%"}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                            
                        :
                            <h5 className="text-danger">No avaliable</h5>
                        }

                    </div>
                </div>
            </React.Fragment>
        );
    }

    return <div>??</div>;
}

export default ProfileTab;