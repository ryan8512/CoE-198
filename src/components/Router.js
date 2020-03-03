import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import Home from './Ubiqutous/Home';
import Error from './Ubiqutous/Error';
import Navigation from './Ubiqutous/Navigation';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Home} exact/>
            <Route component={Error}/>
           </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
 
export default App;