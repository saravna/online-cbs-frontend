import React from 'react'
import {Switch, Route} from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import Home from './components/Home'
import Menu from './components/Menu'

function AppRouter() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/menu" component={Menu} />
                <PrivateRoute render={() => <h3>Route not found</h3>} />
            </Switch>
        </div>
    )
}

export default AppRouter
