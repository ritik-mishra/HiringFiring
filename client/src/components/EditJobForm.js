import axios from 'axios';
import React, { Component } from 'react';
import './AddJobForm.css';

class EditJobForm extends Component {
    componentDidMount() {
        console.log(this.props.location.state.editJob);
    }
    constructor(props) {
        super(props);
        // console.log(this.props);
        this.editjob = this.props.location.state.editJob;
        this.state = {
            companyName: this.props.location.state.editJob.companyName,
            jobTitle: this.props.location.state.editJob.jobTitle,
            jobLink: this.props.location.state.editJob.jobLink,
            batch: this.props.location.state.editJob.batch,
            isReferral: this.props.location.state.editJob.isReferral,
            jobExpiry: this.props.location.state.editJob.jobExpiry
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
    submitHandler = (event) => {
        event.preventDefault();
        const newJob = {
            companyName: this.state.companyName,
            jobTitle: this.state.jobTitle,
            jobLink: this.state.jobLink,
            batch: this.state.batch,
            isReferral: this.state.isReferral,
            jobExpiry: this.state.jobExpiry

        }
        console.log(this.editjob);
        var updateLink = `${process.env.PUBLIC_URL}/api/update/` + this.editjob.jobId;

        axios.put(updateLink, newJob).then(
            (res, err) => {
                if (err)
                    throw err;
                console.log(res);
                this.setState({ redirect: true })
            }
        )
        this.props.history.push("/jobboard");
    }
    render() {
        let allowSubmit = '';
        if (this.state.companyName && this.state.jobTitle && this.state.jobLink && this.state.batch) {
            allowSubmit = <input
                style={{ color: "red" }}
                type='submit'
            />;
        }
        else {
            allowSubmit = 'Fill all the mandatory fields';
        }
        return (
            <div className="container">
                <div style={{ color: "white" }}>
                    <h3>Edit Job</h3>
                </div>
                <div className="form">
                    <form onSubmit={this.submitHandler}>
                        <p>Company Name* :</p>
                        <input
                            type='text'
                            name='companyName'
                            onChange={this.myChangeHandler}
                            value={this.state.companyName}
                        />
                        <p>Job Title* :</p>
                        <input
                            type='text'
                            name='jobTitle'
                            onChange={this.myChangeHandler}
                            value={this.state.jobTitle}
                        />
                        <p>Job Link* :</p>
                        <input
                            type='text'
                            name='jobLink'
                            onChange={this.myChangeHandler}
                            value={this.state.jobLink}
                        />
                        <p>Batch* :</p>
                        <input
                            type='text'
                            name='batch'
                            onChange={this.myChangeHandler}
                            value={this.state.batch}
                        />
                        <p>Is Referral required :</p>
                        <input
                            type='text'
                            name='isReferral'
                            onChange={this.myChangeHandler}
                            value={this.state.isReferral}
                        />
                        <p>Job Expiry Date(if known) :</p>
                        <input
                            type='date'
                            name='jobExpiry'
                            onChange={this.myChangeHandler}
                        />
                        <div>
                            {allowSubmit}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditJobForm;