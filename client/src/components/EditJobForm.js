import axios from 'axios';
import React, { Component } from 'react';
import './AddJobForm.css';
import ls from 'local-storage';
import { Redirect } from "react-router-dom";

class EditJobForm extends Component {
    componentDidMount() {
        //console.log(this.props.location.state.editJob);
        var editJob;
        if (this.props.location.state) {

            editJob = this.props.location.state.editJob;
            ls.set('editJob', JSON.stringify(editJob));
            console.log(this.props.location.state);
        }
        else {
            const editJobString = ls.get('editJob');
            editJob = JSON.parse(editJobString);
        }
        this.setState({
            jobId: editJob.jobId,
            companyName: editJob.companyName,
            jobTitle: editJob.jobTitle,
            jobLink: editJob.jobLink,
            batch: editJob.batch,
            isReferral: editJob.isReferral,
            jobExpiry: editJob.jobExpiry.toString().substr(0, 10)
        })
    }
    constructor(props) {
        super(props);
        // console.log(this.props);
        this.state = {
            redirect: false,
            jobId: '',
            companyName: '',
            jobTitle: '',
            jobLink: '',
            batch: '',
            isReferral: '',
            jobExpiry: '',
        };
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;

        let val = event.target.value;
        this.setState({ [nam]: val });
    }
    submitHandler = async (event) => {
        event.preventDefault();
        const newJob = {
            companyName: this.state.companyName,
            jobTitle: this.state.jobTitle,
            jobLink: this.state.jobLink,
            batch: this.state.batch,
            isReferral: this.state.isReferral,
            jobExpiry: this.state.jobExpiry
        }

        var updateLink = `${process.env.PUBLIC_URL}/api/update/` + this.state.jobId;

        await axios.put(updateLink, newJob);
        this.setState({
            redirect: true
        });
        // this.props.history.push("/jobboard");
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/jobboard" />
        }
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
                        <p>Job Expiry Date (if known):</p>
                        <input
                            type='date'
                            name='jobExpiry'
                            onChange={this.myChangeHandler}
                            value={this.state.jobExpiry}
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
