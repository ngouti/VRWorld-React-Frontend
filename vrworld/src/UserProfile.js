import React, { Component } from 'react';
import './userprofile.css'
import PicturesContainer from './PicturesContainer'

export default class UserProfile extends Component {

    
    state = {
        images: [],
        favorites: [],
        currentImage: null,
        profile_url: ""
    }

    componentDidMount(){
        fetch(`http://10.185.4.163:3000/users/${this.props.currentUser.id}/images`, {
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

   

    resetState = () => {
        fetch(`http://10.185.4.163:3000/users/${this.props.currentUser.id}/images`, {
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
        fetch(`http://10.185.4.163:3000/users/${this.props.currentUser.id}`, {
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
        fetch('http://10.185.4.163:3000/images', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            },
            body: JSON.stringify(
                {
                img_url: this.state.currentImage.url
                }
            )
        })
        .then(this.resetState)
        
    }

   
    
  
    uploadWidget = () => {
        window.cloudinary.openUploadWidget({ cloud_name: 'emmagouti', upload_preset: 'addimage', sources: [ 'local', 'url', 'image_search', "camera"]}, (error, result) => {
            if (result.event === "success")
            this.setState({currentImage: result.info}, () => {this.sendImageToBackend()})
            
            }
            )
    }

    editWidget = () => {
    window.cloudinary.openUploadWidget({ cloud_name: 'emmagouti', upload_preset: 'profilepic', sources: [ 'local', 'url', 'image_search', "camera"]}, (error, result) => {
        if (result.event === "success")
        this.setState({profile_url: result.info.url}, () => {this.updateImage()})
        
        }
        )
    }


         
    handleClick = () => {
        fetch('http://10.185.4.163:3000/collections',{
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
        window.location.assign(`http://10.185.4.163:8081/index.html?user=${this.props.currentUser.id}&token=${this.props.token}`)
    }


    updateImage = () => {
        console.log(this.state.profile_url)
        fetch(`http://10.185.4.163:3000/users/${this.props.currentUser.id}`, {
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
    // console.log(location.host)
        return (
            <div >
               
                <PicturesContainer state={this.state} uploadWidget={this.uploadWidget} editWidget={this.editWidget} currentUser={this.props.currentUser} vrmode={this.vrmode} active={true}/>
               
         </div>
        );
    }
}

