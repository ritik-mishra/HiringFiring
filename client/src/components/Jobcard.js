import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';


class Jobcard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          redirect: false
        };
    }
    clickHandler = (event) =>{
        event.preventDefault();
        var del_link = `${process.env.PUBLIC_URL}/api/delete_job/` + this.props.job.jobId;
        axios.get(del_link).then(
            (res, err) => {
                if(err)
                    throw err;
                console.log(res);
                this.setState({ redirect: true })
            }
        )
    }
    render() {
        const job = this.props.job;
        const date = new Date(job.jobExpiry);
        var del_link = `${process.env.PUBLIC_URL}/api/delete_job/` + job.jobId;
        // console.log(del_link);
        const jobUrl = job.jobLink;
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to= '/dashboard' />;
          }
        return (
            <div className="jobcard" key={job.jobID}>
                <div >
                    <div className="col s12 m6">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title"><b>{job.companyName}</b></span>
                                <hr></hr>
                                <p>Role: {job.jobTitle}</p>
                                <p>Batch applicable: {job.batch}</p>
                                <p>Apply Before: {date.toLocaleDateString()}</p>
                                <p>Referral Applicable: {job.isReferral}</p>
                                <p>Posted by: {job.postedBy}</p>
                            </div>
                            <div className="card-action">
                                <a target="_blank" rel="noreferrer" href={jobUrl}>Apply here</a>
                                <a onClick = {this.clickHandler}>Delete Job</a>
                                <a href="#">Edit Job</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
export default Jobcard;