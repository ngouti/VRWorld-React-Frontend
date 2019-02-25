import React from 'react'
import { Col, Form, FormGroup, Label, Input} from 'reactstrap';
// import './login.css'
import { Alert } from "react-bootstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class LoginPop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          token: localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user')) || null,
          username: '',
          password: '',
          errors: null
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }

    
    
      setCurrentUser = (token, user) => {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        this.setState ({ 
          token: token, 
          user: user
        }) 
      }

    routeTo = url => {
        this.props.history.push(url)
      }

      handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
  
  
    errorBox() {
      
      if (  this.state.errors) {
        return (
          <Alert role="alert">
            {  this.state.errors}
          </Alert>
        )    
      }
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
              this.setCurrentUser(res.token, res)
              this.props.history.push(`/users/${res.id}/UserProfile`);
            }
      });
      }
    
    
      render() {
        console.log(this.props)


        return (
      <div>
        <Button color="danger" onClick={this.toggle}>Login</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Please Login!</ModalHeader>
          <ModalBody>
          <Form>
                <FormGroup row>
                <Label for="exampleEmail" sm={2}>Username</Label>
                <Col sm={7}>
                    <Input onChange={this.handleChange} value={this.state.username} name="username" type="text" placeholder="ex: emma" bsSize="lg" />
                </Col>
                </FormGroup>
                <FormGroup row>
                <Label for="exampleEmail2" sm={2}>Password</Label>
                <Col sm={7}>
                    <Input onChange={this.handleChange} value={this.state.password} name="password" type="password" placeholder="" />
                </Col>
                </FormGroup>
                {/* <Button onClick={this.login}>Submit</Button> */}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.login}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default LoginPop;

//           <h1>Login</h1>
//               <Form>
//                 <FormGroup row>
//                 <Label for="exampleEmail" sm={2} size="lg">UserName</Label>
//                 <Col sm={10}>
//                     <Input onChange={this.handleChange} value={this.state.username} name="username" type="text" placeholder="UserName" bsSize="lg" />
//                 </Col>
//                 </FormGroup>
//                 <FormGroup row>
//                 <Label for="exampleEmail2" sm={2}>Password</Label>
//                 <Col sm={10}>
//                     <Input onChange={this.handleChange} value={this.state.password} name="password" type="text" placeholder="Password" />
//                 </Col>
//                 </FormGroup>
//                 <Button onClick={this.login}>Submit</Button>
//             </Form>


            
//           </div>
//           </div>
//         )
//       }
    
      
// }



// export default Login