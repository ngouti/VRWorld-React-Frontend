import React, { Component } from 'react'
import { Route, Link} from 'react-router-dom'
import NavBar from './NavBar'
import { Card, Button, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import './images.css'

// const active = this.props.reset;
export default class Images extends Component {

    state = {
        images: [],
        collections: [],
        users: []
    }

    componentDidMount = () => {
        fetch('http://10.185.3.253:3000/images', {
          'method': 'get',
          'headers': {
            'Authorization': `Bearer ${this.props.token}`
          }

        })
        .then(res => res.json())
        .then( json => this.setState({
          images: json
    }))
       
    }

    

  handleClick = (image) => {
    console.log(image)
    fetch('http://10.185.3.253:3000/collections', {
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

            

        <div className="flexcontainer">
             <Row>
             {this.state.images.map((image) => (
                
                      <Col sm="6">
                          <Card body style={{textAlign: "center"}}>
                          <CardImg top height="70%" width="70%" src={image.img_url} alt="Card image cap" />
                        
                          <br/><Button onClick={() => this.handleClick(image.id)}>Add to my collection</Button>
                          </Card>
                      </Col>
                     ))}
                        </Row> 
    
        
          
        </div>
        
        )
    }
}






