import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

import ScrollAnim from 'rc-scroll-anim'
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import Animate from 'rc-animate';
import './styles.css'
import LoginPop from './LoginPop'

const ScrollParallax = ScrollAnim.Parallax;
const ScrollElement = ScrollAnim.Element;

class Home extends React.Component {

  state = {
    css: { backgroundColor: '#174270', height: 920 },
      cssNoPosition: true,
  }
  onComplete = (e) => {
    console.log(e);
  };

  setCss = (e) => {
    const css = this.state.css;
    console.log(e);
    if (this.state.cssNoPosition) {
      css.position = 'fixed';
      css.top = 0;
    } else {
      css.position = '';
      css.top = '';
    }
    this.setState({
      css,
      cssNoPosition: !this.state.cssNoPosition,
    });
  };

  render() {
    return (
   
      
    <div className="pack-page page0">
        <QueueAnim className="home-title">
          <div className="page-title" key="title">
          <img style={{ width: '70%', height: 'auto' }} src="https://res.cloudinary.com/emmagouti/image/upload/v1551377379/logo2.jpg" alt=""/>

          </div>
        </QueueAnim><br/>
        <div>
        <LoginPop props={this.props.props} local={this.props.local}setUser={this.props.setUser} />
        </div>
      </div>
     
       
    //    <Jumbotron>
    //    <h1 style={{textAlign: "center"}} className="display-3">Welcome to VR World</h1>
    //    <p style={{textAlign: "center"}} className="lead">Browse 360 photos with the Google Cardboard VR!</p>
    //    <hr style={{textAlign: "center"}} className="my-2" />
    //    <p style={{textAlign: "center"}}>To begin, browse photos and favorite them or upload a 360 image.</p>
    //    <p style={{textAlign: "center"}} className="lead">
    //      <Button color="primary">Get Started</Button>
    //    </p>
    //  </Jumbotron>
    
    

  )
            } 
}

export default Home;