import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
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
      ).catch(ex => {

      });
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    let posts = this.state.posts.map(post => {
      return (
        <div className="col s12 m3">
          <div className="card small">
            <div className="card-image">
              <img src={post.image} />
              <span className="card-title">{post.title}</span>
            </div>
            <div className="card-content">
              <p>{post.text}</p>
            </div>
          </div>
        </div>
      )
    })
    return (
      <div className="container-fluid">
        <div className="row">
          {posts}
        </div>
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