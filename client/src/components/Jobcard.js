import React, { Component } from 'react';
import { ExternalLink } from 'react-external-link';

class Jobcard extends Component {
    render() {
        const job = this.props.job;
        const date = new Date(job.jobExpiry);
        var del_link = '/api/delete_job/' + job.jobId;
        // console.log(del_link);
        const url = job.jobLink;
        return (
            <div className="jobcard" key={job.jobID}>
                <div >
                    <div class="col s12 m6">
                        <div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                                <span class="card-title"><b>{job.companyName}</b></span>
                                <hr></hr>
                                <p>Role: {job.jobTitle}</p>
                                <p>Batch applicable: {job.batch}</p>
                                <p>Apply Before: {date.toLocaleDateString()}</p>
                                <p>Referral Applicable: {job.isReferral}</p>
                                <p>Posted by: {job.postedBy}</p>
                            </div>
                            <div class="card-action">
                                <a target="_blank" href={url}>Apply here</a>
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