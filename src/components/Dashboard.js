import React, { Component } from 'react';
import Logo from '../assets/logo2.png'

const blockstack = require('blockstack');

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    handleSignOut = (event) => {
        event.preventDefault();
        this.props.history.push("/");
        blockstack.signUserOut(window.location.href);
    
    }
    

    detectmob() { 
        if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
        ){
           return true;
         }
        else {
          return false;
        }
      }    

    render() {
        
        if(blockstack.isUserSignedIn())
        {        
            return (
                // <div>User is Signed in.</div>

                <div style={{ display: 'block'}}>
                    <header className="App-header">
                    <div className="headerlogo">
                        <img src={Logo} style={{ width: '100%', heigh: 'auto' }}></img>
                    </div>
                    <div className="header-elements">
                        <h4 style={{ display: this.detectmob() ? 'none' : 'inline-block' }}>Ansur Mehdi</h4>
                        <img className="avatar-header" src={"https://encert.app/static/media/logo-blackweb.09d76c09.png"}></img>
        
                        <a className="link-signout" onClick={this.handleSignOut}>
                            Log out
                        </a>
                    </div>
                    
        
                    </header>
                </div>
      
            );
        }
        else
        {
            this.props.history.push("/");
            return(
                <div>User is NOT Signed in.</div>                
            );
        }
    }

}
 
export default Dashboard;