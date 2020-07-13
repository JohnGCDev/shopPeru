import React from 'react';
import '../App.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchAllDescForBuyers} from '../redux/actions/ActionCreators';
import Header from './HeaderComp';
import Home from './HomeComp';

const mapStateToProps = state => ({
  descForBuyers: state.descForBuyers,
  descForOwners: state.descForOwners
});

const mapDispatchToProps = dispatch => ({
  fetchAllDescForBuyers: () => dispatch(fetchAllDescForBuyers())
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
  }

  render(){
    
    const WantToSell = (props) => {
      return(
        <div>
          <h1>I Want to Sell</h1>
          <p>lorem ipsu dolor bla bla</p>
        </div>
      );
    }

    const WantToBuy = (props) => {
      return(
        <div>
          <h1>I Want to Buy</h1>
          <p>lorem ipsu dolor bla bla</p>
        </div>
      );
    }

    const NavbarSection = () => {
      return(
        <Header isLogged={this.state.isLogged} handleLogin={this.handleLogin} handleLogout={this.handleLogout}/>
      )
    }; 

    const HomePage = () => {
      return(
        <Home descForBuyersData={this.props.descForBuyers} />
      )
    }
  
    return (
      <React.Fragment>
        <NavbarSection/>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route path="/wanttosell" component={WantToSell}/>
          <Route path="/wanttobuy" component={WantToBuy}/>
          <Redirect to="/home"/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
