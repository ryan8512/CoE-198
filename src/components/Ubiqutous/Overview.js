import React from 'react';
import {Jumbotron} from 'reactstrap';

const Overview = () => {
    return (
        <div> 
        <Jumbotron className="jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Tutorial</h1>
                <p className="lead">Conceptual and Practical Tutorial on how to use the web application. </p>
              </div>
        </Jumbotron>
        <div className="container">
            <h3> Assymetic Encryption </h3>
            <hr/>
            <h3> Step-by-Step Screenshots </h3>
            <hr/>
        </div>
        </div>
    );
}
 
export default Overview;