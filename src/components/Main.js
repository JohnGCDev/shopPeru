import React from 'react';
import '../App.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from './HeaderComp';
import Home from './HomeComp';

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
  
    return (
      <React.Fragment>
        <NavbarSection/>
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/wanttosell" component={WantToSell}/>
          <Route path="/wanttobuy" component={WantToBuy}/>
          <Redirect to="/home"/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default Main;
