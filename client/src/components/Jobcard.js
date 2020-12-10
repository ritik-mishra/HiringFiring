import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router';

import './Jobcard.css'

class Jobcard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDelete: false,
            showCard: true,
            redirect: false
        };
    }
    deleteHandler = async (event) => {
        event.preventDefault();
        await this.setState({
            showDelete: !this.state.showDelete
        });
    }

    deleteJobHandler = async (event) => {
        event.preventDefault();
        await this.setState({
            showCard: false
        });
        var del_link = `${process.env.PUBLIC_URL}/api/delete_job/` + this.props.job.jobId;
        const res = await axios.delete(del_link);
    }

    editHandler = async (event) => {
        event.preventDefault();
        this.setState({ redirect: true })
    }


    render() {
        const job = this.props.job;
        const auth = this.props.auth;

        //delete and edit job link logic
        var del = null, edit = null;
        if (auth._id && (auth._id === job.postedById)) {
            del = <a onClick={this.deleteHandler} href="#">Delete Job</a>;
            edit = <a onClick={this.editHandler} href="#">Edit Job</a>;
        }

        //delete popup text logic
        var deleteText = null;
        if (this.state.showDelete) {

            deleteText = (
                <div>
                    <p style={{ display: "inline" }}>Are you sure you want to delete this job</p>
                    <button onClick={this.deleteHandler} style={{ display: "inline" }} class="button button1">No</button>
                    <button onClick={this.deleteJobHandler} style={{ display: "inline" }} className="button button3">Yes</button>
                </div>
            );
        }

        const url = job.jobLink;
        const date = new Date(job.jobExpiry);
        const default_date = new Date('1970,01,01');
        default_date.setHours(0, 0, 0, 0)
        const jobExpiry_date = new Date(job.jobExpiry);
        jobExpiry_date.setHours(0, 0, 0, 0)
        if (this.state.redirect) {
            return <Redirect push
            to={{
                pathname: "/editjob",
                state: { editJob: job }
            }} />;
        }
        if (this.state.showCard) {
            return (
                <div>

                    <div className="jobcard" key={job.jobID}>
                        <div >
                            <div className="col s12 m6">
                                <div className="card blue-grey darken-1">
                                    <div className="card-content white-text">
                                        <span className="card-title"><b>{job.companyName}</b></span>
                                        <hr></hr>
                                        <p>Role: {job.jobTitle}</p>
                                        <p>Batch applicable: 
                                            {job.batch["is2021"]?"2021":null}&nbsp;{job.batch["is2022"]?"2022":null}&nbsp;
                                            {job.batch["is2023"]?"2023":null}&nbsp;{job.batch["is2024"]?"2024":null}
                                        </p>
                                        {default_date.getTime()!=jobExpiry_date.getTime() &&
                                        <p>Apply Before: {date.toLocaleDateString()}</p>}
                                        <p>Referral Applicable: {job.isReferral}</p>
                                        <p>Posted by: {job.postedBy}</p>
                                    </div>
                                    <div className="card-action">
                                        <a target="_blank" rel="noreferrer" href={url}>Apply here</a>
                                        {del}
                                        {edit}
                                    </div>
                                    <div>
                                        {deleteText}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return null;
        }
    }
};
function mapStateToProps({ auth }) {
    return { auth };
}
export default connect(mapStateToProps)(Jobcard);