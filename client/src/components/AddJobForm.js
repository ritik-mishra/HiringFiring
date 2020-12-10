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
            batch : {
                "is2021": false,
                "is2022": false,
                "is2023": false,
                "is2024": false
            },
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

    batchChangeHandler = (event) => {
        console.log(event);
        var obj = this.state.batch;
        let val = event.target.value;
        obj[val] = !obj[val];
        this.setState({
            batch: obj
        });
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
        
        axios.post(`${process.env.PUBLIC_URL}/api/add_job`,job).then(
            (res, err) => {
                if (err)
                    throw err;
                this.setState({ redirect: true })
            }
        )
    }
    render() {
        //button logic
        var x = this.state.companyName && this.state.jobTitle && this.state.jobLink && (this.state.batch.is2021||this.state.batch.is2022||this.state.batch.is2023||this.state.batch.is2024);
        let pp = x ? <input style={{ color: "red" }} type='submit' /> : "fill the mandatory(*) fields first";


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
                        <p>
                            <label>
                                <input type="checkbox"   name='batch' 
                                onChange={this.batchChangeHandler}  value = "is2021"
                                />
                                <span>2021</span>
                            </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                <input type="checkbox"   name='batch' 
                                onChange={this.batchChangeHandler}  value = "is2022"
                                />
                                <span>2022</span>
                            </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                <input type="checkbox"   name='batch' 
                                onChange={this.batchChangeHandler}  value = "is2023"
                                />
                                <span>2023</span>
                            </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                <input type="checkbox"   name='batch' 
                                onChange={this.batchChangeHandler}  value = "is2024"
                                />
                                <span>2024</span>
                            </label>
                        </p>
                       
                        <p>Is Referral required :</p>
                        <p>
                            <label>
                                <input className="with-gap" type="radio"
                                name='isReferral' value ="Yes"
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