import React from 'react'
import './App.css'
import { BrowserRouter as Router} from 'react-router-dom'
import AppRouter from './AppRouter'
import store from './redux/store'
import {Provider} from 'react-redux'

function App() {
  var URL = "http://localhost:4000"
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <AppRouter URL={URL}/>
        </Router>
      </div>
    </Provider>
  );
}

export default App;


  // "homepage": "https://saravna.github.io/online-cbs-frontend",
