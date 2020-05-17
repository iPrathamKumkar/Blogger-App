import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import axios from "axios";
class AddPost extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {},
            image: "",
            uploadImageURL: "",
            title: "",
            text: ""
        };
        this.getPicture = this.getPicture.bind(this);
        this.onFileSubmit = this.onFileSubmit.bind(this);

    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/login");
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    getPicture = e => {
        e.preventDefault();
        this.setState({
            image: e.target.files[0]
        })
    }
    onSubmit = e => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            text: this.state.text,
            image: this.state.uploadImageURL,
            id: localStorage.getItem('id')
        };

        axios.post(`http://localhost:5000/api/posts/create`, data)
            .then(response => {
                console.log(response);
                if (response.status == 200) {
                    this.setState({
                        uploaded: true
                    })
                }
            }
            ).catch(ex => {
                alert(ex);
            });
    };
    onFileSubmit = e => {
        e.preventDefault();
        console.log(this.state.image)
        const data = new FormData()
        data.append('file', this.state.image)
        axios.post(`http://localhost:5000/api/posts/add-image`, data)
            .then(response => {
                console.log(response);
                if (response.status == 200) {
                    this.setState({
                        uploadImageURL: response.data.data
                    })
                }
            }
            ).catch(ex => {
                alert(ex);
            });
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Add</b> new post
              </h4>
                        </div>
                        <div>
                            <div className="file-field input-field">
                                <div className="btn btn-small waves-effect waves-light hoverable blue accent-3s">
                                    <span>Choose file</span>
                                    <input type="file" onChange={this.getPicture} />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" />
                                </div>
                                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                    <button
                                        style={{
                                            width: "150px",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            marginTop: "1rem"
                                        }}
                                        className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                                        onClick={this.onFileSubmit}
                                    >
                                        Upload file
                </button>
                                </div>

                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.title}
                                    id="title"
                                    type="text"
                                />
                                <label htmlFor="title">Title</label>
                                {/* <span className="red-text">{errors.email}</span> */}
                            </div>
                            <div className="input-field col s12">
                                <textarea id="text" className="materialize-textarea" onChange={this.onChange}
                                    value={this.state.text}></textarea>
                                <label htmlFor="textarea1">Text</label>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    onClick={this.onSubmit}
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Submit
                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
AddPost.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    {}
)(withRouter(AddPost));