import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router';

import './AddJobForm.css'


class AddJobForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: '',
            jobTitle: '',
            jobLink: '',
            batch: [],
            isReferral: '',
            jobExpiry: '',
            redirect: false,
            isIntern: false,
            isFulltime: false
        };

        //In JavaScript, class methods are not bound by default. 
        //If you forget to bind this.myChangeHandler and pass it to onChange, this will be undefined when the function is actually called.
        //But it works as the syntax we are using namely "Public Class Field Syntax" allows class fields to correctly bind callbacks.

    }
    // This syntax ensures `this` is bound within myChangeHandler and submitHandler.
    // We are using the experimental public class fields syntax, We can use class fields to correctly bind callbacks
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    batchChangeHandler = (event) => {
        console.log(event);
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
        if (val === "isIntern") {
            this.setState({
                isIntern: !this.state.isIntern
            })
        }
        else {
            this.setState({
                isFulltime: !this.state.isFulltime
            })
        }
    }
    submitHandler = async (event) => {
        event.preventDefault();
        const job = {
            companyName: this.state.companyName,
            jobTitle: this.state.jobTitle,
            jobLink: this.state.jobLink,
            batch: this.state.batch,
            isReferral: this.state.isReferral,
            jobExpiry: this.state.jobExpiry,
            isIntern: this.state.isIntern,
            isFulltime: this.state.isFulltime

        }
        console.log("1");
        await axios.post(`${process.env.PUBLIC_URL}/api/add_job`, job);
        this.setState({ redirect: true });
        console.log("job added");
    }
    render() {
        //button logic
        var x = this.state.companyName && this.state.jobLink && this.state.batch.length && (this.state.isIntern || this.state.isFulltime);
        let pp = x ? <input style={{ color: "red" }} type='submit' /> : "fill the mandatory(*) fields first";


        const { redirect } = this.state;
        if (redirect) {
            return <Redirect push to="/jobboard" />;
        }


        return (
            <div className="container">
                <div style={{ color: "white" }}>
                    <h3>Add new Job</h3>
                </div>
                <div className="form">
                    <form onSubmit={this.submitHandler}>
                        <p>Company Name* :</p>
                        <input
                            type='text'
                            name='companyName'
                            onChange={this.myChangeHandler}
                        />
                        <p>Role* :</p>
                        <p>
                            <label>
                                <input type="checkbox" name='role'
                                    onChange={this.roleChangeHandler} value="isIntern"
                                />
                                <span>Intern</span>
                            </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                <input type="checkbox" name='role'
                                    onChange={this.roleChangeHandler} value="isFulltime"
                                />
                                <span>Full time</span>
                            </label>&nbsp;&nbsp;&nbsp;
                        </p>
                        <p>Job Title: (e.g. Frontend dev, SDE-1, Tester)</p>
                        <input
                            type='text'
                            name='jobTitle'
                            onChange={this.myChangeHandler}
                        />
                        <p>Job Link* :</p>
                        <input
                            type='text'
                            name='jobLink'
                            onChange={this.myChangeHandler}
                        />
                        <p>Batch* :</p>
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

                        <p>Is Referral required :</p>
                        <p>
                            <label>
                                <input className="with-gap" type="radio"
                                    name='isReferral' value="Yes"
                                    onChange={this.myChangeHandler}
                                />
                                <span>Yes</span>
                            </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                <input className="with-gap" type="radio"
                                    name='isReferral' value="No"
                                    onChange={this.myChangeHandler}
                                />
                                <span>No</span>
                            </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                <input className="with-gap" type="radio"
                                    name='isReferral' value="Maybe"
                                    onChange={this.myChangeHandler}
                                />
                                <span>Maybe</span>
                            </label>
                        </p>
                        <p>Job Expiry Date (if known):</p>
                        <input
                            type='date'
                            name='jobExpiry'
                            onChange={this.myChangeHandler}
                        />
                        <div>
                            {pp}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddJobForm;