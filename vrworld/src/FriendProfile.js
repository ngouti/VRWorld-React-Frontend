import React, { Component } from 'react';
import './userprofile.css'
import PicturesContainer from './PicturesContainer'

export default class FriendProfile extends Component {

    
    state = {
        user: window.location.pathname,
        userObj: [],
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
        .then(this.parseURL)
        .then(this.profilePicFetch)
        
    }

   parseURL = () => {
       this.setState({
           user: this.state.user.split('/')[2]
       })
   }

    

    profilePicFetch = () => {
        console.log()
        fetch(`http://localhost:3000/users/${this.state.user}`, {
            'method': 'GET',
            'headers': {
              'Authorization': `Bearer ${this.props.token}`
            }
          })
       
        .then(res => res.json())
        .then(res => this.setState({
            userObj: res,
            profile_url: res.profile_url
        }))
        
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
                user_id: this.state.user
                }
            )
        })
    }
    
    vrmode = () => {
        window.location.assign(`http://localhost:8081/index.html`)
    }




    render() {
    console.log("user", this.state.userObj, "url", this.state.URL)
        return (
            <div >
                <PicturesContainer state={this.state} currentUser={this.state.userObj} vrmode={this.vrmode} active={false}/>
               
                }
               
                
         </div>
        );
    }
}

