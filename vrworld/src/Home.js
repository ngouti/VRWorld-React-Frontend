import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const Home = (props) => {
  return (
    <div>
      <Jumbotron>
        <h1 style={{textAlign: "center"}} className="display-3">Welcome to VR World</h1>
        <p style={{textAlign: "center"}} className="lead">Browse 360 photos with the Google Cardboard VR!</p>
        <hr style={{textAlign: "center"}} className="my-2" />
        <p style={{textAlign: "center"}}>To begin, browse photos and favorite them or upload a 360 image.</p>
        <p style={{textAlign: "center"}} className="lead">
          <Button color="primary">Get Started</Button>
        </p>
      </Jumbotron>
    </div>
  );
};

export default Home;