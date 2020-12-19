import React, { Component } from 'react';
import axios from 'axios';
import './Jobstack.css';
import Loading from './Loading';


class Jobstack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: []
        }
    }
    async componentDidMount() {
        const st = await axios.get(`${process.env.PUBLIC_URL}/api/jobstack`);
        const stack = st.data;
        var jobs = [];
        for (var k = 0; k < stack.length; k++) {
            var obj1 = stack[k];
            var info = await axios.get(`${process.env.PUBLIC_URL}/api/jobidjob/` + obj1.jobId);
            var obj2 = info.data;
            console.log(obj2);
            console.log(obj1);
            var obj = {
                companyName: obj2.companyName,
                role: obj2.role,
                jobTitle: obj2.jobTitle,
                jobLink: obj2.jobLink,
                isReferral: obj2.isReferral,
                jobExpiry: obj2.jobExpiry,
                salary: obj2.salary,
                status: obj1.status,
                followUp: obj1.followUp,
                comment: obj1.comment,
                isDeleted: obj2.isDeleted
            }
            jobs.push(obj);
        }
        this.setState({
            jobs: jobs
        })

        // console.log(jobs.data);
    }
    getJobsList = () => {
        var jobList = [];
        for (var i = 0; i < this.state.jobs.length; i++) {
            var obj = this.state.jobs[i];
            var job = (
                <tr>
                    <td>
                        {i + 1}.
                    </td>
                    <td>
                        <b>{obj.companyName}</b>
                    </td>
                    <td>
                        {obj.role}
                    </td>
                    <td>
                        {obj.jobTitle}
                    </td>
                    <td>
                        <a target="_blank" rel="noreferrer" href={obj.jobLink}>Apply Here</a>
                    </td>
                    <td>
                        {obj.isReferral}
                    </td>
                    <td>
                        {obj.jobExpiry}
                    </td>
                    <td>
                        {obj.salary}
                    </td>
                    <td>
                        {obj.status}
                    </td>
                    <td>
                        {obj.followUp}
                    </td>
                    <td>
                        {obj.comment}
                    </td>
                    <td>
                        {obj.isDeleted ? "Yes" : "No"}
                    </td>
                    <td>
                        X
                    </td>
                </tr>
            );
            jobList.push(job);
        }
        return jobList;
    }
    render() {
        if (this.state.jobs.length)
            return (
                <div style={{ marginTop: "2rem", overflow: 'auto', width: "85rem", height: "20rem", backgroundColor: "white", color: "black" }} className="container">
                    <table>
                        <tr>
                            <th>S.N.</th>
                            <th>Company Name</th>
                            <th>Role</th>
                            <th>Job Title</th>
                            <th>Job Link</th>
                            <th>Referral Req</th>
                            <th>Job Expiry</th>
                            <th>Salary</th>
                            <th>Status</th>
                            <th>Follow up</th>
                            <th>Comment</th>
                            <th>Deleted from Jobboard</th>
                            <th>Remove</th>
                        </tr>
                        {this.getJobsList()}
                    </table>
                </div>
            );
        else {
            return <Loading />
        }
    }
}
export default Jobstack;