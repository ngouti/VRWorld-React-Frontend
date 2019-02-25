import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, Row, Col } from 'reactstrap';
    


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
        }

        parseThroughFollows = () => {
            this.state.follows.filter(follow => follow.follower_id === this.props.currentUser.id (
                this.state.users.filter(user => (user.id === follow.following_id))
            ))
        }

        render(){
            console.log(this.state.follows)
            return (
                <div>
                    {/* {} */}

                    {this.state.users.map(user => (
                        <Row>
                        <Col sm="6">
                            <Card body>
                            <CardTitle>{user.name}</CardTitle>
                            <CardImg top width="100%" src={user.profile_url} alt="Card image cap" />
                            <Button onClick={(e) => this.addFollower(user)}>Follow</Button>
                            </Card>
                        </Col>
                        </Row>
                    ))}
                
                </div>
              );

        }
        
      };
      
