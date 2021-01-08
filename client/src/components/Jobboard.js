import React, { Component } from 'react';
import axios from 'axios';
import Jobcard from './Jobcard';
import './Jobboard.css';
import Sortingfilters from './SortingFilters';


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
            selectedCompanies: [],
            role: [],
            sortBy: "postedOn",
            comparator: -1,
            batch: [],
            jobcount: 1,
            userJobstack: [],
            floatButton: 0,
            sortingClass: "sorting-filters"
        }
        this.refJobs = React.createRef();
        // this.userJobstack = [];
    }
    async componentDidMount() {
        this.fetchJobs();
        const userJobstack = await axios.get(`${process.env.PUBLIC_URL}/api/jobstack_userjobs`);
        this.setState({ userJobstack: userJobstack.data });
    }
    setLocal = (x) => {
        localStorage.setItem("page", this.state.page);
    }
    async fetchJobs() {
        var body = {
            page: this.state.page,
            sortBy: this.state.sortBy,
            comparator: this.state.comparator,
            batch: this.state.batch,
            role: this.state.role,
            companies: this.state.selectedCompanies
        }
        if (body.batch.length === 0) {
            body.batch = ["2020", "2021", "2022", "2023", "2024"];
        }
        if (body.role.length === 0) {
            body.role = ["Intern", "Full time"];
        }
        if (body.companies.length === 0) {
            var comp = await axios.get(`${process.env.PUBLIC_URL}/api/company_list`);
            body.companies = comp.data;
        }

        const page_jobs = await axios({
            method: 'get',
            url: `${process.env.PUBLIC_URL}/api/page_job?page=${this.state.page}`,
            params: body
        });
        const jc = await axios(
            {
                method: 'get',
                url: `${process.env.PUBLIC_URL}/api/count_job`,
                params: body
            });
        const jobcount = parseInt(jc.data);
        this.setState({
            jobs: page_jobs,
            jobcount: jobcount
        })
        this.refJobs.current.scrollTop = 0;
    }
    async clickHandler(p) {
        const newp = parseInt(p);
        this.setState({
            page: newp
        }, async () => {
            await this.fetchJobs();
        })
    }
    filterHandler = async (body) => {
        await this.setState({
            page: 1,
            sortBy: body.sortBy,
            comparator: body.comparator,
            batch: body.batch,
            role: body.role,
            selectedCompanies: body.selectedCompanies
        })
        this.fetchJobs();
    }
    showSorting = () => {
        var cls = this.state.sortingClass
        if (cls === "sorting-filters") {
            cls = cls + " show-sorting";
        }
        else {
            cls = "sorting-filters";
        }
        this.setState({
            sortingClass: cls,
            floatButton: !this.state.floatButton
        });

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
                col = "rgb(85, 185, 144)";
            items.push(
                <button onClick={() => this.clickHandler(num)} key={num} style={{ backgroundColor: col }
                } className="pagination" > {num}</button>
            );
        }


        const JOBS = this.state.jobs.data;

        if (JOBS)
            return (
                <div className="content">
                    <div className="filter-button">
                        <button className="filterbtn" onClick={this.showSorting}>{this.state.floatButton ? <i className="fa fa-close"></i> : <i className="fa fa-bars"></i>}Filters</button>
                    </div>
                    <div className="jobboard">
                        <div className="jobs" id="jobs" ref={this.refJobs}>
                            <div>
                                {
                                    JOBS.map(job => (
                                        //Adding key property here is segregating the the jobs being called and on changing the page calling the,
                                        //child's component again
                                        <Jobcard key={job.jobId} job={job} setLocal={this.setLocal} notButton={this.state.userJobstack.includes(job.jobId)} />
                                    )
                                    )
                                }
                            </div>

                            <div className="center">
                                {items}
                            </div>

                        </div>
                        <div className={this.state.sortingClass}>
                            <Sortingfilters filterHandler={this.filterHandler} />
                        </div>
                    </div>
                </div>
            )
        else
            return (<h1 style={{ alignContent: "center" }}>Loading...</h1>);
    }
}
export default Jobboard;
