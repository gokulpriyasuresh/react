import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, NavLink, Redirect} from 'react-router-dom';
import {NotificationContainer} from 'react-notifications';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'reactstrap';
import { MDBContainer, MDBRow, MDBCol, MDBBtn} from 'mdbreact';
import Route from 'react-router-dom/Route';
import Userlist from "./Userlist";
import createHistory from 'history/createBrowserHistory';
import PropTypes from 'prop-types';
import Usercreate from "./Usercreate";
import Updateuser from "./Updateuser";
import Gridfile from "./Gridfile";
const history = createHistory();



class First extends Component{
    constructor(props){
        super(props)
        this.state = {
            'username' : '',
            'password' : '',
            'message' : '',
            'token' : '',
        }

    }
    static contextTypes = {
        router: PropTypes.object,
    }
    handleUsernameChange = (event) =>{
        this.setState ({
            'username' : event.target.value
        })
    }
    handlePasswordChange = (event) =>{
        this.setState ({
            'password' : event.target.value
        })
    }
    handleSubmitChange = (event) =>{
        axios.post(`/authenticate/user`, {
            "username" : this.state.username,
            "password" : this.state.password
        }).then(res => {
            this.setState({
                    'token' : (res.data.token ? res.data.token : ""),
                    'message' : (res.data.token ? '' : res.data.message),
                });
                if(res.data.token) {
                    sessionStorage.setItem('auth-token', res.data.token);
                    sessionStorage.setItem('testdata', res.data.token);
                    sessionStorage.setItem('loggedinuser', JSON.stringify(res.data.userdetails));
                    this.listActions();
                }
        });
        event.preventDefault();
    }
    listActions = () => {
        //alert(sessionStorage.getItem('loggedinuser'));
        if(sessionStorage.getItem('auth-token')) {
            history.push('/actionlist/');
            window.location.reload();
        }else{
            this.pleaselogin();
        }
    }
    UserList = () =>{
        if(sessionStorage.getItem('auth-token')) {
            history.push('/userlist/');
            window.location.reload();
        }else{
            this.pleaselogin();
        }
    }
    logout = () => {
            sessionStorage.clear();
            history.push('/');
            window.location.reload();
    }
    Back = () => {
        // history.push('/actionlist/');
        // window.location.reload();
        window.history.back();
    }
    CreateUser = () => {
        history.push('/createuser/');
        window.location.reload();
    }
    login = () =>{
        if(sessionStorage.getItem('auth-token')) {
            history.push('/actionlist/');
            window.location.reload();
        }else{
            history.push('/login/');
            window.location.reload();
        }
    }
    pleaselogin =() =>{
        history.push('/continue/');
        window.location.reload();
    }
    Actlist = () => {
        const loggedinuser = JSON.parse(sessionStorage.getItem('loggedinuser'));
        const name = loggedinuser.firstname + " " + loggedinuser.lastname ;
        if(sessionStorage.getItem('auth-token')) {
            return (
                <div>
                    <h2 style={{marginTop : "10%"}}><b>Hello {name} !!!</b></h2>
                <MDBContainer>
                    <MDBRow style={{'paddingTop' : '20%'}}>
                    <MDBCol md = '4'>
                    <MDBBtn className='btn btn-warning btn-1'  onClick={this.UserList}>Click Here to list Users</MDBBtn>
                    </MDBCol>
                    <MDBCol md = '4'>
                    <MDBBtn className='btn btn-success btn-1' onClick={this.CreateUser}>Click Here to Create User</MDBBtn>
                    </MDBCol>
                     <MDBCol md = '4'>
                    <MDBBtn className='btn btn-danger btn-1' onClick={this.logout}>Click Here to logout</MDBBtn>
                    </MDBCol>
                    </MDBRow>
                </MDBContainer>
                </div>
            );
        }else{
            this.pleaselogin();
        }
    }

    render(){
        const errormsg = sessionStorage.getItem('auth-token') ? '' : this.state.message;
        const FormPage =
            <MDBContainer>
                <MDBRow>
                    <Form onSubmit={this.handleSubmitChange}>
                            <p className="h4 text-center mb-4">Log In</p>
                            <div className='errormsgdiv'>
                            {errormsg ? <p><b>{errormsg}</b></p> : null}
                            </div>
                            <label className="grey-text">
                                Username
                            </label>
                            <input
                                type="username"
                                name="username"
                                id="username"
                                required={true}
                                className="form-control"
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                                placeholder="Username"
                                autoComplete="off"
                            />
                            <br />
                            <label className="grey-text">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                required={true}
                                className="form-control"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                placeholder="********"
                                autoComplete="off"
                            />
                            <div className="text-center mt-4">
                                <MDBBtn className='btn btn-success' type="submit">Login</MDBBtn>
                            </div>
                        </Form>
                </MDBRow>
                <br/><br/>
                <Button className='btn-back' onClick={this.Back}>Go Back</Button>
            </MDBContainer>
        return (
            <Router>
                    <div>
                        <Route path="/" exact strict render={() => (
                            <div style={{padding: '10%' }}>
                                <h2>Welcome to My React app</h2>
                                <div style={{padding: '15%' }}>
                                <MDBRow>
                                    <MDBCol>
                                <Button className="btn btn-info btn-1"  onClick={this.login}>Click Here to login</Button>
                                    </MDBCol>
                                    <MDBCol>
                                <Button className="btn btn-info btn-1"  onClick={this.CreateUser}>Click Here to Register</Button>
                                    </MDBCol>
                                </MDBRow>
                                </div>
                            </div>
                        )}/>
                        <Route path="/login/"  render={() => (
                            <div>{ FormPage }</div>
                        )}/>

                        <Route path="/actionlist/" component={this.Actlist} />

                        <Route path="/userlist/" render={() => (
                            <div>
                            <Gridfile/><br/><br/>
                                <Button className='btn-back' onClick={this.Back}>Go Back</Button>
                            </div>
                        )}/>
                        <Route path="/logout/" render={() => (
                            <Redirect to={this.logout}/>
                        )}/>
                        <Route path="/continue/" render={() => (
                            <div style={{marginTop:"10%"}}>Please <NavLink to="/" onClick={this.login}> login </NavLink> to continue...</div>
                        )}/>
                        <Route path="/createuser/" render={() => (
                            <div>
                            <Usercreate/>
                             <NotificationContainer/>
                                <br/><br/>
                            <Button className='btn-back' onClick={this.Back}>Go Back</Button>
                            </div>
                        )}/>
                        <Route path="/updateuser/" render={() => (
                            <div>
                                <Updateuser/>
                                <NotificationContainer/>
                                <br/><br/>
                                <Button className='btn-back' onClick={this.Back}>Go Back</Button>
                            </div>
                        )}/>
                        </div>
            </Router>
        );

        }
}

export default First;