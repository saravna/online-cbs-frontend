import React from 'react'
import './App.css'
import { BrowserRouter as Router} from 'react-router-dom'
import AppRouter from './AppRouter'

function App() {
  return (
      <div className="App">
        <Router>
          <AppRouter URL={URL}/>
        </Router>
      </div>
  );
}

export default App;


  // "homepage": "https://saravna.github.io/online-cbs-frontend",
