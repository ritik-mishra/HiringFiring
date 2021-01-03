import React, { Component } from 'react';
import axios from 'axios';
import './Jobstack.css';
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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
      deleteOpen: false,
      current_row: 0,
      sortBy: "addTime",
      comparator: -1,
      filerOpen: false,
      role: [],
      status: [],
    }
  }
  handleChangeStatus = (row, event) => {
    const i = this.state.jobs.indexOf(row);
    const val = event.target.value;
    var ch = this.state.jobs;
    ch[i].status = val;
    this.setState({ jobs: ch });
  };
  handleChangeFollowUp = (row, event) => {
    const i = this.state.jobs.indexOf(row);
    const val = event.target.value;
    var ch = this.state.jobs;
    ch[i].followUp = val;
    this.setState({ jobs: ch });
  };
  handleChange = (row, event) => {
    const i = this.state.jobs.indexOf(row);
    const val = event.target.value;
    const nam = event.target.name;
    var ch = this.state.jobs;
    ch[i][nam] = val;
    this.setState({ jobs: ch });
  };
  handleClickOpen = (row, event) => {
    const i = this.state.jobs.indexOf(row);
    this.setState({ deleteOpen: true, current_row: i });
  };
  handleDeleteClose = () => {
    this.setState({ deleteOpen: false, current_row: 0 });
  }
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };
  handleClickFilterOpen = () => {
    this.setState({ filterOpen: true });
  }
  handleFilterClose = () => {
    this.setState({ filterOpen: false });
  }
  roleChangeHandler = (event) => {
    let val = event.target.value;
    console.log(val);
    var new_role = this.state.role;
    const index = this.state.role.indexOf(val);
    if (index > -1) {
      new_role.splice(index, 1);
    }
    else {
      new_role.push(val);
    }
    this.setState({ role: new_role });
  }
  statusChangeHandler = (event) => {
    let val = event.target.value;
    var new_status = this.state.status;
    const index = this.state.status.indexOf(val);
    if (index > -1) {
      new_status.splice(index, 1);
    }
    else {
      new_status.push(val);
    }
    this.setState({ status: new_status });
  }
  submitHandler = async (row, event) => {
    event.preventDefault();
    const i = this.state.jobs.indexOf(row);
    const job = {
      status: this.state.jobs[i].status,
      followUp: this.state.jobs[i].followUp,
      comment: this.state.jobs[i].comment
    }
    await axios.patch(`${process.env.PUBLIC_URL}/api/update_jobstack/` + this.state.jobs[i].job_id, job);
    this.setState({ open: true });
  }
  deleteHandler = async (row, event) => {
    event.preventDefault();
    const i = this.state.jobs.indexOf(row);
    var ch = this.state.jobs;
    await axios.delete(`${process.env.PUBLIC_URL}/api/delete_jobstack/` + this.state.jobs[i].job_id);
    ch.splice(i, 1);
    this.setState({ jobs: ch });
    this.setState({ deleteOpen: false });
  }
  handleChangePage = async (event, newPage) => {
    console.log(newPage);
    this.setState({ page: newPage });
  };
  async fetchJobstack() {
    const body = {
      sortBy: this.state.sortBy,
      comparator: this.state.comparator
    }
    const st = await axios({
      method: 'get',
      url: `${process.env.PUBLIC_URL}/api/jobstack`,
      params: body
    });
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
        jobTitle: obj2.jobTitle || "N/A",
        jobLink: obj2.jobLink,
        isReferral: obj2.isReferral || "N/A",
        jobExpiry: obj2.jobExpiry,
        salary: obj2.salary || "N/A",
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
  handleChangeSort = async (event) => {
    const val = event.target.value;
    if (val === "addTime") {
      await this.setState({
        sortBy: val,
        comparator: -1,
      })
    }
    else if (val === "jobExpiry") {
      await this.setState({
        sortBy: "jobExpiry",
        comparator: 1,
      })
    }
    this.fetchJobstack();
  };


  async componentDidMount() {
    this.fetchJobstack();
  }
  testClick = () => {
    console.log("Clicked");
  }

  render() {
    const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.jobs.length - this.state.page * this.state.rowsPerPage);
    const { classes } = this.props;
    return (
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="table-headd" align="center" >Company</TableCell>
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
                    <TextField id="standard-basic" name="comment" value={row.comment} label="Add a comment" onChange={this.handleChange.bind(this, row)} />
                  </TableCell>

                  <TableCell align="center">
                    <input style={{ color: "red" }} type='submit' value="Update Changes" onClick={this.submitHandler.bind(this, row)} />
                    <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose} >
                      <Alert onClose={this.handleClose} severity="success">
                        Job details updated!
                </Alert>
                    </Snackbar>
                  </TableCell>

                  <TableCell>
                    <IconButton aria-label="delete" className={classes.margin} onClick={this.handleClickOpen.bind(this, row)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <Dialog
                      open={this.state.deleteOpen}
                      onClose={this.handleDeleteClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle style={{ color: "black" }} id="alert-dialog-title">{"Are you sure you want to delete?"}</DialogTitle>
                      <DialogActions>
                        <Button style={{ backgroundColor: "green" }} onClick={this.handleDeleteClose} >
                          No
                        </Button>
                        <Button style={{ backgroundColor: "red" }} onClick={this.deleteHandler.bind(this, this.state.jobs[this.state.current_row])} color="primary" autoFocus>
                          Yes
                        </Button>
                      </DialogActions>
                    </Dialog>
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
                <TableCell> Sort By: &nbsp;
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.sortBy}
                    onChange={this.handleChangeSort}
                  >
                    <MenuItem value={"addTime"} > Recent Added</MenuItem>
                    <MenuItem value={"jobExpiry"} >Job Expiry</MenuItem>
                  </Select>
                </TableCell>

                <TableCell>
                  <Button onClick={this.handleClickFilterOpen}>Open select dialog</Button>
                  <Dialog disableBackdropClick disableEscapeKeyDown open={this.state.filterOpen} onClose={this.handleFilterClose}>
                    <DialogTitle style={{ color: "black" }} >Select Filter</DialogTitle>
                    <DialogContent>
                      <form >
                        <button onClick={this.testClick}>Click me</button>
                        <InputLabel style={{ color: "black" }} htmlFor="demo-dialog-native">Job Role</InputLabel>
                        &nbsp;
                            <p><input type="checkbox" name='role' value="Intern"
                          // checked={this.state.role.includes("Intern")}
                          onClick={this.roleChangeHandler}
                        />
                          <span style={{ color: "black" }}>Intern</span>
                        </p>
                        <p>
                          <input type="checkbox" name='role' value="Full time"
                            checked={this.state.role.includes("Full time")}
                            onChange={this.roleChangeHandler}
                          />
                          <span style={{ color: "black" }}>Full time</span>
                        </p>



                        <InputLabel style={{ color: "black" }} htmlFor="demo-dialog-native">Status</InputLabel>
                        &nbsp;
                            <p><input type="checkbox" name='status' value="Not Applied"
                          checked={this.state.status.includes("Not Applied")}
                          onChange={this.statusChangeHandler}
                        />
                          <span style={{ color: "black" }}>Not Applied</span>
                        </p>
                        <p>
                          <input type="checkbox" name='status' value="Applied"
                            checked={this.state.status.includes("Applied")}
                            onChange={this.statusChangeHandler}
                          />
                          <span style={{ color: "black" }}>Applied</span>
                        </p>
                        <p>
                          <input type="checkbox" name='status' value="Asked for Referral"
                            checked={this.state.status.includes("Asked for Referral")}
                            onChange={this.statusChangeHandler}
                          />
                          <span style={{ color: "black" }}>Asked for Referral</span>
                        </p>
                        <p>
                          <input type="checkbox" name='status' value="Interview Scheduled"
                            checked={this.state.status.includes("Interview Scheduled")}
                            onChange={this.statusChangeHandler}
                          />
                          <span style={{ color: "black" }}>Interview Scheduled</span>
                        </p>


                      </form>
                    </DialogContent>
                    <DialogActions>
                      <Button style={{ backgroundColor: "green" }} onClick={this.handleFilterClose} >
                        Cancel
                    </Button>
                      <Button style={{ backgroundColor: "red" }} onClick={this.handleFilterClose} >
                        Ok
                    </Button>
                    </DialogActions>
                  </Dialog>
                </TableCell>

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