import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

const renderTags = (obj, useful) => {
    let tags = []; let variant;
    obj.tagIds.forEach(tagId => {
        for(let tag of useful.tags){
            if(tag.tagId === tagId){
                if(tag.name.toLowerCase().includes('new')){
                    variant = 'success';
                }
                else if(tag.name.toLowerCase().includes('popular')){
                    variant = 'warning';
                }
                else if(tag.name.toLowerCase().includes('sold out')){
                    variant = 'danger';
                }
                else{
                    variant = 'secondary';
                }
                tags.push(
                    <h6 key={tagId} className="d-block d-md-inline ml-2 mt-2">
                        <Badge variant={variant}>
                            {tag.name.toUpperCase()}
                        </Badge>
                    </h6>
                );
                break;
            }
        }
    });
    return tags;
};
//RenderCustomTags from various Owners
const renderCustomTagsOwners = (obj, owners) => {
    let customTags = [];
    for(let owner of owners){
        if(owner.id === obj.shopId){
            obj.cusTagIds.forEach(cusTagId => {
                for(let customTag of owner.customTags){
                    if(cusTagId === customTag.cusTagId){
                        customTags.push(
                            <Badge variant="primary" className="d-block d-md-inline mr-2 mt-2" key={cusTagId}>
                                {customTag.name}
                            </Badge>
                        );
                        break;
                    }
                }
            });
            break;
        }
    }
    return customTags;
};

//RenderCustomTags from a single Owners
const renderCustomTags = (obj, profile) => {
    let customTags = [];
    obj.cusTagIds.forEach(cusTagId => {
        for(let customTag of profile.customTags){
            if(cusTagId === customTag.cusTagId){
                customTags.push(
                    <Badge variant="primary" className="d-block d-md-inline mr-2 mt-2" key={cusTagId}>
                        {customTag.name}
                    </Badge>
                );
                break;
            }
        }
    });
    return customTags;
};

const renderShopName = (obj, owners) => {
    let shopName = '--';
    for(let owner of owners){
        if(owner.id === obj.shopId){
            shopName = <h6 className="text-primary">{owner.name}</h6>;
            break;
        }
    };
    return shopName;
};

const renderStockOptions = (stock) => {
    let options = [];
    for(let i=1; i<=stock; i++){
        options.push(<option key={i} value={i}>{i}</option>);
    }
    if(stock === 0){
        return <option key="0" value="0">0</option>
    }
    return options;
};

function ProductsList(props){
    
    if(props.products && props.products.length){
        const userType = localStorage.getItem('userType');
        const nColumns = 4;
        const renderRow = (index, array) => {
            let row = [];
            for(let i = index; i<index+nColumns && i<array.length; i++){
                row.push(
                    <Col md={Number.parseInt(12/nColumns)} key={i.toString()}>
                        <Card>
                            <Card.Img variant="top" src={array[i].img} alt={array[i].name}/>
                            <Card.ImgOverlay style={{padding: 0}} className="d-flex flex-row-reverse">
                                <Card.Text className="align-self-end">
                                    {renderTags(array[i], props.usefulData)}
                                </Card.Text>
                            </Card.ImgOverlay>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Card.Title className="text-center">{array[i].name}</Card.Title>
                            </Card.Header>
                            <Card.Body style={{paddingTop: '0px'}}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        {array[i].description}<br/>
                                        {(userType === 'seller') && renderCustomTags(array[i], props.ownerProfile)}
                                        {(userType === 'buyer') && renderCustomTagsOwners(array[i], props.owners)}
                                    </ListGroup.Item>
                                    {(userType === 'buyer') &&
                                        (<ListGroup.Item className="text-center">
                                            {renderShopName(array[i], props.owners)}
                                        </ListGroup.Item>)
                                    }
                                    <ListGroup.Item className="text-center">
                                        {(userType === 'seller') && 
                                            <React.Fragment>
                                                <div className="d-flex justify-content-around">
                                                    <h6><strong>STOCK: </strong>{
                                                        (array[i].stock)? array[i].stock
                                                        :   <span className="text-danger font-weight-bold">
                                                                {array[i].stock}
                                                            </span> }
                                                    </h6>
                                                    <h6><strong>PRICE: </strong>{array[i].price}</h6>
                                                </div>
                                                <h6><strong>SOLD: </strong>{array[i].sold}</h6>
                                                <Button variant="primary" style={{"backgroundColor": "#43a82c","borderColor": "grey"}} size="sm"
                                                onClick={()=>alert("Feature under maintenance")}>
                                                    <span className="fa fa-pencil" aria-hidden="true"></span> EDIT PRODUCT
                                                </Button>
                                            </React.Fragment>
                                        }
                                        {(userType === 'buyer') &&
                                        <React.Fragment>
                                            <h5><strong>PRICE: </strong>{array[i].price}</h5>
                                            <Form>
                                                <Form.Group as={Row}>
                                                    <Form.Label column md={'auto'}>
                                                        <strong>Items:</strong>
                                                    </Form.Label>
                                                    <Col md={'auto'}>
                                                        <Form.Control as="select" size="sm">
                                                            {renderStockOptions(array[i].stock)}
                                                        </Form.Control>
                                                    </Col>
                                                </Form.Group>
                                                <Form.Row>
                                                    <Col md={12}>
                                                        <Form.Group>
                                                            <Button variant="primary" style={{"backgroundColor": "#43a82c","borderColor": "grey"}} 
                                                            disabled={(!array[i].stock)&&'disabled'}
                                                            onClick={()=>alert("Feature under maintenance")}>
                                                                <span className="fa fa-cart-arrow-down" aria-hidden="true"></span> ADD TO CART
                                                            </Button>
                                                        </Form.Group>
                                                    </Col>
                                                </Form.Row>
                                            </Form>
                                        </React.Fragment>
                                        }
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                );
            }
            return row;
        };

        const renderRows = (array) => {
            let rows = [], aux; 
            for(let i=0; i<array.length; i+=nColumns){
                aux = renderRow(i, array);
                if(aux.length){
                    rows.push(<Row key={i.toString()} className="mb-2">{aux}</Row>);
                }
            }
            return rows;
        };

        return(
            <React.Fragment>
                <div className="d-flex flex-row-reverse mb-3">
                    <Button variant="success" className="rounded-buttons" 
                    onClick={()=>alert("Feature under maintenance")}>
                            {(userType === 'seller') &&
                            <React.Fragment>
                                <span className="fa fa-plus-circle" aria-hidden="true"></span> ADD NEW PRODUCT
                            </React.Fragment>
                            }
                            {(userType === 'buyer') && 
                            <React.Fragment>
                                <span className="fa fa-shopping-cart" aria-hidden="true"></span> BUY SELECTED PRODUCTS
                            </React.Fragment>
                            }
                    </Button>
                </div>
                {renderRows(props.products)}
                <hr/>
                <div className="d-flex justify-content-center">
                    <span className="fa fa-step-forward fa-flip-horizontal fa-2x mx-2" aria-hidden="true" style={{color: 'grey'}}></span>
                    <span className="fa fa-chevron-right fa-flip-horizontal fa-2x mx-2" aria-hidden="true" style={{color: 'grey'}}></span>
                    <span className="mx-2">Page 1/N</span>
                    <span className="fa fa-chevron-right fa-2x mx-2" aria-hidden="true" style={{color: '#43a82c'}}></span>
                    <span className="fa fa-step-forward fa-2x mx-2" aria-hidden="true" style={{color: '#43a82c'}}></span>
                </div>
            </React.Fragment>
        );
    }else{
        return(
            <div className="d-flex">
                <h3 className="flex-fill text-success text-center">
                    <span className="fa fa-frown-o" aria-hidden="true"></span> Products Not Found
                </h3>
            </div>
            );
    }
}

export default ProductsList;