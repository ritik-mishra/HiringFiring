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
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));
  
  function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
        
    };
  
    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  const styles = (theme) => ({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
      },
      margin: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      },
      table: {
        minWidth: 500,
      },
  });
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
class Jobstack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            page: 0,
            rowsPerPage: 6,
            open: false,
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
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({open: false});
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
        this.setState({open: true});
    }
    deleteHandler = async (row, event) => {
        event.preventDefault();
        const i = this.state.jobs.indexOf(row);
        var ch = this.state.jobs;
        await axios.delete(`${process.env.PUBLIC_URL}/api/delete_jobstack/`+this.state.jobs[i].job_id);
        ch.splice(i, 1);
        this.setState({jobs: ch});
    }
    handleChangePage = async( event, newPage) => {
        console.log(newPage);
        this.setState({page: newPage});
      };
    
    
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
    const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.jobs.length - this.state.page * this.state.rowsPerPage);
    const { classes } = this.props;
  return (
      <div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
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
          {(this.state.rowsPerPage > 0
            ? this.state.jobs.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
            : this.state.jobs
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell align="center"><a href={row.jobLink}>{row.companyName}</a></TableCell>
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
                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose} >
                <Alert onClose={this.handleClose} severity="success">
                    Job details updated!
                </Alert>
      </Snackbar>
              </TableCell>
              <TableCell>
                <IconButton aria-label="delete" className={classes.margin} onClick={this.deleteHandler.bind(this,row)}>
                <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
      <TableFooter className={classes.root}>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[6]}
              colSpan={3}
              count={this.state.jobs.length}
              rowsPerPage={6}
              page={this.state.page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={this.handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  </div>
  );
}
}


export default withStyles(styles)(Jobstack);
