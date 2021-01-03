import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../media/logo.png';

import './Header.css'


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navClass: "nav-links",
        }
    }
    burgerClick = () => {
        var cls = "";
        if (this.state.navClass === "nav-links") {
            cls = "nav-links nav-active";
        }
        else {
            cls = "nav-links";
        }
        this.setState({
            navClass: cls
        })
    }
    getNavElement = () => {
        const auth = this.props.auth;
        if (auth === null)
            return;
        if (auth === false)
            return (
                <li><a href={`${process.env.PUBLIC_URL}/auth/google`}>Login With Google</a></li>
            )
        return (
            <>
                <li ><a href={`${process.env.PUBLIC_URL}/jobboard`}>Job Board</a></li>
                <li ><a href={`${process.env.PUBLIC_URL}/addnewjob`}> Add New Job</a></li>
                <li ><a href={`${process.env.PUBLIC_URL}/myjobstack`}>My Jobstack</a></li>
                <li ><a href={`${process.env.PUBLIC_URL}/api/logout`}>Logout</a></li>
            </>
        )

    }
    render() {
        return (
            <div className="head">
                <div style={{ display: "inline" }} className="logo">
                    <Link
                        to='/'
                    >
                        <img src={logo} className="logo-image"></img>
                    </Link>
                </div>

                <div className="burger">
                    <div onClick={this.burgerClick} className="icon">&#9776;</div>
                </div>
                <div className="nav-words">
                    <ul style={{ display: "inline" }} className={this.state.navClass}>
                        {this.getNavElement()}
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);