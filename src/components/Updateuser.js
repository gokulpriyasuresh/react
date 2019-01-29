import React, {Component} from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBBtn } from 'mdbreact';
import {Form} from 'reactstrap';
import createHistory from 'history/createBrowserHistory';
import PropTypes from 'prop-types';
import {NotificationManager} from "react-notifications";
const history = createHistory();



class Updateuser extends Component{
    constructor(props){
        super(props)
        this.state = {
            'firstname' : '',
            'lastname' : '',
            'username' : '',
            'email' : '',
            'currentpassword' : '',
            'newpassword' : '',
            'message' : '',
            'code' : '',
            'updateflag' : true,
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
    CurrPasswordChange = (event) =>{
        this.setState ({
            'currentpassword' : event.target.value
        })
    }
    NewPasswordChange = (event) =>{
        this.setState ({
            'newpassword' : event.target.value
        })
    }
    updateSubmitChange = (event) =>{
        const querys = window.location.search;
        const bodydata = {
            "firstname" : this.state.firstname,
            "lastname" : this.state.lastname,
            "username" : this.state.username,
            "email" : this.state.email,
            "currentpassword" : this.state.currentpassword,
            "newpassword" : this.state.newpassword
        };
        axios.put(`/authentication/updateuser/`+querys, bodydata)
            .then(res => {
            this.setState({
                'message' : res.data.message,
                'code' : res.data.code ? res.data.code : 400,
            });
                this.createNotification(res.data.code , res.data.message );
        });

        event.preventDefault();
    }
    pleaselogin =() =>{
        history.push('/continue/');
        window.location.reload();
    }
    getUserDetails = () =>{
        if(sessionStorage.getItem('auth-token')) {
            const querys = window.location.search;
            axios.get('/authentication/getuser/' + querys)
                .then(res => {
                    if (res) {
                        this.setState({
                            "firstname": res.data.firstname,
                            "lastname": res.data.lastname,
                            "username": res.data.username,
                            "email": res.data.email,
                            "updateflag": false,
                        });
                    }
                });
        }else{
            this.pleaselogin();
        }
    }
    createNotification = (code , msg ) => {
        switch (code) {
            case 200 :
                NotificationManager.success(msg,'', 7000);
                break;
            case 400 :
                NotificationManager.error(msg, 'User update failed',7000);
                break;
            default :
                NotificationManager.error(msg, 'User update failed',7000);
                break;
        }
    };
    render(){
        const update = (window.location.search && this.state.updateflag) ? true : false;
        if(update){
            this.getUserDetails()
        }
        const updateuser = <MDBContainer>
            <MDBRow>
                <Form onSubmit={this.updateSubmitChange}>
                    <p className="h3 text-center mb-4">Update User Details</p>
                    <label className="grey-text">
                        Firstname
                    </label>
                    <input type="text" name="firstname" id="firstname" required={true} className="form-control" autoComplete="off"
                           value= {this.state.firstname}
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
                           readOnly={true}
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
                        Current Password
                    </label>
                    <input type="password" name="currpassword" id="currpassword" required={true} className="form-control" autoComplete="off"
                           value={this.state.currentpassword}
                           onChange={this.CurrPasswordChange}
                           placeholder="*********"
                    /><br />
                    <label className="grey-text">
                        New Password
                    </label>
                    <input type="password" name="newpassword" id="newpassword" required={true} className="form-control" autoComplete="off"
                           value={this.state.newpassword}
                           onChange={this.NewPasswordChange}
                           placeholder="*********"
                    />
                    <div className="text-center mt-4">
                        <MDBBtn className='btn btn-primary' type="submit">Submit</MDBBtn>
                    </div>
                </Form>
            </MDBRow>
        </MDBContainer>
        return (
            <div>{ updateuser }</div>
        );

    }
}

export default Updateuser;