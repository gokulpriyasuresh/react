import React, {Component} from 'react';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import { Form} from 'reactstrap';
import { MDBContainer, MDBRow, MDBBtn} from 'mdbreact';
import 'react-notifications/lib/notifications.css';
import createHistory from 'history/createBrowserHistory';
import PropTypes from 'prop-types';
const history = createHistory();





class Usercreate extends Component{
    constructor(props){
        super(props)
        this.state = {
            'firstname' : '',
            'lastname' : '',
            'username' : '',
            'email' : '',
            'password' : '',
            'message' : '',
            'code' : '',
        }

    }
    static contextTypes = {
        router: PropTypes.object,
    }
    FirstNameChange = (event) =>{
        this.setState ({
            'firstname' : event.target.value
        })
    }
    LastNameChange = (event) =>{
        this.setState ({
            'lastname' : event.target.value
        })
    }
    UserNameChange = (event) =>{
        this.setState ({
            'username' : event.target.value
        })
    }
    EmailChange = (event) =>{
        this.setState ({
            'email' : event.target.value
        })
    }
    PasswordChange = (event) =>{
        this.setState ({
            'password' : event.target.value
        })
    }
    successRedirect =(username) =>{
        history.push('/updateuser/?username='+username);
        window.location.reload();

    }
    SubmitChange = (event) =>{
        axios.post(`/authentication/createuser/`, {
            "firstname" : this.state.firstname,
            "lastname" : this.state.lastname,
            "username" : this.state.username,
            "email" : this.state.email,
            "password" : this.state.password
        }).then(res => {
            this.setState({
                        'message' :  res.data.message,
                        'code' : res.data.code ? res.data.code : 400,
             });
             this.createNotification(res.data.code , res.data.message ,this.state.username);
        });

        event.preventDefault();
    }
    createNotification = (code , msg , username) => {
            switch (code) {
                case 200 :
                    NotificationManager.success(msg, 'Click here to update the user', 7000, () => {this.successRedirect(username);
                    });
                    break;
                case 400 :
                    NotificationManager.error(msg, 'Usercreation failed',7000);
                    break;
                default :
                    NotificationManager.error(msg, 'Usercreation failed',7000);
                    break;
            }
    };
    render(){
        var pagename = (sessionStorage.getItem('auth-token')) ? 'Create User' : 'Registration';
        const usercreation = <MDBContainer>
            <MDBRow>
                <Form onSubmit={this.SubmitChange}>
                    <p className="h3 text-center mb-4">{pagename}</p>
                    <label className="grey-text">
                        Firstname
                    </label>
                    <input type="text" name="firstname" id="firstname" required={true} className="form-control" autoComplete="off"
                        value={this.state.firstname}
                        onChange={this.FirstNameChange}
                        placeholder="Firstname"
                    />
                    <br />
                    <label className="grey-text">
                        Lastname
                    </label>
                    <input type="text" name="lastname" id="lastname" required={true} className="form-control" autoComplete="off"
                        value={this.state.lastname}
                        onChange={this.LastNameChange}
                        placeholder="Lastname"
                     /><br />
                    <label className="grey-text">
                        Username
                    </label>
                    <input type="text" name="username" id="username" required={true} className="form-control" autoComplete="off"
                        value={this.state.username}
                        onChange={this.UserNameChange}
                        placeholder="Username"
                    /><br />
                    <label className="grey-text">
                        Email
                    </label>
                    <input type="email" name="email" id="email" required={true} className="form-control" autoComplete="off"
                        value={this.state.email}
                        onChange={this.EmailChange}
                        placeholder="myemail@email.com"
                    /><br />
                    <label className="grey-text">
                        Password
                    </label>
                    <input type="password" name="password" id="password" required={true} className="form-control" autoComplete="off"
                        value={this.state.password}
                        onChange={this.PasswordChange}
                        placeholder="*********"
                    />
                    <div className="text-center mt-4">
                        <MDBBtn className='btn btn-primary' type="submit">Submit</MDBBtn>
                    </div>
                </Form>
            </MDBRow>
        </MDBContainer>
        return (
            <div>{ usercreation }</div>
        );

    }
}

export default Usercreate;