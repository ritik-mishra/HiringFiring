import React, { Component } from 'react';
import axios from 'axios';

import { Multiselect } from 'multiselect-react-dropdown';
import './SortingFilters.css';
import './style.css'
import { List } from '@material-ui/core';


class Sortingfilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: "postedOn",
            comparator: -1,
            checkSort: "recentpost",
            batch: [],
            role: [],
            selectedCompanies: [],
            company_list: [],
            isFilterProcessing: false
        }
        this.style = {
            chips: {
                background: "#0099cc"
            },
            searchBox: {
                height: "4rem",
                border: "none",
                "borderBottom": "1px solid blue",
                "borderRadius": "0px"
            },
            multiselectContainer: {
                color: "red"
            }
        };
    }
    async componentDidMount() {
        // var companyList = await axios.get(`${process.env.PUBLIC_URL}/api/company_list`);
        var companyList = this.props.companylist;
        await this.setState({
            company_list: companyList
        });
    }

    async componentDidUpdate(prevProp, prevState, SnapShot) {
        if (this.props.companylist.length !== 0) {
            if(this.state.company_list.length === 0) {
        var ans = this.props.companylist;   
        await this.setState({
            company_list: ans
        });
    }}
}

    sortByHandler = (event) => {
        var val = event.target.value;
        if (val === "recentpost") {
            this.setState({
                sortBy: "postedOn",
                comparator: -1,
            })
        }
        else if (val === "firstpost") {
            this.setState({
                sortBy: "postedOn",
                comparator: 1
            })
        }
        else if (val === "recentexpiry") {
            this.setState({
                sortBy: "jobExpiry",
                comparator: 1
            })
        }
        else if (val === "lastexpiry") {
            this.setState({
                sortBy: "jobExpiry",
                comparator: -1
            })
        }
        else {
            this.setState({
                sortBy: "likersCount",
                comparator: -1
            })
        }
        this.setState({
            checkSort: val
        })
    }
    batchChangeHandler = (event) => {
        let val = event.target.value;
        var new_batch = this.state.batch;
        const index = this.state.batch.indexOf(val);
        if (index > -1) {
            new_batch.splice(index, 1);
            this.setState({ batch: new_batch });
        }
        else {
            new_batch.push(val);
            this.setState({ batch: new_batch });
        }
    }
    roleChangeHandler = (event) => {
        let val = event.target.value;
        var new_role = this.state.role;
        const index = this.state.role.indexOf(val);
        if (index > -1) {
            new_role.splice(index, 1);
        }
        else {
            new_role.push(val);
        }
        this.setState({ role: new_role });
    }
    companyChangeHandler = async (event) => {
        await this.setState({
            selectedCompanies: event
        })
    }
    applyClickHandler = async () => {
        if (!this.state.isFilterProcessing) {
            await this.setState({
                isFilterProcessing: true
            })
        }
        var body = {
            sortBy: this.state.sortBy,
            comparator: this.state.comparator,
            batch: this.state.batch,
            role: this.state.role,
            selectedCompanies: this.state.selectedCompanies
        }
        if (body.selectedCompanies.length === 0) {
            body.selectedCompanies = this.state.company_list;
        }
        if (body.batch.length === 0) {
            body.batch = ["2020", "2021", "2022", "2023", "2024"];
        }
        if (body.role.length === 0) {
            body.role = ["Intern", "Full time"];
        }
        this.props.filterHandler(body);
        await this.setState({
            isFilterProcessing: false
        });
    }
    render() {

        return (
            <div className="container">
                <div style={{ marginTop: "1rem" }} className="sorting">
                    <div style={{ textAlign: 'center' }}><b>Sort By</b></div>
                    <hr />
                    <br />
                    <label>
                        <input className="with-gap" type="radio"
                            name='sort' value="recentpost"
                            checked={this.state.checkSort === "recentpost"}
                            onChange={this.sortByHandler}
                        />
                        <span >Recent Posted</span>
                    </label>
                    <br />
                    <label>
                        <input className="with-gap" type="radio"
                            name='sort' value="firstpost"
                            checked={this.state.checkSort === "firstpost"}
                            onChange={this.sortByHandler}
                        />
                        <span >First Posted</span>
                    </label>
                    <br />
                    <label>
                        <input className="with-gap" type="radio"
                            name='sort' value="recentexpiry"
                            checked={this.state.checkSort === "recentexpiry"}
                            onChange={this.sortByHandler}
                        />
                        <span >Recent Expiry</span>
                    </label>
                    <br />
                    <label>
                        <input className="with-gap" type="radio"
                            name='sort' value="lastexpiry"
                            checked={this.state.checkSort === "lastexpiry"}
                            onChange={this.sortByHandler}
                        />
                        <span >Late Expiry</span>
                    </label>
                    <br />
                    <label>
                        <input className="with-gap" type="radio"
                            name='sort' value="mostliked"
                            onChange={this.sortByHandler}
                        />
                        <span >Most Liked</span>
                    </label>
                </div>
                <br />



                <div style={{ marginTop: "2rem" }} className="filters">
                    <div style={{ textAlign: "center" }} ><b>Filters</b></div>
                    <hr />



                    <div style={{ textAlign: "center" }} >Batch</div>
                    <p>
                        <label>
                            <input type="checkbox" name='batch' value="2020"
                                checked={this.state.batch.includes("2020")}
                                onChange={this.batchChangeHandler}
                            />
                            <span>2020</span>
                        </label>&nbsp;&nbsp;&nbsp;
                            <label>
                            <input type="checkbox" name='batch' value="2021"
                                checked={this.state.batch.includes("2021")}
                                onChange={this.batchChangeHandler}
                            />
                            <span>2021</span>
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" name='batch' value="2022"
                                checked={this.state.batch.includes("2022")}
                                onChange={this.batchChangeHandler}
                            />
                            <span>2022</span>
                        </label>&nbsp;&nbsp;&nbsp;
                            <label>
                            <input type="checkbox" name='batch' value="2023"
                                checked={this.state.batch.includes("2023")}
                                onChange={this.batchChangeHandler}
                            />
                            <span>2023</span>
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" name='batch' value="2024"
                                checked={this.state.batch.includes("2024")}
                                onChange={this.batchChangeHandler}
                            />
                            <span>2024</span>
                        </label>
                    </p>



                    <div style={{ textAlign: "center" }} >Role</div>
                    <p>
                        <label>
                            <input type="checkbox" name='role' value="Intern"
                                checked={this.state.role.includes("Intern")}
                                onChange={this.roleChangeHandler}
                            />
                            <span>Intern</span>
                        </label>&nbsp;&nbsp;&nbsp;
                            <label>
                            <input type="checkbox" name='role' value="Full time"
                                checked={this.state.role.includes("Full time")}
                                onChange={this.roleChangeHandler}
                            />
                            <span>Full time</span>
                        </label>&nbsp;&nbsp;&nbsp;
                        </p>
                    <div style={{ textAlign: "center" }} >
                        <p><b>Companies</b> (atmost 5)</p>
                    </div>
                    <div className="multiselect">
                        <Multiselect
                            options={this.state.company_list}
                            // style={{ zIndex: 450, height: "10rem" }}
                            isObject={false}
                            onSelect={this.companyChangeHandler}
                            onRemove={this.companyChangeHandler}
                            placeholder="Select Companies"
                            // selectedValues={this.state.selectedCompanies}
                            selectionLimit="5"
                        />
                    </div>


                    <button style={{ marginLeft: "4rem" }} onClick={this.applyClickHandler} className="button"><b>Apply</b></button>
                </div>
            </div >
        )
    }
};
export default Sortingfilters;
