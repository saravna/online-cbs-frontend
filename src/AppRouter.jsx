import React from 'react'
import {Switch, Route} from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import Home from './components/Home'
import Menu from './components/Menu'
import Orders from './components/Orders/Orders'
import PasswordRecovery from './components/PasswordRecovery'

function AppRouter() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <PrivateRoute path="/menu" component={Menu} />
                <PrivateRoute path="/orders" component={Orders}/>
                {console.log("Hit")}
                <Route path="/recoverpassword" component={PasswordRecovery}
                // render={()=> {
                //     // console.log(window.location.search)
                //     const urlParams = new URLSearchParams(window.location.search);
                //     console.log(urlParams.get('a'))
                //     return <h1>Hello</h1>
                // }}
                ></Route>
                <PrivateRoute render={() => <h3>Route not found</h3>} />
            </Switch>
        </div>
    )
}

export default AppRouter
