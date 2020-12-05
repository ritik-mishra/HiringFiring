import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import url from '../configClient/url';


class Header extends Component {
    renderContent(){
        switch(this.props.auth){
            case null:
                return;
            case false:
                return (
                    <li><a href={ url.baseURL + "/auth/google"}>Login With Google</a></li>
                );
            default:
                return(
                    <div>
                        <li><a href = {url.baseURL + "/addJobForm"}> Add New Job</a></li>
                        <li><a href= {url.baseURL + "/api/logout"}>Logout</a></li>
                    </div>
                );

        }
    }

    render(){
        //console.log(this.props);
        return (
            <nav>
                <div className = "nav-wrapper">
                    <Link
                        to={this.props.auth ? url.baseURL + '/dashboard' : '/'}
                        className = "left brand-logo"
                    >
                        Hiring-Firing
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);