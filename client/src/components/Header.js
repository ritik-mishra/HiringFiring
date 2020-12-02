import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../media/logo.png';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                );
            default:
                return (
                    <div>
                        <li><a href="/dashboard">Job Board</a></li>
                        <li><a href="/addJobForm"> Add New Job</a></li>
                        <li><a href="/api/logout">Logout</a></li>
                    </div>
                );

        }
    }

    render() {
        //console.log(this.props);
        return (
            <nav>
                <div className="nav-wrapper" style={{ backgroundColor: "#204060" }}>
                    <Link
                        // to={this.props.auth ? '/dashboard' : '/'}
                        to='/'
                        className="left brand-logo"
                    >
                        {/* Hiring-Firing */}
                        <img src={logo} alt="Logo" style={{ width: "90px", height: "55px", marginLeft: "10px", marginTop: "5px" }} />
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