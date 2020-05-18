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
                    <div className="nav-wrapper blue">
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
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="/add-post">New Post</a></li>

                                <li>
                                    <button className="btn btn-small"
                                        style={{
                                            width: "150px",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px"
                                        }}
                                        onClick={this.onLogoutClick}
                                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                    >
                                        Logout
            </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </nav>

            </div>
            //             <div className="navbar-fixed">
            //                 <nav className="z-depth-0">
            //                 <div className="nav-wrapper blue accent-3">
            //                 <a href="/dashboard" className="brand-logo left">Ari's Dream</a>
            //                 <ul id="nav-mobile" className="right hide-on-med-and-down">
            //                     <li><a href="/dashboard">Home</a></li>
            //                     <li><a href="/add-post">New Post</a></li>
            //                     <li>
            //                     <button
            //                             style={{
            //                                 width: "150px",
            //                                 borderRadius: "3px",
            //                                 letterSpacing: "1.5px",
            //                                 marginTop: "1rem"
            //                             }}
            //                             onClick={this.onLogoutClick}
            //                             className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            //                         >
            //                             Logout
            //             </button></li>
            //                 </ul>
            //                 </div> 
            //                 </nav>
            //             </div>
            //         );
            // //         <div className="navbar-fixed">
            // //         <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            // //   <a className="navbar-brand" href="#">Navbar</a>
            // //   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            // //     <span className="navbar-toggler-icon"></span>
            // //   </button>

            // //   <div className="collapse navbar-collapse" id="navbarColor01">
            // //     <ul className="navbar-nav mr-auto">
            // //       <li className="nav-item active">
            // //         <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            // //       </li>
            // //       <li className="nav-item">
            // //         <a className="nav-link" href="#">Features</a>
            // //       </li>
            // //       <li className="nav-item">
            // //         <a className="nav-link" href="#">Pricing</a>
            // //       </li>
            // //       <li className="nav-item">
            // //         <a className="nav-link" href="#">About</a>
            // //       </li>
            // //     </ul>
            // //     <form className="form-inline my-2 my-lg-0">
            // //       <input className="form-control mr-sm-2" type="text" placeholder="Search" />
            // //       <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            // //     </form>
            // //   </div>
            // // </nav>
            // // </div>
            // // );
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