import React from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/a/:value" render={()=><h1>Hello user</h1>}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;