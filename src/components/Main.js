import React from 'react';
import '../App.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap-social/bootstrap-social.css';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchAllDescForBuyers, fetchAllDescForOwners,
  fetchBuyerProfile, clearBuyerProfile, addBuyerProfile} from '../redux/actions/ActionCreators';
import Header from './HeaderComp';
import {LoginModal, SignupModal} from './ModalsComp';
import Footer from './FooterComp';
import Home from './HomeComp';
import IwantToBuy from './BuyComp';
import IwantToSell from './SellComp';

const mapStateToProps = state => ({
  descForBuyers: state.descForBuyers,
  descForOwners: state.descForOwners,
  buyerProfile: state.buyerProfile
});

const mapDispatchToProps = dispatch => ({
  fetchAllDescForBuyers: () => dispatch(fetchAllDescForBuyers()),
  fetchAllDescForOwners: () => dispatch(fetchAllDescForOwners()),
  fetchBuyerProfile: (buyerId) => dispatch(fetchBuyerProfile(buyerId)),
  clearBuyerProfile: () => dispatch(clearBuyerProfile()),
  addBuyerProfile: (profile) => dispatch(addBuyerProfile(profile))
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
    this.setState({userLogged: null});
    //Clear user's session
    localStorage.removeItem("userType");
    localStorage.removeItem("userProfile");
    //Clear user's data
    if(this.state.userLogged === 'buyer'){
      this.props.clearBuyerProfile();
    }
  }

  handleLogin(userType){
    localStorage.setItem("userType", userType); //Keep track the user's session
    this.setState({userLogged: userType});
    //Load user's data
    if(userType === 'buyer'){
      let defaultBuyerId = 0;
      this.props.fetchBuyerProfile(defaultBuyerId);
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
    }
    //In case of reloading, remember user's profile, if it exists
    if(localStorage.getItem("userProfile")){
      this.props.addBuyerProfile(JSON.parse(localStorage.getItem("userProfile")));
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
        <IwantToSell descForOwnersData={this.props.descForOwners} userLogged={this.state.userLogged}/>
      );
    }

    const WantToBuyPage = () => {
      return(
        <IwantToBuy descForBuyersData={this.props.descForBuyers} userLogged={this.state.userLogged}
          buyerProfile={this.props.buyerProfile}/>
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
