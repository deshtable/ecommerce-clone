import React from "react";
import { postJSON } from "../util.js";
import Modal from "./Modal.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/CreateAccountPanel.css";
import "../assets/css/LoginPanel.css";

export default class CreateAccountPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      modalActive: false,
      modalTitle: "",
    };
  }

  handleChange = (event) => {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  };

  submitState = async () => {
    const res = await postJSON("/createAccount", {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
    });

    console.log(res);
    this.openModal(res.alreadyExists ? "Failure" : "Success");
  };

  closeModal = () => {
    this.setState({ modalActive: false });
  };
  openModal = (title) => {
    this.setState({ modalTitle: title, modalActive: true });
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          active={this.state.modalActive}
          successTitle="Next"
          title={this.state.modalTitle}
          dismissHandler={this.closeModal}
        />
        <section className="login-clean">
          <div className="login-clean-panel">
            <h2 className="sr-only">Login Form</h2>
            <div className="illustration">
              <i className="icon ion-ios-navigate create-account-illustration"></i>
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                onChange={this.handleChange}
                value={this.state.firstName}
                name="firstName"
                placeholder="First Name"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="lastName"
                onChange={this.handleChange}
                value={this.state.lastName}
                placeholder="Last Name"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-block create-account-submit"
                type="button"
                onClick={this.submitState}
              >
                Create Account
              </button>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
