import React, { Component } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';

import Jobcard from './Jobcard';
import './Jobboard.css';

class Jobboard extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            jobs: [],
            page: 1,
            jobcount: 1
        }
    }
    componentDidMount() {
        this.fetchJobs();
        // this.myRef.current.scrollTo(0, 0);
        window.scrollTo(0, 0);
    }
    async fetchJobs() {
        const page_jobs = await axios.get(`/api/page_job?page=${this.state.page}`);
        const jc = await axios.get(`/api/count_job`);
        const jobcount = parseInt(jc.data);
        this.setState({
            jobs: page_jobs,
            jobcount: jobcount
        })
    }
    async clickHandler(p) {
        const newp = parseInt(p);
        await this.setState({
            page: newp
        });
        await this.fetchJobs();
        window.scrollTo(0, 0);
    }
    render() {

        //Pagination Logic
        let items = [];
        const PAGE_SIZE = 5;
        const jc = this.state.jobcount;//change this accordingly
        let pagec = jc / PAGE_SIZE + ((jc % PAGE_SIZE) ? 1 : 0);
        for (let num = 1; num <= pagec; num++) {
            // items.push(
            // <Pagination.Item onClick={() => this.clickHandler(num)} key={num} active={num === this.state.page}>
            //         {num}
            //     </Pagination.Item>,
            // );
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
                                <Jobcard job={job} />
                            )
                            )
                        }
                    </div>
                    <div className="center">
                        <Pagination>{items}</Pagination>
                    </div>

                </div>
            )
        else
            return <h1 className="container" style={{ color: "white" }}>Loading...</h1>
    }
}
export default Jobboard;