import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
class Navbar extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        return (
            <div className="navbar-fixed">
                <nav className="z-depth-0">
                    <div className="nav-wrapper blue accent-3">
                        <Link
                            to="/dashboard"
                            style={{
                                fontFamily: "monospace"
                            }}
                            className="col s5 brand-logo center black-text"
                        >
                            <i className="material-icons">code</i>
              Ari's Dream
            </Link>
                        {this.props.auth.isAuthenticated && (
                            <ul id="nav-mobile" className="justify">
                                <li><a href="/add-post"><h7 style={{
                                    fontFamily: "monospace"
                                }}
                                    className="black-text"><b>Create New Post</b></h7></a></li>

                                <li style={{ float: "right" }}>
                                    <button
                                        style={{
                                            fontFamily: "monospace",
                                            borderRadius: "1px",
                                            marginRight: "1rem"
                                        }}
                                        onClick={this.onLogoutClick}
                                        className="btn btn-flat blue accent-3"
                                    >
                                        <b>Logout</b>
            </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </nav>

            </div>
        );
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);