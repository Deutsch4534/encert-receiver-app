import React, { Component } from 'react';
import Logo from '../assets/logo2.png'
import { connect } from 'react-redux';
import { USER_DATA, CERTIFICATE_DATA } from '../redux/actions/signin-action';
import { Container, Row, Col } from 'react-grid-system';
import {
  Link  
} from 'react-router-dom';
import inventLogo from '../assets/invent.png'
import {Card, Input, Icon, Button} from 'antd';
import UserInfo from '../UserInfo';


const blockstack = require('blockstack');
const axios = require('axios');
const { Meta } = Card;

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

    loadPerson() {
        let username = blockstack.loadUserData().username;
        console.log(blockstack.loadUserData().profile.image[0].contentUrl, "user data");
        let userData = blockstack.loadUserData();
    
        if (userData.identityAddress) {
          // alert("Identity exists in server. ", userData.identityAddress);
          let that = this;
          this.props.USER_DATA(userData);
          console.log("Identity exists in server. ", userData.identityAddress);
          axios.get(`https://encert-server.herokuapp.com/issuer/participant/exist/${userData.identityAddress}`, {
          })
          .then(function (response) {
            console.log("Response for id check is: ", response);
            // console.log("Data exists for blockstack ID in server : ", response.data.data.result);
            if (!response.data.data.result) {
              that.setState({ blockStackModalIsVisible: true });
              }
    
    
              blockstack.lookupProfile(username).then((person) => {
                that.setState({ person });
                // console.log("LOOKUP RETURNS: ", person);
              })
    
              axios.get("https://encert-server.herokuapp.com/issuer/certificate/blockstack/" + userData.identityAddress)
                .then(function (response) {
                  // console.log(blockstack.loadUserData().profile.image[0],"image")
                 console.log("Certificate Array is: ", response.data.data.results);
                  // console.log("CERTIFICATES: " + response.data.data.results);
                  let arr = response.data.data.results
                  let displayCerts = arr.map((cert, i) => {
                    console.log(cert,"certificate data")
                    return (
                      <Col style={{marginBottom: '20px'}} md={3} sm={12}>
                      <Link to={{ pathname: "/certificate", search: "?"+cert._id }} target="_blank" onClick={() => that.showModal(cert)} >
                        <Card                    
                          style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}
                          cover={<img alt="example" src={inventLogo} />}
                        // actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                        >
                          <Meta
                            // avatar={<Avatar src={(blockstack.loadUserData().profile.imag=='undefined')?(inventLogo):(blockstack.loadUserData().profile.image[0].contentUrl)} />}
                            title={cert.achievement_title}
                            description={cert.event_name}
                          />
                        </Card>
                      </Link>
                      </Col>
                    );
                  });
                  that.setState({
                    certificates: arr,
                    displayCertificates: displayCerts
                  })
                  console.log(that.state)
                })
    
                .catch(function (error) {
                  console.log(error);
                });
              // console.log(that.state, "state");
    
              that.setState({
                userIdentity: true,
                blockstackIdentity: userData.identityAddress
              })
            })
            .catch(function (error) {
              console.log("Error while fetching identity from server. ", error);
            });
        }
        else {
          alert("No identity found in server.");
        }
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

      componentDidMount() {
        if(blockstack.isUserSignedIn())
        {
          this.loadPerson();          
        }
        else
        {
          this.props.history.push("/");
        }
      }

    render() {
        if(blockstack.isUserSignedIn())
        {        
            return (
                // <div>User is Signed in.</div>
                <div>
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

                <div style={{ display: !this.state.isSignedIn ? 'none' : 'absolute' }}>
                {
                !this.state.blockStackModalIsVisible ?
                    <div>
                    <div>
                        <UserInfo user={this.state.person} />
                    </div>
                    <div className="separator"/>
                    <div>
                        <h1>Your Certifications</h1>
                    </div>
                    <br />
                    <Container>
                        <Row>
                        {this.state.displayCertificates}
                        </Row>
                    </Container>
                    <br />
                    </div>
                    :
                    <div className="email-form">
                    <Input
                        style={{ marginBottom: "10px" }}
                        placeholder="Enter your email address"
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={this.onBlockStackModalEmailChange}
                    />
                    <Button className="signin-btn" loading={this.state.loading} onClick={this.handleblockStackModalOk}>
                        <span style={{ marginLeft: '0px' }} className="signin-btn-text">Submit</span>
                    </Button>
                    {/* <br /><br /> */}
                    </div>
                }
            </div>
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

function mapDispatchToProp(dispatch) {
    return ({
      USER_DATA: (user) => {
        dispatch(USER_DATA(user))
      },
      CERTIFICATE_DATA: (certData) => {
        dispatch(CERTIFICATE_DATA(certData))
      },
    })
  }  

export default connect(null, mapDispatchToProp)(Dashboard);

// export default Dashboard;