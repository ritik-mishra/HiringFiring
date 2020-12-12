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
        var obj = this.state.batch;
        let val = event.target.value;
        obj[val] = !obj[val];
        this.setState({
            batch: obj
        });
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
        await this.setState({
            redirect: true
        });
        ls.clear();
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to="/jobboard" />
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
                        <p>
                            <label>
                                <input type="checkbox" name='batch' value="is2020"
                                    checked={this.state.batch["is2020"] === true}
                                    onChange={this.batchChangeHandler}
                                />
                                <span>2020</span>
                            </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                <input type="checkbox" name='batch' value="is2021"
                                    checked={this.state.batch["is2021"] === true}
                                    onChange={this.batchChangeHandler}
                                />
                                <span>2021</span>
                            </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                <input type="checkbox" name='batch' value="is2022"
                                    checked={this.state.batch["is2022"] === true}
                                    onChange={this.batchChangeHandler}
                                />
                                <span>2022</span>
                            </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                <input type="checkbox" name='batch' value="is2023"
                                    checked={this.state.batch["is2023"] === true}
                                    onChange={this.batchChangeHandler}
                                />
                                <span>2023</span>
                            </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                <input type="checkbox" name='batch' value="is2024"
                                    checked={this.state.batch["is2024"] === true}
                                    onChange={this.batchChangeHandler}
                                />
                                <span>2024</span>
                            </label>
                        </p>

                        <p>Is Referral required :</p>
                        <p>
                            <label>
                                <input className="with-gap" type="radio"
                                    name='isReferral' value="Yes"
                                    checked={this.state.isReferral === "Yes"}
                                    onChange={this.myChangeHandler}
                                />
                                <span>Yes</span>
                            </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                <input className="with-gap" type="radio"
                                    name='isReferral' value="No"
                                    checked={this.state.isReferral === "No"}
                                    onChange={this.myChangeHandler}
                                />
                                <span>No</span>
                            </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                <input className="with-gap" type="radio"
                                    name='isReferral' value="Maybe"
                                    checked={this.state.isReferral === "Maybe"}
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