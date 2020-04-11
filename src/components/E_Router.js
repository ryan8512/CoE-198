import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import E_Home from './Election/E_Home';
import E_Vote from './Election/E_Vote';
import E_Background from './Election/E_Background'
import E_Navation from './Election/E_Navigation';

class E_Router extends Component{
    render(){
        return(
            <BrowserRouter>
            <div>
                <E_Navation/>
                <Switch>
                <Route path="/home" component={E_Home}/>
                <Route path="/vote" component={E_Vote}/>
                <Route path="/background" component={E_Background}/>
                </Switch>
            </div>
            </BrowserRouter>
        );
    }
}

export default E_Router;
