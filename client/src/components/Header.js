import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderContent(){
        switch(this.props.auth){
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                );
            default:
                return(
                    <div>
                        <li><a href = "/addJobForm"> Add New Job</a></li>
                        <li><a href="/api/logout">Logout</a></li>
                    </div>
                );
        }
    }

    render(){
        return (
            <nav>
                <div className = "nav-wrapper">
                    <Link
                        to={this.props.auth ? '/dashboard' : '/'}
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