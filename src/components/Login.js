import React, {Component} from 'react';
import blockstackLogo from '../assets/blockstack-icon.svg'
import encertLogo from '../assets/logo-blackweb.png'
import inventLogo from '../assets/invent.png'
import {Button} from 'antd';


const blockstack = require('blockstack');


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    handleSignIn = (event) =>
    {
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
        
        console.log("SignIn: ",blockstack.isSignInPending());

        if(blockstack.isSignInPending())
        {
            alert("Sign in request in progress.");
        }
        if(!blockstack.isUserSignedIn())
        {
            return (
                <div className="signin-container" style={{ display: false ? 'none' : 'block' }}>
                    <div>
                    <img className="logo" src={encertLogo} />
                    </div>
                    <Button className="signin-btn" onClick={this.handleSignIn}>
                    <img className="blockstack-logo" src={blockstackLogo} />
                    <span className="signin-btn-text">
                        Sign-in with Blockstack
                    </span>
                    </Button>
                </div>              
            );
        }
        else
        {
            this.props.history.push("/Dashboard");
        }
    }
}
 
export default Login;