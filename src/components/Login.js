import React, { Component } from 'react';
import blockstackLogo from '../assets/blockstack-icon.svg'
import encertLogo from '../assets/logo-blackweb.png'
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';
import { Button } from 'antd';
import './Login.css';
import './animate.css';

const blockstack = require('blockstack');


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleSignIn = (event) => {
        console.log("Sign in request received.");
        event.preventDefault();
        blockstack.redirectToSignIn();
        //        this.checkSignedInStatus();
    }

    checkSignedInStatus() {
        if (blockstack.isUserSignedIn()) {
            console.log("User signed in.");
            return true;
        } else if (blockstack.isSignInPending()) {
            blockstack.handlePendingSignIn().then(function (userData) {
                window.location = window.location.origin;
                console.log("Waiting for Sign In.");
            });
            return false;
        }
    }

    render() {

        console.log("SignIn: ", blockstack.isSignInPending());

        if (blockstack.isSignInPending()) {
            alert("Sign in request in progress.");
        }
        if (!blockstack.isUserSignedIn()) {
            return (
                <Container>
                    <Row style={{marginTop:'15vh'}}>
                    <Col md={4} sm={3} xs={3}>

                    </Col>

                    <Col md={4} sm={6} xs={6}>
                
                        <div style={{backgroundImage: `url(${encertLogo})`}} className="logo animated  zoomIn delay-1s">
                            
                        </div>
                    </Col>

                    <Col md={4} sm={3} xs={3}>

                    </Col>
                    </Row>

                    <Row>
                    <Col md={4} sm={2} xs={2}>

                    </Col>

                                
                    <Col md={4} sm={8} xs={8}>
                  <div style={{textAlign:'center',marginTop:'2vh'}} className="animated  fadeIn delay-2s">
                   <Button className="signin-btn " onClick={this.handleSignIn} >
                        <img className="blockstack-logo" src={blockstackLogo} />
                        <span className="signin-btn-text">
                            Sign-in With BlockStack
                    </span>
                    
                    </Button>
                    </div>
                  
                    </Col>
                  
                   

                    <Col md={4} sm={2} xs={2}>

                    </Col>  
                    </Row>
                   
                </Container>

            );
        }
        else {
            this.props.history.push("/Dashboard");
        }
    }
}

export default Login;