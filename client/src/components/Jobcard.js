import React, { Component } from 'react';
import url from '../configClient/url';


class Jobcard extends Component {
    render() {
        const job = this.props.job;
        const date = new Date(job.jobExpiry);
        var del_link = url.baseURL + '/api/delete_job/' + job.jobId;
        // console.log(del_link);
        const jobUrl = job.jobLink;
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
                                <a href={del_link}>Delete Job</a>
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