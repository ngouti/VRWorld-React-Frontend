import React, { Component } from 'react'
import { Route, Link} from 'react-router-dom'
import NavBar from './NavBar'

import { Container, Row, Col } from 'reactstrap';

export default class Images extends Component {

    state = {
        images: [] 
    }

    componentDidMount = () => {
        fetch('http://10.185.7.95:3000/images', {
          'method': 'get',
          'headers': {
            'Authorization': `Bearer ${this.props.token}`
          }

        })
        .then(res => res.json())
        .then( json => this.setState({
          images: json
    }))}

  handleClick = (image) => {
    console.log(image)
    fetch('http://10.185.7.95:3000/collections', {
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

    render() {
      console.log(this.state.images)
        return (
        <div>
            
            
            <Container>
            <Row>
            {this.state.images.map((image) => (
                 <Col xs="6"> 
                 <img src={image.img_url} width="100px" height="100px"/>
                 <button onClick={() => this.handleClick(image.id)}>Fave</button>
                 </Col>
                 ))}
                 </Row>
        
        </Container>
            
        
          
        </div>
        )
    }
}






