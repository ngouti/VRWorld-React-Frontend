import React, { Component } from 'react';
import './userprofile.css'
import { Card, Button, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody } from 'reactstrap';
import { Jumbotron, Container } from 'reactstrap';


export default class UserProfile extends Component {

    
    


    render() {
    //   this.profilePicFetch()
        return (
            <div >
               
    <Jumbotron fluid>
        <Container style={{textAlign: "center"}} fluid>
        <img height="200px" width="200px" src={this.props.state.profile_url} />

          <h1  className="display-3">Welcome, {this.props.currentUser.name}.</h1>
          <p className="lead">Upload your images and view them in VR.</p>
    <Button onClick={this.props.editWidget} id="upload_widget" class="cloudinary-button" color="light">Edit Profile Picture</Button> <br/>

          <br/><Button onClick={this.props.uploadWidget} id="upload_widget" class="cloudinary-button" color="light">Upload a Photo</Button> <br/>
          <br/><Button onClick={this.props.vrmode} color="dark">VR MODE</Button>
        </Container>
      </Jumbotron>
           {/* <iframe src="http://localhost:8081/index.html" allow=" xr; ar;"></iframe>
           <iframe src="http://localhost:8081/index.html" allow="gyroscope; accelerometer; ar"></iframe>
           <iframe src="http://localhost:8081/index.html" allow="gyroscope; accelerometer; xr"></iframe> */}
          {/* <button onClick={this.vrmode}> VR</button> */}

            {/* <button onClick={this.uploadWidget} id="upload_widget" class="cloudinary-button">Upload Image</button> */}
            <CardColumns>
            {this.props.state.images ? this.props.state.images.filter(image => image.user_id === this.props.currentUser.id).map(image => (
                <div className="user">
<Card>
{/* <div class="iframe-container">
              <iframe src="http://localhost:8081/index.html" allowfullscreen ></iframe>
              </div> */}
<CardImg top width="100%" src={image.img_url} alt="Card image cap" />
<CardBody>
  <CardTitle>Card title</CardTitle>
  <Button>Button</Button>
</CardBody>
</Card>
</div>

            //      <div className="user">
            //   <Card>
            //   <div class="iframe-container">
            //   <iframe src={image.img_url} allowfullscreen ></iframe>
            //   </div>
            //   <CardBody>
            //     <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            //     <CardLink href="#">Card Link</CardLink>
            //     <CardLink href="#">Another Link</CardLink>
            //   </CardBody>
            // </Card>
            //    </div>
            
            ))
            
            :
            null}
           
           </CardColumns>
         </div>
        );
    }
}

