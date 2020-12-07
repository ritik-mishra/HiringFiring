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
            batch: '',
            isReferral: '',
            jobExpiry: '',
            redirect: false
        };
        //In JavaScript, class methods are not bound by default. 
        //If you forget to bind this.myChangeHandler and pass it to onChange, this will be undefined when the function is actually called.
        //But it works as the syntax we are using namely "Public Class Field Syntax" allows class fields to correctly bind callbacks.

    }
    // This syntax ensures `this` is bound within myChangeHandler and submitHandler.
    // We are using the experimental public class fields syntax, We can use class fields to correctly bind callbacks
    myChangeHandler = (event) => {
        console.log(event);
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }
    submitHandler = (event) => {
        event.preventDefault();
        const job = {
            companyName: this.state.companyName,
            jobTitle: this.state.jobTitle,
            jobLink: this.state.jobLink,
            batch: this.state.batch,
            isReferral: this.state.isReferral,
            jobExpiry: this.state.jobExpiry

        }

        axios.post('/api/add_job', job).then(
            (res, err) => {
                if (err)
                    throw err;
                this.setState({ redirect: true })
            }
        )
    }
    render() {
        //button logic
        var x = this.state.companyName && this.state.jobTitle && this.state.jobLink && this.state.batch;
        let pp = x ? <input style={{ color: "red" }} type='submit' /> : "fill the mandatory(*) fields";


        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/jobboard" />;
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
                        <p>Job Title* :</p>
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
                        <input
                            type='text'
                            name='batch'
                            onChange={this.myChangeHandler}
                        />
                        <p>Is Referral required :</p>
                        <input
                            type='text'
                            name='isReferral'
                            onChange={this.myChangeHandler}
                        />
                        <p>Job Expiry Date(if known) :</p>
                        <input
                            type='text'
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