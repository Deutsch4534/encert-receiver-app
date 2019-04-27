import React, { Component } from 'react';
import blockstackLogo from '../assets/blockstack-icon.svg'
import encertLogo from '../assets/logo-blackweb.png'
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';
import { Button } from 'antd';
import './Login.css';
import './animate.css';
import inventLogo from '../assets/invent.png'
import {Button} from 'antd';
import Loader from 'react-loader-spinner';
import { css } from '@emotion/core';
// First way to import
import { SyncLoader } from 'react-spinners';

const blockstack = require('blockstack');

const override = css`
    display: block;
    margin: 10px;
`;

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

    checkSignedInStatus = () => {
        let that = this;
        if (blockstack.isUserSignedIn()) {
            console.log("User signed in.");
            // that.props.history.push("/google");
            return true;
        } else if (blockstack.isSignInPending()) {
          blockstack.handlePendingSignIn().then(function (userData) {
            window.location = window.location.origin;
            console.log("UserData: ", userData);
            // that.props.history.push("/google1");
            // this.props.history.push("/Dashboard");
          });
          console.log("False bhejrha hoon.");
          return false;
        }
    }

    render() { 
        
        if(blockstack.isSignInPending())
        {
            console.log("Sign in request in progress.");
            blockstack.handlePendingSignIn().then(() => {
                this.props.history.push("/Dashboard");
            });
            return(
                <div>
                    {/* <Loader 
                    type="Grid"
                    color="#5cdb95"
                    height="300"	
                    width="300"
                    /> */}
                    <SyncLoader
                    css={override}
                    sizeUnit={"px"}
                    size={30}
                    color={'rgb(54,215,183)'}
                    loading={true}
                    />
                    <h1>Signing in....</h1>
                </div>
           );
        }
        else
        {            
            console.log("Sign in request completed.");
        }
        if(!this.checkSignedInStatus())
        {
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
            return (
                <div></div>
            );
        }
    }
}

export default Login;