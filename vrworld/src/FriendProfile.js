import React, { Component } from 'react';
import './userprofile.css'
import PicturesContainer from './PicturesContainer'

let user = null


export default class FriendProfile extends Component {

    
    state = {
        user: window.location.pathname,
        userObj: [],
        images: [],
        profile_url: ""
    }

    
    componentDidMount(){
        
       user = this.state.user.split('/')[2]
       

        fetch(`http://10.185.6.215:3000/users/${user}/images`, {
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
        fetch(`http://10.185.6.215:3000/users/${user}`, {
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
        fetch('http://10.185.6.215:3000/collections',{
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
        window.location.assign(`http://10.185.6.215:8081/index.html`)
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

