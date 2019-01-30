import React, {Component} from 'react';
import {
    FilteringState,
    IntegratedFiltering,
    PagingState,
    IntegratedPaging,
    SortingState,
    IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableFilterRow,
    PagingPanel
} from '@devexpress/dx-react-grid-bootstrap4';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import TableCell from "@material-ui/core/TableCell";
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios/index";
import {
    generateRows
} from './demo-data/generator.js';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();


const ActionsFormatter = ({ value }) => (
    <a href={value} style={{'fontSize': '20px'}} className="fa fa-eye" title="View" ></a>
);
const ActionsTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={ActionsFormatter}
        {...props}
    />
);
const FilterCell = props => {
    if (props.column.name === "link")
        return <TableCell className={props.className} />;
    else return <TableFilterRow.Cell {...props} />;
};

class Gridfile extends Component{
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {title: 'Firstname', name: 'firstname'},
                {title: 'Lastname', name: 'lastname'},
                {title: 'Username', name: 'username'},
                {title: 'Email', name: 'email'},
                {title: 'Actions', name: 'link'},
            ],
            actionsColumns: ['link'],
            rows: generateRows({ length: 8 }),
            pageSizes: [5, 10, 15, 0],
            filteringStateColumnExtensions: [
                { columnName: 'link', filteringEnabled: false }
            ],
            sortingStateColumnExtensions: [
                { columnName: 'link', sortingEnabled: false },
            ],
        };
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
                    const rows = res.data;
                    const users = res.data;
                    this.setState({users});
                    this.setState({rows});
                })
        }else{
            this.pleaselogin();
        }
    }

    render() {
        const { rows, columns, pageSizes , filteringStateColumnExtensions,actionsColumns,sortingStateColumnExtensions} = this.state;
        const list = [];
        this.state.rows.forEach(function (element) {
            const eleuname = element.username;
            element.link = '/updateuser/?username=' + eleuname;
            list.push(element);
        });
        return (
            <div>
                <div className="card">
                <h3 ><b>User List</b></h3>
                <Grid
                    rows={rows}
                    columns={columns}>
                    <ActionsTypeProvider
                        for={actionsColumns}
                    />
                    <FilteringState defaultFilters={[]} columnExtensions={filteringStateColumnExtensions} />
                    <IntegratedFiltering />
                    <SortingState
                        defaultSorting={[]}
                        columnExtensions={sortingStateColumnExtensions}
                    />
                    <IntegratedSorting />
                    <PagingState
                        defaultCurrentPage={0}
                        defaultPageSize={5}
                    />
                    <IntegratedPaging />
                    <Table />
                    <TableHeaderRow  showSortingControls/>
                    <PagingPanel
                        pageSizes={pageSizes}
                    />
                    <TableFilterRow cellComponent={FilterCell} />
                </Grid>
            </div>
            </div>

        );
    }
}
export default Gridfile