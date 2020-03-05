import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import Home from './Ubiqutous/Home';
import Error from './Ubiqutous/Error';
import Navigation from './Ubiqutous/Navigation';
import Footer from './Ubiqutous/Footer';
import Overview from './Ubiqutous/Overview';
import Authors from './Ubiqutous/Authors';
import Support from './Ubiqutous/Support';
import App from './Registration/App';
 
class Router extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/overview" component={Overview}/>
             <Route path="/authors" component={Authors}/>
             <Route path="/support" component={Support}/>
             <Route path="/registration" component={App}/>
            <Route component={Error}/>
           </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
 
export default Router;