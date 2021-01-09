import axios from 'axios';
import React, { Component } from 'react';
import './AddJobForm.css';
import ls from 'local-storage';
import { Redirect } from "react-router-dom";
import './EditJobForm.css'

class EditJobForm extends Component {
    async componentDidMount() {
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
        await this.setState({
            jobId: editJob.jobId,
            companyName: editJob.companyName,
            jobTitle: editJob.jobTitle,
            jobLink: editJob.jobLink,
            batch: editJob.batch,
            isReferral: editJob.isReferral,
            jobExpiry: editJob.jobExpiry.toString().substr(0, 10),
            role: editJob.role
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
            role: []
        };
        //In JavaScript, class methods are not bound by default. 
        //If you forget to bind this.myChangeHandler and pass it to onChange, this will be undefined when the function is actually called.
        //But it works as the syntax we are using namely "Public Class Field Syntax" allows class fields to correctly bind callbacks.

    }
    // This syntax ensures `this` is bound within myChangeHandler and submitHandler.
    // We are using the experimental public class fields syntax, We can use class fields to correctly bind callbacks
    myChangeHandler = async (event) => {
        let nam = event.target.name;

        let val = event.target.value;
        await this.setState({ [nam]: val });
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
    roleChangeHandler = async (event) => {
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
        const newJob = {
            companyName: this.state.companyName,
            jobTitle: this.state.jobTitle,
            jobLink: this.state.jobLink,
            role: this.state.role,
            batch: this.state.batch,
            isReferral: this.state.isReferral,
            jobExpiry: this.state.jobExpiry
        }

        var updateLink = `${process.env.PUBLIC_URL}/api/update/` + this.state.jobId;

        await axios.patch(updateLink, newJob);
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
        if (this.state.companyName && this.state.jobLink && this.state.batch.length && this.state.role.length) {
            allowSubmit = <input
                style={{ color: "red" }}
                type='submit'
            />;
        }
        else {
            allowSubmit = <p style={{ color: "red" }}>Fill all the mandatory fields</p>;
        }
        return (
            <div className="editform">
                <div className="container">
                    <div style={{ color: "black" }}>
                        <h3>Edit Job</h3>
                    </div>
                    <div style={{ color: "black" }} className="form">
                        <form onSubmit={this.submitHandler}>
                            <p><b>Company Name* :</b></p>
                            <input
                                type='text'
                                name='companyName'
                                onChange={this.myChangeHandler}
                                value={this.state.companyName}
                            />
                            <p><b>Role* :</b></p>
                            <p style={{ color: "black" }}>
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
                            <p><b>Job Title:</b> (e.g. Frontend dev, SDE-1, Tester)</p>
                            <input
                                type='text'
                                name='jobTitle'
                                onChange={this.myChangeHandler}
                                value={this.state.jobTitle}
                            />
                            <p><b>Job Link* :</b></p>
                            <input
                                type='text'
                                name='jobLink'
                                onChange={this.myChangeHandler}
                                value={this.state.jobLink}
                            />
                            <p><b>Batch* :</b></p>
                            <p>
                                <label>
                                    <input type="checkbox" name='batch' value="2020"
                                        checked={this.state.batch.indexOf("2020") !== -1}
                                        onChange={this.batchChangeHandler}
                                    />
                                    <span>2020</span>
                                </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                    <input type="checkbox" name='batch' value="2021"
                                        checked={this.state.batch.indexOf("2021") !== -1}
                                        onChange={this.batchChangeHandler}
                                    />
                                    <span>2021</span>
                                </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                    <input type="checkbox" name='batch' value="2022"
                                        checked={this.state.batch.indexOf("2022") !== -1}
                                        onChange={this.batchChangeHandler}
                                    />
                                    <span>2022</span>
                                </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                    <input type="checkbox" name='batch' value="2023"
                                        checked={this.state.batch.indexOf("2023") !== -1}
                                        onChange={this.batchChangeHandler}
                                    />
                                    <span>2023</span>
                                </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                    <input type="checkbox" name='batch' value="2024"
                                        checked={this.state.batch.indexOf("2024") !== -1}
                                        onChange={this.batchChangeHandler}
                                    />
                                    <span>2024</span>
                                </label>
                            </p>
                            <p><b>Referral Applicable :</b></p>
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

                            <p><b>Job Expiry Date</b> (if known):</p>
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
            </div>
        );
    }
}

export default EditJobForm;