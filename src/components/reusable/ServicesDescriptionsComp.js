import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Loading} from './LoadingComp';

function ServicesDescriptions(props) {
    
    if(props.isLoading){
        return <Loading/>;
    }

    if(props.errmess){
        return <Row><Col md={12}><h3 className="text-danger text-center">{props.errmess}</h3></Col></Row>;
    }

    if(props.data){
        let classesRowReverse = 'd-flex flex-column flex-md-row-reverse my-5';
        let classesRow = 'd-flex flex-column flex-md-row my-5';
        return props.data.map((item, index) => {
            return(
                <div key={item.id} className={(index % 2 !== 0)? classesRowReverse: classesRow}>
                    <img className="img-fluid rounded-lg img-wh" src={item.img} 
                        alt={item.title}/>
                    <div style={{'backgroundColor':'#007800'}} className="mx-4 d-none d-md-block">&nbsp;</div>
                    <div>
                        <h4><strong>{item.title}</strong></h4>
                        <p className="text-justify" style={{'fontSize':'large'}}>{item.description}</p>
                    </div>
                </div>
            );
        });
    }
    return <div>??</div>;
}

export default ServicesDescriptions;