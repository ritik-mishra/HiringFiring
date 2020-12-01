import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {

    renderContent() {
        const jobs = this.props.jobss;
        console.log(this.props.jobss);
        if (jobs) {
            return (


                <div>
                    <div>
                        {jobs.map(job => (
                            <div>
                                <div className="card">
                                    <div className="card-tabs">
                                        <ul className="tabs tabs-fixed-width">
                                            <li className="tab"><div> {job.companyName}</div></li>
                                            <li className="tab"><div> {job.postedBy}</div></li>
                                            <li className="tab"><div> {job.jobId}</div></li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
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
        this.setState({ jobs: data, loading: false });
        // console.log(data[0]);
    }

    render() {
        console.log("In Dashboard");
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