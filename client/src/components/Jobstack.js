import React, { Component } from 'react';
import axios from 'axios';
import './Jobstack.css';
import Table from '@material-ui/core/Table';
import Modal from '@material-ui/core/Modal';
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
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import SaveIcon from '@material-ui/icons/Save';
import { Multiselect } from 'multiselect-react-dropdown';

import NotificationModal from './NotificationModal';
import JobstackModal from './JobstackModal';
import Giphy from './Giphy';


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
  formControl2: {
    margin: theme.spacing(3),
  },
  widthCell: {
    width: "1%",
  },
  midWidthCell: {
    width: "13%",
  },
  broadWidthCell: {
    width: "30%",
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  cross: {
    position: 'absolute',
    bottom: '2%',
    left: '1%',
  },
});
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class Jobstack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_jobs: [],
      jobs: [],
      page: 0,
      rowsPerPage: 6,
      open: false,
      deleteOpen: false,
      failSnack: false,
      current_row: 0,
      sortBy: "addTime",
      comparator: -1,
      filerOpen: false,
      role: '',
      status: [],
      company_list: [],
      selectedCompanies: [],
      giphy: false,
      stat: 'Not Applied',
    }
  }
  handleChangeStatus = async (row, event) => {
    const i = this.state.jobs.indexOf(row);
    const val = event.target.value;
    var ch = this.state.jobs;
    ch[i].status = val;
    this.setState({ jobs: ch });
    if (val === "Applied")
      await this.setState({ giphy: true, stat: val });
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
  handleFailSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ failSnack: false });
  };
  handleClickFilterOpen = () => {
    this.setState({ filterOpen: true });
  }
  handleFilterClose = () => {
    this.setState({ filterOpen: false });
  }
  handleGiphyClose = () => {
    this.setState({ giphy: false });
  }
  roleChangeHandler = (event) => {
    let val = event.target.value;
    this.setState({ role: val });
  }
  statusChangeHandler = (event) => {
    let val = event.target.name;
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
    const res = await axios.patch(`${process.env.PUBLIC_URL}/api/update_jobstack/` + this.state.jobs[i].jobId, job);
    if (res.status == 200)
      this.setState({ open: true });
    else
      this.setState({ failSnack: true });
  }
  deleteHandler = async (row, event) => {
    event.preventDefault();
    const i = this.state.jobs.indexOf(row);
    const id = this.state.jobs[i].jobId;
    var ch = this.state.jobs;
    await axios.delete(`${process.env.PUBLIC_URL}/api/delete_jobstack/` + this.state.jobs[i].jobId);
    ch.splice(i, 1);
    var j = this.state.all_jobs;
    j = j.filter(function (j) {
      return j.jobId !== id;
    });
    this.setState({ jobs: ch, all_jobs: j });
    this.setState({ deleteOpen: false });
  }
  handleChangePage = async (event, newPage) => {
    console.log(newPage);
    this.setState({ page: newPage });
  };
  applyClickHandler = async () => {
    this.filterJobstack();
    this.setState({ filterOpen: false });
  }
  companyChangeHandler = async (event) => {
    await this.setState({
      selectedCompanies: event
    })
  }
  clearFilter = async () => {
    this.setState({
      role: [],
      status: [],
      selectedCompanies: [],
    });
  }

  async filterJobstack() {
    const body = {
      role: this.state.role,
      status: this.state.status,
      selectedCompanies: this.state.selectedCompanies,
    }
    if (body.role.length === 0)
      body.role = ["Intern", "Full time"];

    if (body.status.length === 0)
      body.status = ["Not Applied", "Applied", "Asked for Referral", "Interview Scheduled"];

    if (body.selectedCompanies.length === 0) {
      let companies = [];
      this.state.all_jobs.map(company => { companies.push(company.companyName) })
      body.selectedCompanies = companies;
    }
    var list_job = [];
    var job = this.state.all_jobs;
    job.map(j => {
      if (j.role.some(item => body.role.includes(item)) && body.status.includes(j.status) &&
        body.selectedCompanies.includes(j.companyName)) list_job.push(j);
    })

    this.setState({
      role: body.role,
      status: body.status,
      selectedCompanies: [],
      jobs: list_job,
    })
  }
  changeGiphy = () => {
    this.setState({ giphy: false });
  }
  handleChangeSort = async (event) => {
    const val = event.target.value;
    if (val === "addTime") {
      var job = this.state.jobs;
      job.sort(function (a, b) {
        return new Date(b[val]) - new Date(a[val]);
      });
      await this.setState({
        sortBy: val,
        jobs: job,
        all_jobs: job,
      })
    }
    else if (val === "jobExpiry") {
      var job = this.state.jobs;
      job.sort(function (a, b) {
        return new Date(a[val]) - new Date(b[val]);
      });
      await this.setState({
        sortBy: "jobExpiry",
        jobs: job,
      })
    }
  };


  async componentDidMount() {
    const body = {
      sortBy: this.state.sortBy,
      comparator: this.state.comparator,
    }
    const st = await axios({
      method: 'get',
      url: `${process.env.PUBLIC_URL}/api/jobstack`,
      params: body
    });
    const jobs = st.data;
    await this.setState({
      jobs: jobs,
      all_jobs: jobs,
    })
    let companies = [];
    this.state.jobs.map(company => { companies.push(company.companyName) })
    this.setState({ company_list: companies });
  }

  render() {
    const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.jobs.length - this.state.page * this.state.rowsPerPage);
    const { classes } = this.props;
    const save_hover = `Save changes`;
    return (

      <div className='jobstack' style={{ marginTop: "0.5rem" }}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="table-headd" align="center" ><b>Company</b></TableCell>
                <TableCell align="center"><b>Status</b></TableCell>
                <TableCell className={classes.midWidthCell} align="center"><b>Follow-up</b></TableCell>
                <TableCell className={classes.broadWidthCell} align="center"><b>Comment</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(this.state.rowsPerPage > 0
                ? this.state.jobs.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                : this.state.jobs
              ).map((row) => (
                <TableRow>
                  <TableCell align="center"><a href={row.jobLink}>{row.companyName}</a></TableCell>
                  <TableCell align="center">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={row.status}
                      onChange={this.handleChangeStatus.bind(this, row)}
                    >
                      <MenuItem value={"Not Applied"} > Not Applied</MenuItem>
                      <MenuItem value={"Asked for Referral"} >Asked for Referral</MenuItem>
                      <MenuItem value={"Applied"} >Applied</MenuItem>
                      <MenuItem value={"Interview Scheduled"} name="status">Interview Scheduled</MenuItem>
                    </Select>
                  </TableCell>

                  <TableCell className={classes.midWidthCell} align="center">
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

                  <TableCell className={classes.broadWidthCell} align="center">
                    <TextField id="standard-multiline-flexible" fullWidth label="Multiline" multiline rowsMax={3} name="comment" value={row.comment}
                      onChange={this.handleChange.bind(this, row)} />
                  </TableCell>

                  <TableCell className={classes.widthCell} align="center">
                    <Tooltip title={save_hover}>
                      <IconButton aria-label="save" onClick={this.submitHandler.bind(this, row)} >
                        <SaveIcon style={{ color: '#fc4c6f' }} fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                    <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose} >
                      <Alert onClose={this.handleClose} severity="success">
                        Job details updated!
                      </Alert>
                    </Snackbar>
                    <Snackbar open={this.state.failSnack} autoHideDuration={6000} onClose={this.handleFailSnackClose} >
                      <Alert onClose={this.handleFailSnackClose} severity="error">
                        Job update failed!
                      </Alert>
                    </Snackbar>
                  </TableCell>

                  <TableCell className={classes.widthCell}>
                    <Tooltip title="Delete">
                      <IconButton aria-label="delete" onClick={this.handleClickOpen.bind(this, row)}>
                        <DeleteIcon style={{ color: '#fc4c6f' }} fontSize="medium" />
                      </IconButton>
                    </Tooltip>
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
                        <Button style={{ backgroundColor: "red" }} onClick={this.deleteHandler.bind(this, this.state.jobs[this.state.current_row])}
                          color="primary" autoFocus>
                          Yes
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </TableCell>

                  <TableCell className={classes.widthCell} align="center">
                    <NotificationModal job={row} />
                  </TableCell>


                  <TableCell className={classes.widthCell} align="center">
                    <JobstackModal job={row} />
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

                  &nbsp;
                  <div style={{ display: "inline" }} className={classes.filterr}>
                    <Button onClick={this.handleClickFilterOpen}>Filter</Button>
                    <Dialog disableBackdropClick disableEscapeKeyDown open={this.state.filterOpen} onClose={this.handleFilterClose}>
                      <DialogTitle style={{ color: "black" }} >Select Filter</DialogTitle>
                      <DialogContent>
                        <form >
                          <FormControl style={{ color: "black" }} component="fieldset">
                            <FormLabel component="legend">Role</FormLabel>
                            <RadioGroup name="role" value={this.state.role} onChange={this.roleChangeHandler}>
                              <FormControlLabel style={{ color: "black" }} value="Intern" checked={this.state.role === "Intern"} control={<Radio />} label="Intern" />
                              <FormControlLabel value="Full time" checked={this.state.role === "Full time"} control={<Radio />} label="Full time" />
                            </RadioGroup>
                          </FormControl>

                          <FormControl component="fieldset">
                            <FormLabel component="legend">Status</FormLabel>
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox checked={this.state.status.includes("Not Applied")}
                                  onChange={this.statusChangeHandler} name="Not Applied" />}
                                label="Not Applied"
                              />
                              <FormControlLabel
                                control={<Checkbox checked={this.state.status.includes("Asked for Referral")}
                                  onChange={this.statusChangeHandler} name="Asked for Referral" />}
                                label="Asked for Referral"
                              />
                              <FormControlLabel
                                control={<Checkbox checked={this.state.status.includes("Applied")}
                                  onChange={this.statusChangeHandler} name="Applied" />}
                                label="Applied"
                              />
                              <FormControlLabel
                                control={<Checkbox checked={this.state.status.includes("Interview Scheduled")}
                                  onChange={this.statusChangeHandler} name="Interview Scheduled" />}
                                label="Interview Scheduled"
                              />
                            </FormGroup>
                          </FormControl>

                          <FormControl component="fieldset">
                            <FormLabel component="legend">Companies (at most 5)</FormLabel>
                            <Multiselect
                              options={this.state.company_list}
                              isObject={false}
                              onSelect={this.companyChangeHandler}
                              onRemove={this.companyChangeHandler}
                              placeholder="Select Companies"
                              // selectedValues={this.state.selectedCompanies}
                              selectionLimit="5"
                            />
                          </FormControl>
                          <Button className={classes.cross} style={{ backgroundColor: "#fc4c6f" }} onClick={this.clearFilter} >
                            Clear Filter
                          </Button>
                        </form>
                      </DialogContent>
                      <DialogActions>
                        <Button style={{ backgroundColor: "#dfe6e3" }} onClick={this.handleFilterClose} >
                          Cancel
                      </Button>
                        <Button style={{ backgroundColor: "#f58840" }} onClick={this.applyClickHandler} >
                          Apply
                      </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
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
        <div>
          <Giphy isOpen={this.state.giphy} status={this.state.stat} changeGiphyInJobstack={this.changeGiphy} />
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(Jobstack);