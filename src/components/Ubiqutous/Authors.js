import React from 'react';
import {Card, CardBody, Button, CardTitle, CardText, CardImg, CardSubtitle, Jumbotron} from 'reactstrap';
 
const Authors = () => {
    return (
    <div>
      <Jumbotron className="jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Authors and Developers</h1>
                <p className="lead">Get to know the main developers for this project</p>
              </div>
       </Jumbotron>
       <div className="row">
         <div className="col px-5">
         <Card>
          <CardImg top width="100%" alt="Card image cap" />
          <CardBody>
            <CardTitle className="display-4">John Raphael Pascua</CardTitle>
            <CardSubtitle>Back-end Engineeer</CardSubtitle>
            <CardText>John is responsible for how the inner working works. He is also responsible for 
              the specification of the network and procurement of data in the whitepaper.</CardText>
            <Button>Learn More About Him</Button>
          </CardBody>
         </Card>
         </div>
         <div className="col">
         <Card>
          <CardImg top width="100%" alt="Card image cap" />
          <CardBody>
            <CardTitle className="display-4">Samuel Ryan Tan</CardTitle>
            <CardSubtitle>Front-end Engineeer</CardSubtitle>
            <CardText>Sam is responsible for the front-end design, while integrating it with the backend. Sam is
              also responsible for testing the system together with setting up a preliminary test. He is also
              responsible for the processing of data in the whitepaper. </CardText>
            <Button>Learn More About Him</Button>
          </CardBody>
         </Card>
         </div>
       </div>
       
    </div>
    );
}
 
export default Authors;