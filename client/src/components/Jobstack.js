import React, { Component } from 'react';
import axios from 'axios';
import './Jobstack.css';
import Loading from './Loading';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


class Jobstack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: []
        }
    }
    handleChangeStatus = (row, event) => {
        const i = this.state.jobs.indexOf(row);
        const val = event.target.value;
        var ch = this.state.jobs;
        ch[i].status=val;
        this.setState({jobs: ch});
    };
    handleChangeFollowUp = (row, event) => {
        const i = this.state.jobs.indexOf(row);
        const val = event.target.value;
        var ch = this.state.jobs;
        ch[i].followUp=val;
        this.setState({jobs: ch});
    };
    handleChange = (row, event) => {
        const i = this.state.jobs.indexOf(row);
        const val = event.target.value;
        const nam = event.target.name;
        var ch = this.state.jobs;
        ch[i][nam]=val;
        this.setState({jobs: ch});
    };
    submitHandler = async (row, event) => {
        event.preventDefault();
        const i = this.state.jobs.indexOf(row);
        const job = {
            status: this.state.jobs[i].status,
            followUp: this.state.jobs[i].followUp,
            comment: this.state.jobs[i].comment
        }
        await axios.patch(`${process.env.PUBLIC_URL}/api/update_jobstack/`+this.state.jobs[i].job_id, job);
        alert("Job updated!");
    }
    deleteHandler = async (row, event) => {
        event.preventDefault();
        const i = this.state.jobs.indexOf(row);
        var ch = this.state.jobs;
        await axios.delete(`${process.env.PUBLIC_URL}/api/delete_jobstack/`+this.state.jobs[i].job_id);
        ch.splice(i, 1);
        this.setState({jobs: ch});
    }
    async componentDidMount() {
        const st = await axios.get(`${process.env.PUBLIC_URL}/api/jobstack`);
        const stack = st.data;
        var jobs = [];
        for (var k = 0; k < stack.length; k++) {
            var obj1 = stack[k];
            var info = await axios.get(`${process.env.PUBLIC_URL}/api/jobidjob/` + obj1.jobId);
            var obj2 = info.data;
            // console.log(obj2);
            // console.log(obj1);
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
                isDeleted: obj2.isDeleted,
                job_id: obj1.jobId
            }
            jobs.push(obj);
        }
        this.setState({
            jobs: jobs
        })
    }
    
render(){
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="table-head" align="center" >Company</TableCell>
            <TableCell className="table-head" align="center">Role</TableCell>
            <TableCell align="center">Job Title</TableCell>
            <TableCell align="center">Referral applicable</TableCell>
            <TableCell align="center">Job Expiry</TableCell>
            <TableCell align="center">Salary</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Follow-up</TableCell>
            <TableCell align="center">Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.jobs.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="center">{row.companyName}</TableCell>
              <TableCell align="center">{row.role}</TableCell>
              <TableCell align="center">{row.jobTitle}</TableCell>
              <TableCell align="center">{row.isReferral}</TableCell>
              <TableCell align="center">{row.jobExpiry}</TableCell>
              <TableCell align="center">{row.salary}</TableCell>
              <TableCell align="center">
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={row.status}
                onChange={this.handleChangeStatus.bind(this, row)}
                >
                <MenuItem value={"Not Applied"} > Not Applied</MenuItem>
                <MenuItem value={"Applied"} >Applied</MenuItem>
                <MenuItem value={"Asked for Referral"} >Asked for Referral</MenuItem>
                <MenuItem value={"Interview Scheduled"} name="status">Interview Scheduled</MenuItem>
                </Select>
              </TableCell>
              <TableCell align="center">
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={row.followUp}
                onChange={this.handleChangeFollowUp.bind(this, row)}
                >
                <MenuItem value={"No"} > No</MenuItem>
                <MenuItem value={"Yes"} >Yes</MenuItem>
                </Select> 
              </TableCell>
              <TableCell align="center">
                <TextField id="standard-basic" name="comment" value = {row.comment} label="Add a comment" onChange={this.handleChange.bind(this,row)}/>
              </TableCell>
              <TableCell align="center">
                <input style={{ color: "red" }} type='submit' value="Update Changes" onClick={this.submitHandler.bind(this,row)} />
              </TableCell>
              <TableCell>
                <IconButton aria-label="delete" onClick={this.deleteHandler.bind(this,row)}>
                <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
}


export default Jobstack;
