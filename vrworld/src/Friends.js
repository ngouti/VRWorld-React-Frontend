import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, Row, Col } from 'reactstrap';
import './friends.css'    


    export default class Friends extends React.Component  {

        state = {
            users: [],
            follows: []
        }

        componentDidMount(){
            fetch(`http://localhost:3000/users`, {
            'method': 'GET',
            'headers': {
              'Authorization': `Bearer ${this.props.token}`
            }
          })
       
        .then(res => res.json())
        .then(res => this.setState({
            users: res
        }))
        .then(this.getFollowers)
        // .then(this.parseThroughFollows)  
        }

        addFollower = (friend) => {
            fetch(`http://localhost:3000/${friend.username}/follow_user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            },
            body: JSON.stringify(
                {
                following_id: friend.id,
                follower_id: this.props.currentUser.id
                }
            )
        })
        .then(this.getFollowers)
        }

        getFollowers = () => {
            fetch(`http://localhost:3000/users/following/${this.props.currentUser.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            }
        })
        .then(res => res.json())
        .then(res => this.setState({
            follows: res
        }))
        .then(this.parseThroughFollows)
        }

        parseThroughFollows = () => {
            this.setState({
                follows: this.state.follows.filter(follow => follow.follower_id === this.props.currentUser.id)
            })
        }

        goToFriendsPage = (user) => {
            this.props.history.push(`/users/${user.id}/UserProfile`);
        }

        removeFollower = (friend) => {
            fetch(`http://localhost:3000/${friend.username}/unfollow_user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.token}`
                },
                body: JSON.stringify(
                    {
                    following_id: friend.id,
                    follower_id: this.props.currentUser.id
                    }
                )
            })
            .then(this.getFollowers)
        }
        
        render(){
            console.log(this.state.follows)
            return (
                <div >
                    
                <div className="card">
                   <h2 style={{textAlign: "center"}}>Following</h2>
                   <Row>
                   {this.state.follows.map(follow => (
                      
                      <Col sm="6">
                          <Card body style={{textAlign: "center"}}>
                          
                          <CardImg top height="70%" width="70%" src={follow.following.profile_url} alt="Card image cap" />
                          <CardTitle>{follow.following.name}</CardTitle>
                          <Button onClick={(e) => this.removeFollower(follow.following)}>Unfollow</Button>
                          </Card>
                      </Col>
                     
                   ))}
                   </Row> <br/>
                   </div>
                   <div className="card2">
                    <h2 style={{textAlign: "center"}}>All Users</h2>
                    <Row>
                    {this.state.users.map(user => (
                        
                        <Col sm="6">
                            <Card style={{textAlign: "center"}} body >
                            <CardImg top width="100%" src={user.profile_url} alt="Card image cap" />
                            <CardTitle onClick={this.goToFriendsPage}>{user.name}</CardTitle>
                            <Button  onClick={(e) => this.addFollower(user)}>Follow</Button>
                            </Card>
                        </Col>
                        
                    ))}
                </Row>
                </div>
                
                </div>
              );

        }
        
      };
      
