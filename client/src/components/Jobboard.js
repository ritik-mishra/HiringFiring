import React, { Component } from 'react';
import axios from 'axios';
//import localStorage from 'local-storage';
import Jobcard from './Jobcard';
import './Jobboard.css';

class Jobboard extends Component {
    constructor(props) {
        var pg = 1, x = localStorage.getItem("page");
        if (x) {
            pg = parseInt(x);
            localStorage.removeItem("page");
        }
        super(props);
        this.myRef = React.createRef();
        this.state = {
            jobs: [],
            page: pg,
            jobcount: 1
        }
    }
    componentDidMount() {
        this.fetchJobs();
        window.scrollTo(0, 0);
    }
    setLocal = (x) => {
        localStorage.setItem("page", this.state.page);
    }
    async fetchJobs() {
        const page_jobs = await axios.get(`${process.env.PUBLIC_URL}/api/page_job?page=${this.state.page}`);
        const jc = await axios.get(`${process.env.PUBLIC_URL}/api/count_job`);
        const jobcount = parseInt(jc.data);
        this.setState({
            jobs: page_jobs,
            jobcount: jobcount
        })
    }
    async clickHandler(p) {
        const newp = parseInt(p);
         this.setState({
            page: newp
        }, async() => {
            await this.fetchJobs();
        })
        window.scrollTo(0, 0);
    }
    render() {

        //Pagination Logic
        let items = [];
        const PAGE_SIZE = 5;
        const jc = this.state.jobcount;//change this accordingly
        let pagec = jc / PAGE_SIZE + ((jc % PAGE_SIZE) ? 1 : 0);
        for (let num = 1; num <= pagec; num++) {
            var col = "white";
            if (num === this.state.page)
                col = "rgb(248, 114, 3)";
            items.push(
                <button onClick={() => this.clickHandler(num)} key={num} style={{ backgroundColor: col }
                } className="button button5" > {num}</button>
            );
        }


        const JOBS = this.state.jobs.data;
        
        if (JOBS)
            return (
                <div>
                    <div>
                        {
                            JOBS.map(job => (
                                //Adding key property here is segregating the the jobs being called and on changing the page calling the,
                                //child's component again
                                <Jobcard key={job.jobId} job={job} setLocal={this.setLocal} />
                            )
                            )
                        }
                    </div>
                    <div className="center">
                        {items}
                    </div>

                </div>
            )
        else
            return <h1 className="container" style={{ color: "white" }}>Loading...</h1>
    }
}
export default Jobboard;