
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import Header from './Header';
import Landing from './Landing';
import AddJobForm from './AddJobForm';
import Jobboard from './Jobboard';
import EditJobForm from './EditJobForm';
import Jobstack from './Jobstack';


class App extends Component {
    //Lifecycle hook
    //we are wiring up action creator with app as many components may need it.
    componentDidMount() {

        //Acessing the action creator through props
        this.props.fetchUser();
    }
    render() {
        return (
            <div>
                {/* {this.props.location.pathname !== '/jobboard' && <Header/>} */}
                <Header />
                <Route exact path="/jobboard" component={Jobboard} />
                <Route exact path="/" component={Landing} />
                <Route exact path="/addnewjob" component={AddJobForm} />
                <Route exact path="/editjob" render={(props) => <EditJobForm {...props} />} />
                <Route exact path="/myjobstack" component={Jobstack} />
            </div>
        );
    }
};
// first argument is about map state's of props function and the second argument is to wire up all the action creators with the app
// The actions are assigned to the app component as the props
export default compose(connect(null, actions), withRouter)(App);