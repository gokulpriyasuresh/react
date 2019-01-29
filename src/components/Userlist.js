import React, {Component} from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'font-awesome/css/font-awesome.min.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-fresh.css';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

class Userlist extends Component{

    constructor(props){
        super(props)
        this.state = {
            users     : [],
            columnDefs: [
                {headerName: 'Firstname', field: 'firstname'},
                {headerName: 'Lastname', field: 'lastname'},
                {headerName: 'Username', field: 'username'},
                {headerName: 'Email', field: 'email'},
                {headerName: 'Actions', field: 'link', cellRenderer: function(params) {
                        return (`<a href = ${params.value} style="font-size: 20px;" class="fa fa-eye" ></a>`);
                    }},
            ],
            rowData: []
        }

    }
    Back = () => {
        history.push('/actionlist/');
        window.location.reload();
    }
    pleaselogin =() =>{
        history.push('/continue/');
        window.location.reload();
    }
    componentDidMount(){
        if(sessionStorage.getItem('auth-token')) {
            axios.get('/authentication/getuser/')
                .then(res => {
                    const rowData = res.data;
                    const users = res.data;
                    this.setState({users});
                    this.setState({rowData});
                })
        }else{
            this.pleaselogin();
        }
    }

    render(){
        const list = [];
            this.state.rowData.forEach(function (element) {
                const eleuname = element.username;
                element.link = '/updateuser/?username=' + eleuname;
                list.push(element);
            });

        return(
            <div>
                <h3 ><b>User List</b></h3>
                <div className="data-grid ag-theme-fresh">
                    <AgGridReact
                    enableSorting={true}
                    pagination={true}
                    filter={true}
                    paginationPageSize={15}
                    columnDefs={this.state.columnDefs}
                    rowData={list}
                    defaultColDef = {this.state.defaultColDef}>

                </AgGridReact>
            </div>
                <button className='btn-back' onClick={this.Back}>Go Back</button>
            </div>
        );
    }

}

export default Userlist;