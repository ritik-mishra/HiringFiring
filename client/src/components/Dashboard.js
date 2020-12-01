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
                <div>
                    <div>
                        {jobs.map(job => (
                            <Jobcard job={job} />
                        ))}
                    </div>
                </div>
            );
        }
        return "Wait";
    }

    async componentDidMount() {
        const response = await fetch('/api/all_jobs');
        const data = await response.json();
        // console.log(data);
        this.setState({ jobs: data, loading: false });
        // console.log(data[0]);
    }

    render() {
        console.log(this.state.jobs);
        return (

            <div>
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