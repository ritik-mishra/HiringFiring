import axios from 'axios';
import React, { Component } from 'react';
import './AddJobForm.css';
import ls from 'local-storage';

class EditJobForm extends Component {
    componentDidMount() {
        //console.log(this.props.location.state.editJob);
        var editJob;
        if(this.props.location.state){
            
            editJob = this.props.location.state.editJob;
            ls.set('editJob',JSON.stringify(editJob));
        }
        else{
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
            jobExpiry: editJob.jobExpiry
        })
    }
    constructor(props) {
        super(props);
        // console.log(this.props);
        this.state = {
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
        
        var updateLink = `${process.env.PUBLIC_URL}/api/update/` + this.state.jobId;

        axios.put(updateLink, newJob).then(
            (res, err) => {
                if (err)
                    throw err;
                console.log(res);
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
                        <p>
                            <label>
                                <input className="with-gap" type="radio"
                                name='isReferral'  value="Yes"
                                checked={this.state.isReferral === "Yes"}
                                onChange={this.myChangeHandler}
                                />
                                <span>Yes</span>
                            </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                <input className="with-gap" type="radio"
                                name='isReferral'  value="No"
                                checked={this.state.isReferral === "No"}
                                onChange={this.myChangeHandler}
                                />
                                <span>No</span>
                            </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                <input className="with-gap" type="radio" 
                                name='isReferral'  value="Maybe"
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