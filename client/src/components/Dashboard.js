import React, { Component } from 'react';
import { connect } from 'react-redux';


import Jobcard from './Jobcard';
import './Dashboard.css'



class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: ""
        };
    }

    renderContent() {
        const jobs = this.props.jobss;
        if (jobs) {
            return (
                <div className="Jobs">
                    {
                        jobs.map(job => (
                            <Jobcard job={job} />
                        )
                        )}
                </div>
            );
        }
        return "Wait";
    }


    render() {
        return (

            <div className="container">
                <ul>
                    {this.renderContent()}
                </ul>

            </div>

        );

    }
}

function mapStateToProps({ jobss }) {
    return { jobss };
}

export default connect(mapStateToProps)(Dashboard);