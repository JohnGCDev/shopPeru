import React from 'react';
import '../App.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap-social/bootstrap-social.css';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchAllDescForBuyers, fetchAllDescForOwners,
  fetchBuyerProfile, clearBuyerProfile, addBuyerProfile, fetchOwnerProfile,
  addOwnerProfile, clearOwnerProfile, addUsefulData, clearUsefulData,
  fetchProducts, clearProducts, fetchAllOwners, clearAllOwners} from '../redux/actions/ActionCreators';
import Header from './HeaderComp';
import {LoginModal, SignupModal} from './ModalsComp';
import Footer from './FooterComp';
import Home from './HomeComp';
import IwantToBuy from './BuyComp';
import IwantToSell from './SellComp';

const mapStateToProps = state => ({
  descForBuyers: state.descForBuyers,
  descForOwners: state.descForOwners,
  buyerProfile: state.buyerProfile,
  ownerProfile: state.ownerProfile,
  usefulData: state.usefulData,
  products: state.products,
  allOwners: state.allOwners
});

const mapDispatchToProps = dispatch => ({
  fetchAllDescForBuyers: () => dispatch(fetchAllDescForBuyers()),
  fetchAllDescForOwners: () => dispatch(fetchAllDescForOwners()),
  //Buyers Profile
  fetchBuyerProfile: (buyerId) => dispatch(fetchBuyerProfile(buyerId)),
  clearBuyerProfile: () => dispatch(clearBuyerProfile()),
  addBuyerProfile: (profile) => dispatch(addBuyerProfile(profile)),
  //Owners Profile
  fetchOwnerProfile: (ownerId) => dispatch(fetchOwnerProfile(ownerId)),
  clearOwnerProfile: () => dispatch(clearOwnerProfile()),
  addOwnerProfile: (profile) => dispatch(addOwnerProfile(profile)),
  //Useful Data
  clearUsefulData: () => dispatch(clearUsefulData()),
  addUsefulData: (data) => dispatch(addUsefulData(data)),
  //Products
  fetchProducts: () => dispatch(fetchProducts()),
  clearProducts: () => dispatch(clearProducts()),
  //All Owners
  fetchAllOwners: () => dispatch(fetchAllOwners()),
  clearAllOwners: () => dispatch(clearAllOwners())
});

class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userLogged: null,
      showLoginModal: false,
      showSignupModal: false
    };
    //---Bind of Methods---
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLoginModalClose = this.handleLoginModalClose.bind(this);
    this.handleLoginModalShow = this.handleLoginModalShow.bind(this);
    this.handleSignupModalClose = this.handleSignupModalClose.bind(this);
    this.handleSignupModalShow = this.handleSignupModalShow.bind(this);
    //---END:Bind of Methods---
  }
  //---Handle Methods---
  handleLogout(){
    if(window.confirm('You are about to log out.')){
      this.setState({userLogged: null});
      //Clear user's session from LocalStorage
      localStorage.removeItem("userType");
      localStorage.removeItem("userProfile");
      //Clear useful data from LocalStorage
      localStorage.removeItem("usefulData");
      //Clear user's data from redux store
      switch(this.state.userLogged){
        case 'buyer': 
          this.props.clearBuyerProfile(); 
          this.props.clearAllOwners(); //Clear all owners data from redux store
          break;
        case 'seller':
          this.props.clearOwnerProfile(); break;
        default: 
          break;
      }
      //Clear useful data from redux store
      this.props.clearUsefulData();
      //Clear products data from redux store
      this.props.clearProducts();
    }
  }

  handleLogin(userType){
    localStorage.setItem("userType", userType); //Keep track the user's session
    this.setState({userLogged: userType});
    //Load user's data from server
    switch(userType){
      case 'buyer':
        let defaultBuyerId = 0;
        this.props.fetchBuyerProfile(defaultBuyerId);
        this.props.fetchProducts();
        this.props.fetchAllOwners();
        break;
      case 'seller':
        let defaultOwnerId = 0;
        this.props.fetchOwnerProfile(defaultOwnerId);
        this.props.fetchProducts();
        break;
      default: break; 
    }
  }
  
  handleLoginModalClose(){
    this.setState({showLoginModal: false});
  }

  handleLoginModalShow(){
    this.setState({showLoginModal: true});
  }

  handleSignupModalClose(){
    this.setState({showSignupModal: false});
  }

  handleSignupModalShow(){
    this.setState({showSignupModal: true});
  }
  //---END:Handle Methods---

  componentDidMount(){
    this.props.fetchAllDescForBuyers();
    this.props.fetchAllDescForOwners();
    //In case of reloading, remember user's session, if it exists
    if(localStorage.getItem("userType")){
      this.setState({userLogged: localStorage.getItem("userType")});
      this.props.fetchProducts(); //Also, reload products data if an user has logged
    }
    //In case of reloading, remember user's profile, if it exists
    if(localStorage.getItem("userProfile")){ //Warning! Using this.state.userLogged instead triggers errors because of the previous this.setState statement is asynchronous.
      switch(localStorage.getItem("userType")){
        case 'buyer':
          this.props.addBuyerProfile(JSON.parse(localStorage.getItem("userProfile")));
          this.props.fetchAllOwners(); //Also, reload all owners data if an buyer has logged
          break;
        case 'seller':
          this.props.addOwnerProfile(JSON.parse(localStorage.getItem("userProfile")));
          break;
        default: break; 
      }
    }
    //In case of reloading, remember useful data, if it exists
    if(localStorage.getItem("usefulData")){
      this.props.addUsefulData(JSON.parse(localStorage.getItem("usefulData")));
    }
  }

  render(){

    const NavbarSection = () => {
      return(
        <Header userLogged={this.state.userLogged} handleLogout={this.handleLogout}
          handleShowLoginModal={this.handleLoginModalShow} handleShowSignupModal={this.handleSignupModalShow}/>
      )
    }

    const LoginModalSection = () => {
      return(
        <LoginModal show={this.state.showLoginModal} handleClose={this.handleLoginModalClose} 
          handleShow={this.handleLoginModalShow} handleLogin={this.handleLogin}/>
      );
    }

    const SignupModalSection = () => {
      return(
        <SignupModal show={this.state.showSignupModal} handleClose={this.handleSignupModalClose} 
        handleShow={this.handleSignupModalShow} handleLogin={this.handleLogin}/>
      );
    }

    const HomePage = () => {
      return(
        <Home descForBuyersData={this.props.descForBuyers} descForOwnersData={this.props.descForOwners}/>
      );
    }
    
    const WantToSellPage = () => {
      return(
        <IwantToSell descForOwnersData={this.props.descForOwners} userLogged={this.state.userLogged}
          handleShowLoginModal={this.handleLoginModalShow} handleShowSignupModal={this.handleSignupModalShow}
          ownerProfile={this.props.ownerProfile} usefulData={this.props.usefulData} 
          products={this.props.products}/>
      );
    }

    const WantToBuyPage = () => {
      return(
        <IwantToBuy descForBuyersData={this.props.descForBuyers} userLogged={this.state.userLogged}
          handleShowLoginModal={this.handleLoginModalShow} handleShowSignupModal={this.handleSignupModalShow}
          buyerProfile={this.props.buyerProfile} usefulData={this.props.usefulData} 
          products={this.props.products} owners={this.props.allOwners}/>
      );
    }

    const FooterSection = () => {
      return(
        <Footer userLogged={this.state.userLogged}/>
      );
    }


  
    return (
      <React.Fragment>
        <NavbarSection/>
        <LoginModalSection/>
        <SignupModalSection/>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route path="/wanttosell" component={WantToSellPage}/>
          <Route path="/wanttobuy" component={WantToBuyPage}/>
          <Redirect to="/home"/>
        </Switch>
        <FooterSection/>
      </React.Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
