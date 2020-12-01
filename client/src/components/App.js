
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';


import Header from './Header';
import Landing from './Landing';
import AddJobForm from './AddJobForm';
import Dashboard from './Dashboard';

class App extends Component {
    //Lifecycle hook
    //we are wiring up action creator with app as many components may need it.
    componentDidMount() {

        //Acessing the action creator through props
        this.props.fetchUser();
        this.props.fetchJobs();
    }
    render() {

        return (
            <div>
                <BrowserRouter>
                    <div className="container" >
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/addJobForm" component={AddJobForm} />
                    </div>
                </BrowserRouter>
            </div >
        );
    }
};
// first argument is about map state's of props function and the second argument is to wire up all the action creators with the app
// The actions are assigned to the app component as the props
export default connect(null, actions)(App);