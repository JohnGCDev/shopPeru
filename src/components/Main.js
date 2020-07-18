import React from 'react';
import '../App.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap-social/bootstrap-social.css';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchAllDescForBuyers, fetchAllDescForOwners} from '../redux/actions/ActionCreators';
import Header from './HeaderComp';
import Footer from './FooterComp';
import Home from './HomeComp';
import IwantToBuy from './BuyComp';
import IwantToSell from './SellComp';

const mapStateToProps = state => ({
  descForBuyers: state.descForBuyers,
  descForOwners: state.descForOwners
});

const mapDispatchToProps = dispatch => ({
  fetchAllDescForBuyers: () => dispatch(fetchAllDescForBuyers()),
  fetchAllDescForOwners: () => dispatch(fetchAllDescForOwners())
});

class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {isLogged: false};
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    this.setState({isLogged: false});
  }

  handleLogin(){
    this.setState({isLogged: true});
  }

  componentDidMount(){
    this.props.fetchAllDescForBuyers();
    this.props.fetchAllDescForOwners();
  }

  render(){
    
    const WantToSellPage = () => {
      return(
        <IwantToSell descForOwnersData={this.props.descForOwners}/>
      );
    }

    const WantToBuyPage = () => {
      return(
        <IwantToBuy descForBuyersData={this.props.descForBuyers}/>
      );
    }

    const NavbarSection = () => {
      return(
        <Header isLogged={this.state.isLogged} handleLogin={this.handleLogin} handleLogout={this.handleLogout}/>
      )
    }; 

    const HomePage = () => {
      return(
        <Home descForBuyersData={this.props.descForBuyers} descForOwnersData={this.props.descForOwners}/>
      )
    }
  
    return (
      <React.Fragment>
        <NavbarSection/>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route path="/wanttosell" component={WantToSellPage}/>
          <Route path="/wanttobuy" component={WantToBuyPage}/>
          <Redirect to="/home"/>
        </Switch>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
