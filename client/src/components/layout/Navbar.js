import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
    render() {
        return (
            // <div className="navbar-fixed">
            //     <nav className="z-depth-0">
            //             <div className="nav-wrapper success">
            //                 <Link
            //                     to="/"
            //                     style={{
            //                         fontFamily: "monospace"
            //                     }}
            //                     className="col s5 brand-logo center black-text"
            //                 >
            //                     <i className="material-icons">code</i>
            //   Ari's Dream
            // </Link>
            //             </div>      
            //     </nav>
            // </div>
            <div className="navbar-fixed">
                <nav className="z-depth-0">
                <div className="nav-wrapper blue accent-3">
                <a href="/" className="brand-logo left">Logo</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="/">Home</a></li>
                    <li><a href="/add-post">New Post</a></li>
                    <li>
                    Logout
                    </li>
                </ul>
                </div> 
                </nav>
            </div>
        );
//         <div className="navbar-fixed">
//         <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//   <a className="navbar-brand" href="#">Navbar</a>
//   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//   </button>

//   <div className="collapse navbar-collapse" id="navbarColor01">
//     <ul className="navbar-nav mr-auto">
//       <li className="nav-item active">
//         <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link" href="#">Features</a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link" href="#">Pricing</a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link" href="#">About</a>
//       </li>
//     </ul>
//     <form className="form-inline my-2 my-lg-0">
//       <input className="form-control mr-sm-2" type="text" placeholder="Search" />
//       <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
//     </form>
//   </div>
// </nav>
// </div>
// );
    }
}
export default Navbar;