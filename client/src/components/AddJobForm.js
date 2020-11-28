import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router';


class AddJobForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          companyName: '',
          jobTitle: '',
          jobLink: '',
          batch: '',
          postedBy: '',
          redirect: false
        };
      }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }
    submitHandler = (event) => {
        event.preventDefault();
        const job = {
            companyName: this.state.companyName,
            jobTitle: this.state.jobTitle,
            jobLink: this.state.jobLink,
            batch: this.state.batch,
            postedBy: this.state.postedBy
        }
        
        axios.post('/api/add_job',job).then(
            (res, err) => {
                if(err)
                    throw err;
                console.log(res);
                this.setState({ redirect: true })
            }
        )
    }
    render(){
        let allowSubmit = '';
        if (this.state.companyName && this.state.jobTitle && this.state.jobLink && this.state.batch && this.state.postedBy) {
            allowSubmit = <input
                          type='submit'
                          />;
            } 
        else {
            allowSubmit = 'Fill all the fields';
        }
        const { redirect } = this.state;
        if (redirect) {
          return <Redirect to="/dashboard" />;
        }
        return (
            <form onSubmit = {this.submitHandler}>
            <p>Company Name:</p>
             <input
                type='text'
                name='companyName'
                onChange = {this.myChangeHandler}
            />
            <p>Job Title</p>
            <input
                type='text'
                name='jobTitle'
                onChange = {this.myChangeHandler}
            />
            <p>Job Link</p>
            <input
                type='text'
                name='jobLink'
                onChange = {this.myChangeHandler}
            />
            <p>Batch</p>
            <input
                type='text'
                name='batch'
                onChange = {this.myChangeHandler}
            />
            <p>Posted By</p>
            <input
                type='text'
                name='postedBy'
                onChange = {this.myChangeHandler}
            />
            <div>
                {allowSubmit}
            </div> 
            </form>
        );
    }
}

export default AddJobForm;