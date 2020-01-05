import React from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Menu from './components/Menu'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/menu" component={Menu}></Route>
          {/* <Route exact path="/success"><h1>Hello Success</h1></Route> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
