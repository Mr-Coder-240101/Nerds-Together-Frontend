import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { updateUserProfile } from "../../actions/profile";
import Alert from "../layout/Alert";

class EditProfile extends Component {
    state = {
        profile: {
            status: this.props.profile.status,
            location: this.props.profile.location,
            skills: this.props.profile.skills.toString(),
            bio: this.props.profile.bio,
            website: this.props.profile.website,
            twitter: this.props.profile.social ? this.props.profile.social.twitter : "",
            facebook: this.props.profile.social ? this.props.profile.social.facebook : "",
            youtube: this.props.profile.social ? this.props.profile.social.youtube : "",
            linkedin: this.props.profile.social ? this.props.profile.social.linkedin : "",
            instagram: this.props.profile.social ? this.props.profile.social.instagram : "",
            github: this.props.profile.social ? this.props.profile.social.github : "",
        },
        showSocialNetworkLinks: false,
        redirectToDashboard: false,
    };

    toggle = () => {
        this.setState({ showSocialNetworkLinks: !this.state.showSocialNetworkLinks });
    };

    onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ profile: { ...this.state.profile, [name]: value } });
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        const profile = this.state.profile;
        this.props.updateUserProfile(profile);
        this.setState({ redirectToDashboard: true });
    };

    getSocialMediaLinks = () => {
        if (this.state.showSocialNetworkLinks) {
            return (
                <Fragment>
                    <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"></i>
                        <input
                            type="text"
                            placeholder="Twitter URL"
                            name="twitter"
                            value={this.state.profile.twitter}
                            onChange={this.onChangeHandler}
                        />
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-facebook fa-2x"></i>
                        <input
                            type="text"
                            placeholder="Facebook URL"
                            name="facebook"
                            value={this.state.profile.facebook}
                            onChange={this.onChangeHandler}
                        />
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-youtube fa-2x"></i>
                        <input
                            type="text"
                            placeholder="YouTube URL"
                            name="youtube"
                            value={this.state.profile.youtube}
                            onChange={this.onChangeHandler}
                        />
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-linkedin fa-2x"></i>
                        <input
                            type="text"
                            placeholder="Linkedin URL"
                            name="linkedin"
                            value={this.state.profile.linkedin}
                            onChange={this.onChangeHandler}
                        />
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-instagram fa-2x"></i>
                        <input
                            type="text"
                            placeholder="Instagram URL"
                            name="instagram"
                            value={this.state.profile.instagram}
                            onChange={this.onChangeHandler}
                        />
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-github fa-2x"></i>
                        <input
                            type="text"
                            placeholder="Github URL"
                            name="github"
                            value={this.state.profile.github}
                            onChange={this.onChangeHandler}
                        />
                    </div>
                </Fragment>
            );
        }
    };

    render() {
        if (this.state.redirectToDashboard) {
            return <Redirect to="/dashboard" />;
        } else {
            return (
                <Fragment>
                    <section className="container">
                        <Alert />
                        <h1 className="large text-primary">Create Your Profile</h1>
                        <p className="lead">
                            <i className="fas fa-user"></i> Let's Get Some Information To Make Your
                            Profile Stand Out
                        </p>
                        <form className="form" onSubmit={this.onSubmitHandler}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Status"
                                    name="status"
                                    value={this.state.profile.status}
                                    onChange={this.onChangeHandler}
                                    required
                                />
                                <small className="form-text">
                                    Give Us An Idea Of Where You Are At In Your Career (Eg.
                                    Developer At Google, Student At IIT Mumbai)
                                </small>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.profile.location}
                                    onChange={this.onChangeHandler}
                                    required
                                />
                                <small className="form-text">
                                    City & State Suggested (Eg. Ahmedabad, Gujarat)
                                </small>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Skills"
                                    name="skills"
                                    value={this.state.profile.skills}
                                    onChange={this.onChangeHandler}
                                    required
                                />
                                <small className="form-text">
                                    Please Use Comma Separated Values (Eg. Html, CSS, Java,
                                    Javascript, Python)
                                </small>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="A Short Bio Of Yourself"
                                    name="bio"
                                    value={this.state.profile.bio}
                                    onChange={this.onChangeHandler}
                                    required
                                />
                                <small className="form-text">Tell Us A Little About Yourself</small>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Website"
                                    name="website"
                                    value={this.state.profile.website}
                                    onChange={this.onChangeHandler}
                                />
                                <small className="form-text">
                                    Could Be Your Own Or A Company Website (Optional)
                                </small>
                            </div>

                            <div className="my-2">
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={this.toggle}
                                >
                                    Add Social Network Links
                                </button>
                                <span>(Optional)</span>
                            </div>

                            {this.getSocialMediaLinks()}

                            <input type="submit" className="btn btn-primary my-1" />
                            <Link className="btn btn-light my-1" to="/dashboard">
                                Go Back
                            </Link>
                        </form>
                    </section>
                </Fragment>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile.profile,
});

export default connect(mapStateToProps, { updateUserProfile })(EditProfile);
