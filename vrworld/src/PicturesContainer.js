import React, { Component } from 'react';
import './userprofile.css'
import { Card, Button, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody } from 'reactstrap';
import { Jumbotron, Container } from 'reactstrap';


export default class UserProfile extends Component {

    
    


    render() {
    console.log(this.props.active)  
        return (
            <div>
                {this.props.active === true?
                
                <div> 
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
                      
                        <CardColumns>
                        {this.props.state.images ? this.props.state.images.filter(image => image.user_id === this.props.currentUser.id).map(image => (
                            <div className="user">
            <Card>
            
            <CardImg top width="100%" src={image.img_url} alt="Card image cap" />
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <Button>Button</Button>
            </CardBody>
            </Card>
            </div>
            
                        
                        ))
                        
                        :
                        null}
                       
                       </CardColumns>
                     </div>

                     :

                     <div> 
                     <Jumbotron fluid>
                         <Container style={{textAlign: "center"}} fluid>
                         <img height="200px" width="200px" src={this.props.state.profile_url} />
                 
                           <h1  className="display-3">Welcome, {this.props.currentUser.name}.</h1>
                           <p className="lead">Check out my photos!</p>
                    
                           <br/><Button onClick={this.props.vrmode} color="dark">VR MODE</Button>
                         </Container>
                       </Jumbotron>
                           
                             <CardColumns>
                             {this.props.state.images ? this.props.state.images.filter(image => image.user_id === this.props.currentUser.id).map(image => (
                                 <div className="user">
                 <Card>
                 
                 <CardImg top width="100%" src={image.img_url} alt="Card image cap" />
                 <CardBody>
                   <CardTitle>Card title</CardTitle>
                   <Button>Button</Button>
                 </CardBody>
                 </Card>
                 </div>
                 
                             
                             ))
                             
                             :
                             null}
                            
                            </CardColumns>
                          </div>
     
            
            }
        

            
            




         </div> 

        
        );
    }
}

