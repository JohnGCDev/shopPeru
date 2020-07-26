import React, {useState} from 'react';
import {LocalForm, Control} from 'react-redux-form';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import FormText from 'react-bootstrap/FormText';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import {Loading} from './reusable/LoadingComp';
import EmbeddedMap from './reusable/EmbeddedMapComp';


function SearchProductsTab(props){
    const [products, setProducts] = useState(props.products.data);
    const [filters, setFilters] = useState({});
    
    const handleSubmit = (values) => {
        setFilters(values);
    }

    const listCategories = (isLoading, errmess, usfData) => {
        if(isLoading){
            return <option value="loading" disabled="disabled">
                <span className="text-warning">Loading...</span>
            </option>;
        }
        if(errmess){
            return <option value="error" disabled="disabled">
                <span className="text-danger">Error loading data</span>
            </option>;
        }
        if(usfData){
            return usfData.categories.map((category) => {
                return(
                    <option key={category.id} value={category.id}>
                        {category.name.toUpperCase()}
                    </option>
                );
            });
        } 
    };

    const listTags = (isLoading, errmess, usfData) => {
        if(isLoading){
            return <option value="loading" disabled="disabled">
                <span className="text-warning">Loading...</span>
            </option>;
        }
        if(errmess){
            return <option value="error" disabled="disabled">
                <span className="text-danger">Error loading data</span>
            </option>;
        }
        if(usfData){
            return usfData.tags.map(tag => {
                return(
                    <option key={tag.tagId} value={tag.tagId}>
                        {tag.name.toUpperCase()}
                    </option>
                );
            });
        }
    };

    const displayEmbeddedMap = (isLoading, errmess, profile) => {
        if(isLoading){
            return <div style={{paddingTop: "20px", paddingBottom: "20px"}}><Loading/></div>;
        }
        if(errmess){
            return <Row><Col md={12}><h3 className="text-danger text-center">{errmess}</h3></Col></Row>;
        }
        if(profile){
            return <EmbeddedMap url={profile.urlMap}/>;
        }
    };

    const listCustomTags = (isLoading, errmess, owners) => {
        if(isLoading){
            return <option value="loading" disabled="disabled">
                <span className="text-warning">Loading...</span>
            </option>;
        }
        if(errmess){
            return <option value="error" disabled="disabled">
                <span className="text-danger">Error loading data</span>
            </option>;
        }
        if(owners){
            let tags = [];
            owners.forEach(owner => {
                owner.customTags.forEach(tag => {
                    tags.push(
                        <option key={owner.id +'-'+ tag.cusTagId} value={owner.id +'-'+ tag.cusTagId}>
                            {owner.name +' - '+ tag.name}
                        </option>
                    );
                });
            });
            return tags;
        }
    };

    const listFilters = (items) => {
        if(props.products.data && props.usefulData.data && props.owners.data && props.buyerProfile.profile){
            let itemsList = []; let aux=0;
            //Product name
            if(items.name){
                itemsList.push(<Badge key={aux++} variant="primary" className="mr-3 mb-3">
                <h6>{items.name}</h6></Badge>);
            }
            //Product category
            if(items.category && props.usefulData.data.categories && props.usefulData.data.categories.length){
                for(let category of props.usefulData.data.categories){
                    if(category.id === Number.parseInt(items.category)){
                        itemsList.push(<Badge key={aux++} variant="primary" className="mr-3 mb-3">
                        <h6>{category.name}</h6></Badge>);
                        break;
                    }
                }
            }
            //Product tag
            if(items.tag && props.usefulData.data.tags && props.usefulData.data.tags.length){
                for(let tag of props.usefulData.data.tags){
                    if(tag.tagId === Number.parseInt(items.tag)){
                        itemsList.push(<Badge key={aux++} variant="primary" className="mr-3 mb-3">
                        <h6>{tag.name}</h6></Badge>);
                        break;
                    }
                }
            }
            //Product stock
            if(items.stock){
                let str = 'Stock: From ' + items.stock.substring(0, items.stock.indexOf('-')) + ' to ' +
                    items.stock.substring(items.stock.indexOf('-')+1);
                itemsList.push(<Badge key={aux++} variant="primary" className="mr-3 mb-3">
                    <h6>{str}</h6></Badge>);
            }
            //Product price
            if(items.price){
                let str = 'Price: From S/' + items.price.substring(0, items.price.indexOf('-')) + ' to S/' +
                    items.price.substring(items.price.indexOf('-')+1);
                itemsList.push(<Badge key={aux++} variant="primary" className="mr-3 mb-3">
                    <h6>{str}</h6></Badge>);
            }
            //Shop name
            if(items.shop){
                itemsList.push(<Badge key={aux++} variant="primary" className="mr-3 mb-3">
                <h6>{items.shop}</h6></Badge>);
            }
            //Product custom tags
            if(items.customTags){//Format 0-0: shopID-CustomTagId
                let shopId, CustomTagId;
                if(typeof items.customTags === 'string'){
                    shopId =  Number.parseInt(items.customTags.substring(0, items.customTags.indexOf('-')));
                    CustomTagId =  Number.parseInt(items.customTags.substring(items.customTags.indexOf('-')+1));
                    for(let owner of props.owners.data){
                        if(owner.id === shopId){
                            for(let cusTag of owner.customTags){
                                if(cusTag.cusTagId === CustomTagId){
                                    itemsList.push(<Badge key={aux++} variant="primary" 
                                    className="mr-3 mb-3 py-2">
                                        {owner.name +' - '+ cusTag.name}
                                    </Badge>);
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }else{//items.customTags is an Array
                    items.customTags.forEach(item => {
                        shopId = Number.parseInt(item.substring(0, item.indexOf('-')));
                        CustomTagId = Number.parseInt(item.substring(item.indexOf('-')+1));
                        for(let owner of props.owners.data){
                            if(owner.id === shopId){
                                for(let cusTag of owner.customTags){
                                    if(cusTag.cusTagId === CustomTagId){
                                        itemsList.push(<Badge key={aux++} variant="primary" 
                                        className="mr-3 mb-3 py-2">
                                            {owner.name +' - '+ cusTag.name}
                                        </Badge>);
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    });
                }
            }
            return itemsList;
        }
        return <div>&nbsp;</div>;
    };
                            
    return(
        <React.Fragment>
            <h2 className="mt-4">SEARCH PRODUCTS</h2>
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
                            <Col xs={12} md={'3'}>
                                <FormGroup>
                                    <FormLabel>CATEGORY:</FormLabel>
                                    <Control.select model=".category" className="form-control" defaultValue="0"
                                    disabled={(props.usefulData.isLoading || props.usefulData.errmess)?"true":"false"}>
                                        {listCategories(props.usefulData.isLoading, props.usefulData.errmess,
                                        props.usefulData.data)}
                                    </Control.select>
                                </FormGroup>
                            </Col>
                            <Col xs={12} md={'3'}>
                                <FormGroup>
                                    <FormLabel>TAG:</FormLabel>
                                    <Control.select model=".tag" className="form-control" defaultValue="0"
                                    disabled={(props.usefulData.isLoading || props.usefulData.errmess)?"true":"false"}>
                                        {listTags(props.usefulData.isLoading, props.usefulData.errmess,
                                        props.usefulData.data)}
                                    </Control.select>
                                </FormGroup>
                            </Col>
                            <Col xs={12} md={'3'}>
                                <FormGroup>
                                    <FormLabel>STOCK:</FormLabel>
                                    <Control.select model=".stock" className="form-control" defaultValue="0-4">
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
                            <Col xs={12} md={'3'}>
                                <FormGroup>
                                    <FormLabel>PRICE:</FormLabel>
                                    <Control.select model=".price" className="form-control" 
                                    defaultValue="00.00-20.99">
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
                        <Row>
                            <FormGroup as={Col}>
                                <FormLabel>SHOP NAME:</FormLabel>
                                <Control.text type="text" model=".shop" defaultValue=""
                                placeholder="Enter a shop name" className="form-control"/>
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup as={Col}>
                                <h6>OR SELECT A SHOP:</h6>
                                <div className="form-check">
                                    <Control.checkbox className="form-check-input" model=".showTheNearest"/>
                                    <label className="form-check-label">SHOW THE NEAREST SHOPS</label>
                                </div>
                                <FormText><Alert variant="warning">FEATURE UNDER MAINTENANCE</Alert></FormText>
                                <FormText className="text-center">
                                    <h6 className="text-info">(Showing .. near shops)</h6>
                                </FormText>
                                {displayEmbeddedMap(props.buyerProfile.isLoading, props.buyerProfile.errmess, props.buyerProfile.profile)}
                                <FormText className="text-center">
                                    <h6 className="text-info">
                                        Selected: THE KINGDOM OF CLOTHES, CLOTHES AND MORE
                                    </h6>
                                    <Alert variant="warning">FEATURE UNDER MAINTENANCE</Alert>
                                </FormText>
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup as={Col}>
                                <FormLabel>TAGS CREATED BY SELECTED SHOP(S):</FormLabel>
                                <Control.select model=".customTags" className="form-control"
                                defaultValue="0-0" multiple htmlSize={1}>
                                    {listCustomTags(props.owners.isLoading, props.owners.errmess,
                                    props.owners.data)}
                                </Control.select>
                            </FormGroup>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col md={"auto"}>
                                <Button variant="primary" type="submit" className="px-5"
                                style={{"backgroundColor": "#43a82c","borderColor": "grey"}}
                                disabled={(!(props.products.data && props.usefulData.data
                                && props.owners.data && props.buyerProfile.profile)) && 'disabled'}>
                                    SEARCH
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                    <h4 className="mt-3"><strong>RESULTS:</strong></h4>
                    <div className="d-flex"><div>{listFilters(filters)}</div></div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SearchProductsTab;