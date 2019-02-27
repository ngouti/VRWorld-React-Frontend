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

class App extends Component {


  state = {
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user')) || null,
    message: ""
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
    fetch(`http://localhost:3000/auth` , {
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
             
              <Route path="/signup" render={ props => <SignUp {...props} onSignUp={this.setCurrentUser} />}/>
              <Route path="/friends" render={ props => <Friends {...props} token={this.state.token} currentUser={this.state.user} />}/>

              <Route path="/users/:id/UserProfile" component={props => <UserProfile {...props} token={this.state.token} setCurrentUser={this.login} currentUser={this.state.user}/>} />
              <Route path="/users/:id/FriendProfile" component={props => <FriendProfile {...props} token={this.state.token} currentUser={this.state.user}/>} />
              {/* <Route path="/users/index" component={props => <AllProfile {...props} token={this.state.token} currentUser={this.state.user}/>} /> */}
              <Route path="/images" component={props => <Images {...props} token={this.state.token} currentUser={this.state.user}/>} />
              <Route path="/" render={(props) => <Home {...props} setUser={this.setCurrentUser} />} />
        

          
        </Switch>
        </React.Fragment>
      </Router>
       
      </div>
    );
  }
}

export default App;

