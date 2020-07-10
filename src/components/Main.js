import React from 'react';
import '../App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from './HeaderComp';

function Main() {

  const Home = (props) => {
    return(
      <div>
        <h1>Home Page</h1>
        <p>lorem ipsu dolor bla bla</p>
      </div>
    );
  }

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


  return (
    <React.Fragment>
      <Header/>
      <Switch>
        <Route path="/home" component={Home}/>
        <Route path="/wanttosell" component={WantToSell}/>
        <Route path="/wanttobuy" component={WantToBuy}/>
        <Redirect to="/home"/>
      </Switch>
    </React.Fragment>
  );
}

export default Main;
