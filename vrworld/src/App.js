
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router'

import LoginPop from './LoginPop'
import Login from './Login'

import SignUp from './SignUp'
import UserProfile from './UserProfile'
import NavBar from './NavBar'
import Home from './Home'
import Images from './Images'
import Friends from './Friends'
import FriendProfile from './FriendProfile'
// import AtvImg from 'react-atv-img';
// import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router'
import './styles.css';


import ScrollAnim from 'rc-scroll-anim'
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import Animate from 'rc-animate';
const ScrollParallax = ScrollAnim.Parallax;
const ScrollElement = ScrollAnim.Element;




class App extends Component {


  state = {
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user')) || null,
    message: ""

    
  }

  reset = () => {
    this.setState({
      reset: !this.state.reset
    })
  }
  


  setCurrentUser = (token, user) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.setState ({ 
      token: token, 
      user: user
    }) 
  }

  logoutUser = () => {
    localStorage.clear()
    this.setState({ token: null, user: null})
  
  }
  
  login = e => {
    e.preventDefault();
    // console.log(e)
    // debugger
    fetch(`http://10.185.3.253:3000/auth` , {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => res.json())
      // .then(res => {
      //   this.props.setUser(res.token, res)
      //   this.props.history.push(`/users/${res.id}/UserProfile`)
    
      //   })

      .then(res => {
        if (res.message === "Wrong username or password") {
          this.setState({ errors: res.message })
        } else {
          this.props.setUser(res.token, res)
          this.props.history.push(`/users/${res.id}/UserProfile`);
        
        }
  });
  }

  


  

  render() {
    console.log(this.state.user)
    return (
      <div className="App">


     
      <Router>
        <React.Fragment>
        
         
        <NavBar currentUser={this.state.user} logout={this.logoutUser}/>
        
       
      
    
        <Switch>
        
              <Route path="/login" render={(props) => <Login {...props} setUser={this.setCurrentUser} />} />
              {/* <Route path="/home" render={(props) => <LoginPop {...props} setUser={this.setCurrentUser} />} /> */}
             
              <Route path="/signup" render={ props => <SignUp {...props} onSignUp={this.setCurrentUser} />}/>

              <Route path="/friends" render={ props => <Friends {...props} token={this.state.token} currentUser={this.state.user} />}/>

              <Route path="/users/:id/UserProfile" component={props => <UserProfile {...props} token={this.state.token} setCurrentUser={this.login} reset={this.reset} currentUser={this.state.user}/>} />
              <Route path="/users/:id/FriendProfile" component={props => <FriendProfile {...props} token={this.state.token} currentUser={this.state.user}/>} />
              {/* <Route path="/users/index" component={props => <AllProfile {...props} token={this.state.token} currentUser={this.state.user}/>} /> */}
              <Route path="/images" component={props => <Images {...props} reset={this.state.reset} token={this.state.token} currentUser={this.state.user}/>} />
        
              <Route path="/" render={(props) => <Home props={props} token={this.state.token} setUser={this.setCurrentUser} currentUser={this.state.user}/>} />
          
        </Switch>
        
        </React.Fragment>
      </Router>
     
      </div>
    );
  }
}

export default App;

