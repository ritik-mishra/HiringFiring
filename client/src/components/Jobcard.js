import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router';

import './Jobcard.css'
class Jobcard extends Component {
    constructor(props) {
        super(props);
        var hc = 0, h = false;
        this.person = this.props.auth.googleId;
        if (this.props.job.likers.length) {
            hc = this.props.job.likers.length;
            h = this.props.job.likers.includes(this.person);
        }
        this.state = {
            showDelete: false,
            showCard: true,
            redirect: false,
            heart: h,
            heartCount: hc,
            isLikeProcessing: false,
            noAddJobstackButton: this.props.notButton
        };
    }
    componentDidMount() {
        // cy;
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
        const res = await axios.patch(del_link);
    }

    editHandler = async (event) => {
        event.preventDefault();
        this.props.setLocal();
        this.setState({ redirect: true })
    }
    heartClick = async () => {
        if (!this.state.isLikeProcessing) {
            await this.setState({
                isLikeProcessing: true
            })
            var body = { jobId: this.props.job.jobId };
            if (this.state.heart) {
                this.setState({
                    heart: !this.state.heart,
                    heartCount: this.state.heartCount - 1
                })
                await axios.post(`${process.env.PUBLIC_URL}/api/remove_liker`, body);
                await this.setState({
                    isLikeProcessing: false
                });
            }
            else {
                this.setState({
                    heart: !this.state.heart,
                    heartCount: this.state.heartCount + 1
                })
                await axios.post(`${process.env.PUBLIC_URL}/api/add_liker`, body);
                await this.setState({
                    isLikeProcessing: false
                });
            }
        }
    }
    getHeart = () => {
        return <i onClick={this.heartClick} className="fa fa-heart" style={{ fontSize: "1.7rem", color: this.state.heart ? "rgb(253, 91, 91)" : "#bfbfbf", cursor: "pointer" }}></i>;
    }
    addJobstackHandler = async () => {
        this.setState({
            noAddJobstackButton: true
        })
        var add = `${process.env.PUBLIC_URL}/api/addto_jobstack/` + this.props.job.jobId;
        const res = await axios.post(add);
    }
    getJobstackButton = () => {
        if (this.state.noAddJobstackButton)
            return <button disabled style={{ display: "inline", float: "right" }} >Added in Jobstack</button>
        return <button onClick={this.addJobstackHandler} style={{ display: "inline", float: "right" }} >Add to Jobstack</button>
    }
    internFulltime = () => {
        var infl = null;
        var role = this.props.job.role;
        if (role.length === 2) {
            infl = "Intern | Full time";
        }
        else if (role.includes("Intern")) {
            infl = "Intern";
        }
        else
            infl = "Full time";
        return infl;
    }
    render() {
        const job = this.props.job;//this was previously accessed through state and constructor was not getting called again when the component's key attribute was not specified
        const auth = this.props.auth;

        //delete and edit job link logic
        var del = null, edit = null;
        var col1 = "rgb(25, 75, 90)";
        if (auth._id && (auth._id === job.postedById)) {
            del = <a style={{ color: col1 }} onClick={this.deleteHandler} href="#">Delete Job</a>;
            edit = <a style={{ color: col1 }} onClick={this.editHandler} href="#">Edit Job</a>;
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
        jobExpiry_date.setHours(0, 0, 0, 0);
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

                    <div className="jobcard">
                        <div >
                            <div className="card">
                                <div className="card-content">
                                    <span style={{ display: "inline" }} className="card-title"><b>{job.companyName}</b></span>
                                    {this.getJobstackButton()}
                                    <hr></hr>
                                    <div className="role">
                                        <p style={{ display: "inline" }}><b>Role:</b> {this.internFulltime()}</p>
                                        <p style={{ display: "inline" }}><b>&nbsp;&nbsp;&nbsp;&nbsp;Title:</b> {job.jobTitle}</p>
                                    </div>
                                    <p className="inline"><b>Batch applicable:</b>&nbsp;</p>
                                    <div className="inline">{job.batch.map(each_batch => (
                                        <p className="inline" key={each_batch}>
                                            {each_batch}&nbsp;</p>))}
                                    </div>
                                    {default_date.getTime() !== jobExpiry_date.getTime() &&
                                        <p><b>Apply Before:</b> {date.toLocaleDateString()}</p>}
                                    <p><b>Referral Applicable:</b> {job.isReferral}</p>
                                    <p><b>Posted by:</b> {job.postedBy}</p>
                                </div>
                                <div className="card-action">
                                    <div className="card-lower">
                                        <a style={{ color: col1 }} target="_blank" rel="noreferrer" href={url} > Apply here</a>
                                        {del}
                                        {edit}
                                        {this.getHeart()}
                                        {this.state.heartCount}
                                    </div>
                                </div>
                                <div>
                                    {deleteText}
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