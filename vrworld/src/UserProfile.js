import React, { Component } from 'react';
import './userprofile.css'
import { Card, Button, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody } from 'reactstrap';
import { Jumbotron, Container } from 'reactstrap';


export default class UserProfile extends Component {

    
    state = {
        user: {},
        images: [],
        favorites: [],
        currentImage: null,
        profile_url: ""
    }

    componentDidMount(){
        fetch(`http://localhost:3000/images`, {
            'method': 'GET',
            'headers': {
              'Authorization': `Bearer ${this.props.token}`
            }
          })
       
        .then(res => res.json())
        .then(res => this.setState({
            images: res
        }))
        .then(this.profilePicFetch)
    }

    profilePicFetch = () => {
        console.log()
        fetch(`http://localhost:3000/users/${this.props.currentUser.id}`, {
            'method': 'GET',
            'headers': {
              'Authorization': `Bearer ${this.props.token}`
            }
          })
       
        .then(res => res.json())
        .then(res => this.setState({
            profile_url: res.profile_url
        }))
        
    }



    sendImageToBackend = () => {
        // debugger
       if(this.state.currentImage)
        fetch('http://localhost:3000/images', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            },
            body: JSON.stringify(
                {
                img_url: this.state.currentImage.url,
                user_id: this.props.currentUser.id
                }
            )
        })
        // .then(this.componentDidMount)
        
    }

   
    
  
    uploadWidget = () => {
        window.cloudinary.openUploadWidget({ cloud_name: 'emmagouti', upload_preset: 'addimage', sources: [ 'local', 'url', 'image_search', "camera"]}, (error, result) => {
            if (result.event === "success")
            this.setState({currentImage: result.info}, () => {this.sendImageToBackend()})
            
            }
            )
       
         }

         editWidget = () => {
            window.cloudinary.openUploadWidget({ cloud_name: 'emmagouti', upload_preset: 'addimage', sources: [ 'local', 'url', 'image_search', "camera"]}, (error, result) => {
                if (result.event === "success")
                this.setState({profile_url: result.info.url}, () => {this.updateImage()})
                
                }
                )
         }


         
    handleClick = () => {
        fetch('http://localhost:3000/collections',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            },
            body: JSON.stringify(
                {
                user_id: this.props.currentUser.id
                }
            )
        })
    }
    
    vrmode = () => {
        window.location.assign(`http://localhost:8081/index.html`)
    }

    updateImage = () => {
        console.log(this.state.profile_url)
        fetch(`http://localhost:3000/users/${this.props.currentUser.id}`, {
            'method': 'PATCH',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            },
            'body': JSON.stringify({
                profile_url: this.state.profile_url
            })
          })
        //   .then(this.props.login)
        
    }


    render() {
    //   this.profilePicFetch()
        return (
            <div >
    <Button onClick={this.editWidget} id="upload_widget" class="cloudinary-button" color="primary">Upload</Button>
    <Jumbotron fluid>
        <Container style={{textAlign: "center"}} fluid>
        <img height="200px" width="200px" src={this.state.profile_url} />
          <h1  className="display-3">Welcome, {this.props.currentUser.name}.</h1>
          <p className="lead">Upload your images and view them in VR.</p>
          <Button onClick={this.uploadWidget} id="upload_widget" class="cloudinary-button" color="primary">Upload</Button> <br/>
          <br/><Button onClick={this.vrmode} color="primary">VR MODE</Button>
        </Container>
      </Jumbotron>
           {/* <iframe src="http://localhost:8081/index.html" allow=" xr; ar;"></iframe>
           <iframe src="http://localhost:8081/index.html" allow="gyroscope; accelerometer; ar"></iframe>
           <iframe src="http://localhost:8081/index.html" allow="gyroscope; accelerometer; xr"></iframe> */}
          {/* <button onClick={this.vrmode}> VR</button> */}

            {/* <button onClick={this.uploadWidget} id="upload_widget" class="cloudinary-button">Upload Image</button> */}
            <CardColumns>
            {this.state.images ? this.state.images.filter(image => image.user_id === this.props.currentUser.id).map(image => (
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

