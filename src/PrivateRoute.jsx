import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
function PrivateRoute({ component : Component,...rest}) {
    return (
        <Route {...rest} 
            render={props => 
                localStorage.getItem("authToken") ?
                <Navigation content={Component} {...props}/>:
                // <Component {...props} /> : 
                <Redirect to={{
                    pathname:'/',
                    state : {from : props.location}
                }}/>
            }
        />
    )
}

export default PrivateRoute
