import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts:[]
        }
    }

    async componentWillMount() {
        axios.defaults.withCredentials = true;
        await axios.get(`http://localhost:5000/api/posts/${localStorage.getItem("id")}`)
            .then(response => {
               console.log(response);
               this.setState({
                posts: response.data.posts
            })
            }
            ).catch( ex =>{
               
            });
    }
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {

        let posts = this.state.posts.map(post=>{
            return (
                <div className="col s12 m3">
                <div className="card small">
                  <div className="card-image">
                    <img src="images/IMG_20200516_020812.jpg" />
            <span className="card-title">{post.title}</span>
                  </div>
                  <div className="card-content">
                    <p>{post.text}</p>
                  </div>
                  <div className="card-action">
                    <a href="#">This is a link</a>
                  </div>
                </div>
              </div>
            )
        })
        const { user } = this.props.auth;
        return (
            // <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="container-fluid">
                <div className="row">
                {posts}
                </div>
                /* <div className="row">
   <div className="col s12 m3">
      <div className="card medium">
        <div className="card-image">
          <img src="https://i.pinimg.com/originals/e8/c7/c4/e8c7c4d4e14a9e3b21faf3d7b37c5b03.jpg" />
          <span className="card-title">Card Title</span>
        </div>
        <div className="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div className="card-action">
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
  
  </div> */}
                {/* <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>Hey there,</b> {user.name.split(" ")[0]}
                            <p className="flow-text grey-text text-darken-1">
                                Welcome to your{" "}
                                <span style={{ fontFamily: "monospace" }}>BLOG</span> page!
              </p>
                        </h4>
                        <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            onClick={this.onLogoutClick}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            Logout
            </button>
                    </div>
                </div>*/}
            </div> 
        );
    }
}
Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);