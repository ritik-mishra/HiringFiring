import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../media/logo.png';

import './Header.css'


class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li><a href={`${process.env.PUBLIC_URL}/auth/google`}>Login With Google</a></li>
                );
            default:
                return (
                    <div>
                        <li><a href={`${process.env.PUBLIC_URL}/jobboard`}>Job Board</a></li>
                        <li><a href={`${process.env.PUBLIC_URL}/addnewjob`}> Add New Job</a></li>
                        <li><a href={`${process.env.PUBLIC_URL}/myjobstack`}>My Jobstack</a></li>
                        <li><a href={`${process.env.PUBLIC_URL}/api/logout`}>Logout</a></li>
                    </div>
                );

        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper" >
                    <Link
                        // to={this.props.auth ? '/dashboard' : '/'}
                        to='/'
                        className="left brand-logo"
                    >
                        {/* Hiring-Firing */}
                        <img src={logo} alt="Logo" style={{ width: "4rem", height: "3rem", marginLeft: "1rem", marginTop: "0.5rem" }} />
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav >
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);