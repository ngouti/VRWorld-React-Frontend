import React, { Component } from 'react'
import { Route, Link} from 'react-router-dom'
import NavBar from './NavBar'
import { Card, Button, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody, FormGroup, FormText, Label, Input } from 'reactstrap';
import { Container, Row, Col, Form} from 'reactstrap';
import './images.css'
import Comment from './Comment'

// const active = this.props.reset;
export default class Images extends Component {

    state = {
        images: [],
        collections: [],
        users: [],
        comment: "",
        comments: []
    }

    componentDidMount = () => {
        fetch(`http://${this.props.local}:3000/images`, {
          'method': 'get',
          'headers': {
            'Authorization': `Bearer ${this.props.token}`
          }

        })
        .then(res => res.json())
        .then( json => this.setState({
          images: json
    }))
       .then(this.fetchUsers)
       .then(this.fetchComments)
    }

    fetchUsers = () => {
        fetch(`http://${this.props.local}:3000/users`, {
        'method': 'get',
        'headers': {
          'Authorization': `Bearer ${this.props.token}`
        }
      })
        .then(res => res.json())
        .then(res => this.setState({
            users: res
        }))
    }
    fetchComments = () => {
      fetch(`http://${this.props.local}:3000/comments`, {
        'method': 'get',
        'headers': {
          'Authorization': `Bearer ${this.props.token}`
        }
      })
        .then(res => res.json())
        .then(res => this.setState({
            comments: res
        }))
    }

  handleClick = (image) => {
    console.log(image)
    fetch(`http://${this.props.local}:3000/collections`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.token}`
      },
      body: JSON.stringify(
          {
          image_id: image,
          user_id: this.props.currentUser.id
          }
      )
  })
  }

  getComment = (e) => {
    e.preventDefault()
    this.setState({
      comment: e.target.value
    })
  }

  submitComment = (id) => {
    
    fetch(`http://${this.props.local}:3000/comments`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.token}`
      },
      body: JSON.stringify(
          {
          image_id: id,
          user_id: this.props.currentUser.id,
          content: this.state.comment
          }
      )
        })
        .then(this.fetchComments)
  }

  
    render() {
        let name;
    //    console.log(this.state.images) 
    //    console.log("user", this.state.users)
        // console.log("THISISIT",this.state.images.map(image => {
        //     return(this.state.users.find( user => {
        //         return (user.id === image.creator_id)
        //     }))
        // }))
console.log(this.props.currentUser.name)
        return (

            

        <div className="flexcontainer">
             <Row>
             {this.state.images.map((image) => (
                      <Col sm="6">
                          <Card body style={{textAlign: "center"}}>
                          <CardImg top height="70%" width="70%" src={image.img_url} alt="Card image cap" />
                          
                        {this.state.users.length > 0 ? 
                            <CardTitle>
                               Uploaded By: {this.state.users.find( user => {
                                    return user.id === image.creator_id
                                }).name}
                            </CardTitle>
                        : null}
                          <br/><Button onClick={() => this.handleClick(image.id)}>Add to my collection</Button>
                          </Card>
                          <Comment users={this.state.users} comments={this.state.comments.filter(comment => comment.image_id === image.id)} />
                          <Form onSubmit={() => this.submitComment(image.id)}>
                          <FormGroup>
                      <Label for="exampleText">Drop a Comment!</Label>
                      <Input onChange={(e) => this.getComment(e)}type="textarea" name="text" id="exampleText" />
                    </FormGroup>
                    <Button>Submit!</Button>
                    </Form>
                      </Col>
                     ))}
                        </Row> 
                                
                       
          
        </div>
        
        )
    }
}






