import React, {useState} from 'react';
import {LocalForm, Control} from 'react-redux-form';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import {Loading} from './reusable/LoadingComp';
import ProductsList from './reusable/ProductsListComp';


function SellerProductsTab(props){
    const [products, setProducts] = useState(props.products.data);
    const [filters, setFilters] = useState({});

    if(props.products.isLoading || props.usefulData.isLoading || props.ownerProfile.isLoading){
        return <div style={{paddingTop: "20px", paddingBottom: "20px"}}><Loading/></div>;
    }

    if(props.products.errmess || props.usefulData.errmess || props.ownerProfile.errmess){
        let mssg = '';
        mssg += (props.products.errmess)? props.products.errmess +'. ': '';
        mssg += (props.usefulData.errmess)? props.usefulData.errmess +'. ': '';
        mssg += (props.ownerProfile.errmess)? props.ownerProfile.errmess +'. ': '';

        return <Row><Col md={12}><h3 className="text-danger text-center">{mssg}</h3></Col></Row>;
    }
    if(props.products.data && props.usefulData.data  && props.ownerProfile.profile){
        
        const handleSubmit = (values) => {
            setFilters(values);
            if(props.products.data && props.products.data.length && props.ownerProfile.profile){
                //---Build the products list---
                let filteredProducts = props.products.data;
                //By default, filter only products belonging to logged owner
                filteredProducts = filteredProducts.filter(product => {
                    return(product.shopId === props.ownerProfile.profile.id);
                });
                //Filter by product name
                if(values.name){
                    filteredProducts = filteredProducts.filter(product => {
                        return(product.name.toLowerCase().includes(values.name.toLowerCase()));
                    });
                }
                //Filter by product tag
                if(filteredProducts.length && values.tag && values.tag !== 'all'){
                    filteredProducts = filteredProducts.filter(product => {
                        return(product.tagIds.includes(Number.parseInt(values.tag)));
                    });
                }
                //Filter by product stock-->format: 10-14
                if(filteredProducts.length && values.stock && values.stock !== 'all'){
                    let existsUpper = true;
                    let upper;
                    let lower = Number.parseInt(values.stock.substring(0, values.stock.indexOf('-')));
                    if(lower !== 61){
                        upper = Number.parseInt(values.stock.substring(values.stock.indexOf('-')+1));
                    }else{//Special case 61-inf
                        existsUpper = false;
                    }
                    filteredProducts = filteredProducts.filter(product => {
                        if(existsUpper){
                            return(lower <= product.stock && product.stock <= upper);
                        }else{
                            return(lower <= product.stock);
                        }
                    });
                }
                //Filter by product price--->format: 41.00-60.99
                if(filteredProducts.length && values.price && values.price !== 'all'){
                    let existsUpper = true;
                    let upper;
                    let lower = Number.parseFloat(values.price.substring(0, values.price.indexOf('-')));
                    if(lower !== 201.00){
                        upper = Number.parseFloat(values.price.substring(values.price.indexOf('-')+1));
                    }else{//Special case 201.00-inf
                        existsUpper = false;
                    }
                    let price;
                    filteredProducts = filteredProducts.filter(product => {
                        price = Number.parseFloat(product.price.substring(product.price.indexOf('S/')+2));
                        if(existsUpper){
                            return(lower <= price && price <= upper);
                        }else{
                            return(lower <= price);
                        }
                    });
                }
                //---Filtering end---
                setProducts(filteredProducts);
            }else{
                alert('An error occurred, please try in a few minutes.')
            }
        }

        const listTags = (usfData) => {
            if(usfData.tags && usfData.tags.length){
                let tags = []; tags.push(<option key='all' value='all'>ALL</option>);
                usfData.tags.forEach(tag => {
                    tags.push(
                        <option key={tag.tagId} value={tag.tagId}>
                            {tag.name.toUpperCase()}
                        </option>
                    );
                });
                return tags;
            }
        };

        const listFilters = (items) => {
            if(props.products.data && props.usefulData.data){
                let itemsList = []; let aux=0;
                //Product name
                if(items.name){
                    itemsList.push(<Badge key={aux++} variant="primary" className="mr-3 mb-3">
                    <h6>{items.name}</h6></Badge>);
                }
                //Product tag
                if(items.tag && props.usefulData.data.tags && props.usefulData.data.tags.length){
                    if(items.tag === 'all'){
                        itemsList.push(<Badge key={aux++} variant="primary" className="mr-3 mb-3">
                        <h6>{'Tag: ALL'}</h6></Badge>);
                    }else{
                        for(let tag of props.usefulData.data.tags){
                            if(tag.tagId === Number.parseInt(items.tag)){
                                itemsList.push(<Badge key={aux++} variant="primary" className="mr-3 mb-3">
                                <h6>{tag.name}</h6></Badge>);
                                break;
                            }
                        }
                    }
                }
                //Product stock
                if(items.stock){
                    if(items.stock === 'all'){
                        itemsList.push(<Badge key={aux++} variant="primary" className="mr-3 mb-3">
                        <h6>{'Stock: ALL'}</h6></Badge>);
                    }else{
                        let str = 'Stock: From ' + items.stock.substring(0, items.stock.indexOf('-')) + ' to ' +
                        items.stock.substring(items.stock.indexOf('-')+1);
                        itemsList.push(<Badge key={aux++} variant="primary" className="mr-3 mb-3">
                        <h6>{str}</h6></Badge>);
                    }
                }
                //Product price
                if(items.price){
                    if(items.price === 'all'){
                        itemsList.push(<Badge key={aux++} variant="primary" className="mr-3 mb-3">
                        <h6>{'Price: ALL'}</h6></Badge>);
                    }else{
                        let str = 'Price: From S/' + items.price.substring(0, items.price.indexOf('-')) + ' to S/' +
                        items.price.substring(items.price.indexOf('-')+1);
                        itemsList.push(<Badge key={aux++} variant="primary" className="mr-3 mb-3">
                        <h6>{str}</h6></Badge>);
                    }
                }
                return itemsList;
            }
            return <div>&nbsp;</div>;
        };
                                
        return(
            <React.Fragment>
                <h2 className="mt-4">YOUR PRODUCTS</h2>
                <hr className="title-line"/>
                <div className="d-flex p-3" style={{backgroundColor: "#E4E4E4"}}>
                    <div className="vertical-line mr-3">&nbsp;</div>
                    <div className="flex-fill">
                        <h5><strong>FILTER BY:</strong></h5>
                        <LocalForm onSubmit={handleSubmit}>
                            <Row>
                                <FormGroup as={Col}>
                                    <FormLabel>NAME:</FormLabel>
                                    <Control.text type="text" model=".name" placeholder="Enter product name"
                                    className="form-control" defaultValue=""/>
                                </FormGroup>
                            </Row>
                            <Row>
                                <Col xs={12} md={'4'}>
                                    <FormGroup>
                                        <FormLabel>TAG:</FormLabel>
                                        <Control.select model=".tag" className="form-control" defaultValue="all">
                                            {listTags(props.usefulData.data)}
                                        </Control.select>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} md={'4'}>
                                    <FormGroup>
                                        <FormLabel>STOCK:</FormLabel>
                                        <Control.select model=".stock" className="form-control" defaultValue="all">
                                            <option value='all'>ALL</option>
                                            <option value="0-4">From 0 to 4</option>
                                            <option value="5-9">From 5 to 9</option>
                                            <option value="10-14">From 10 to 14</option>
                                            <option value="15-19">From 15 to 19</option>
                                            <option value="20-24">From 20 to 24</option>
                                            <option value="25-29">From 25 to 29</option>
                                            <option value="30-40">From 30 to 40</option>
                                            <option value="41-60">From 41 to 60</option>
                                            <option value="61-inf">From 61</option>
                                        </Control.select>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} md={'4'}>
                                    <FormGroup>
                                        <FormLabel>PRICE:</FormLabel>
                                        <Control.select model=".price" className="form-control" 
                                        defaultValue="all">
                                            <option value='all'>ALL</option>
                                            <option value="00.00-20.99">From S/ 00.00 to S/ 20.99</option>
                                            <option value="21.00-40.99">From S/ 21.00 to S/ 40.99</option>
                                            <option value="41.00-60.99">From S/ 41.00 to S/ 60.99</option>
                                            <option value="61.00-80.99">From S/ 61.00 to S/ 80.99</option>
                                            <option value="81.00-100.99">From S/ 81.00 to S/ 100.99</option>
                                            <option value="101.00-150.99">From S/ 101.00 to S/ 150.99</option>
                                            <option value="151.00-200.99">From S/ 151.00 to S/ 200.99</option>
                                            <option value="201.00-inf">From S/ 201.00</option>
                                        </Control.select>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md={"auto"}>
                                    <Button variant="primary" type="submit" className="px-5"
                                    style={{"backgroundColor": "#43a82c","borderColor": "grey"}}>
                                        SEARCH
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                        <h4 className="mt-3"><strong>RESULTS: ({products.length})</strong></h4>
                        <div className="d-flex"><div>{listFilters(filters)}</div></div>
                        <ProductsList products={products} ownerProfile={props.ownerProfile.profile} 
                        usefulData={props.usefulData.data}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
    return <div>En error occurred. Please contact the web-page administrator.</div>
}

export default SellerProductsTab;