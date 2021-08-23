import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import './AddJobForm.css'
import SubscriptionModal from './SubscriptionModal'


class Subscriptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            batch: [],
            role: [],
            failureSnack: false,
            redirect: false,
        };
    }


    // This syntax ensures `this` is bound within myChangeHandler and submitHandler.
    // We are using the experimental public class fields syntax, We can use class fields to correctly bind callbacks
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
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
            this.setState({ role: new_role });
        }
        else {
            new_role.push(val);
            this.setState({ role: new_role });
        }
    }
    submitHandler = async (event) => {
        event.preventDefault();
        const subs = {
            batch: this.state.batch,
            role: this.state.role
        }
        try {
            await axios.post(`${process.env.PUBLIC_URL}/api/add_subscriber`, subs);
            this.setState({ redirect: true });
            console.log("Subscriber Added")
        }
        catch (error) {
            console.log(error);
            this.setState({
                failureSnack: true
            });
        }
    }
    handleCloseFailureSnack = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            failureSnack: false
        });
    };
    render() {
        //button logic
        var x = this.state.batch.length;
        let sumbitButton = x ? <input style={{ color: "#33b579", width: "6rem", height: "3rem", fontWeight: "900" }}
            type='submit' /> : <p style={{ color: "red" }}>fill the mandatory * fields first</p>;


        const { redirect } = this.state;
        if (redirect) {
            return <Redirect push to="/jobboard" />;
        }


        return (
            <div className="addform">
                <div className="container">
                    <div className="addfo">
                        <div style={{ color: "grey", marginTop: '2rem' }}>
                            <span style={{ color: "grey", fontSize: "2rem", fontWeight: "500" }}>Add a subscription</span>
                        </div>
                        <div style={{ overflow: "scroll" }} className="form">
                            <form onSubmit={this.submitHandler}>
                                <p style={{ color: "black" }}><b>Role :</b></p>
                                <p>
                                    <label>
                                        <input type="checkbox" name='role'
                                            onChange={this.roleChangeHandler} value="Intern"
                                        />
                                        <span>Intern</span>
                                    </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                        <input type="checkbox" name='role'
                                            onChange={this.roleChangeHandler} value="Full time"
                                        />
                                        <span>Full time</span>
                                    </label>&nbsp;&nbsp;&nbsp;
                        </p>
                                <p style={{ color: "black" }}><b>Batch* :</b></p>
                                <p>
                                    <label>
                                        <input type="checkbox" name='batch'
                                            onChange={this.batchChangeHandler} value="2020"
                                        />
                                        <span>2020</span>
                                    </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                        <input type="checkbox" name='batch'
                                            onChange={this.batchChangeHandler} value="2021"
                                        />
                                        <span>2021</span>
                                    </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                        <input type="checkbox" name='batch'
                                            onChange={this.batchChangeHandler} value="2022"
                                        />
                                        <span>2022</span>
                                    </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                        <input type="checkbox" name='batch'
                                            onChange={this.batchChangeHandler} value="2023"
                                        />
                                        <span>2023</span>
                                    </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                        <input type="checkbox" name='batch'
                                            onChange={this.batchChangeHandler} value="2024"
                                        />
                                        <span>2024</span>
                                    </label>
                                </p>
                                <div>
                                    {sumbitButton}
                                </div>
                                <Snackbar open={this.state.failureSnack} autoHideDuration={6000} onClose={this.handleCloseFailureSnack} >
                                    <Alert onClose={this.handleCloseFailureSnack} severity="error" elevation={6} variant="filled">
                                        Failed to update your subscription.
                                    </Alert>
                                </Snackbar>
                            </form>
                            <SubscriptionModal role={this.state.role} />
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Subscriptions;