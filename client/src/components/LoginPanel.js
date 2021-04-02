import React from "react";
import { Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/LoginPanel.css";
import Modal from "./Modal.js";

export default class LoginPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      modalActive: false,
      redirect: false,
    };
  }

  handleChange = (event) => {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  };

  submitState = async () => {
    //send username and pw
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password,
      }),
    });
    if (response.status === 401) {
      //if it returns bad email
      // window.alert("Create Account!");

      //if it returns bad password
      window.alert("Check Email/Password!");
    } else {
      //if it returns user's data
      this.setState({ redirect: true });
    }
  };

  closeModal = () => {
    this.setState({ modalActive: false });
  };
  openModal = () => {
    this.setState({ modalActive: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/shop" />;
    }
    return (
      <React.Fragment>
        {/* <button onClick={this.openModal}>CLICK ME</button> */}
        <Modal
          active={this.state.modalActive}
          successTitle="Next"
          title="Success"
          dismissHandler={this.closeModal}
        />
        <section className="login-clean">
          <div className="login-clean-panel">
            <h2 className="sr-only">Login Form</h2>
            <div className="illustration">
              <i
                className="icon ion-ios-navigate"
                style={{
                  color: " var(--blue)",
                  background: " rgba(255,255,255,0.4)",
                }}
              ></i>
            </div>
            <div className="form-group">
              <input
                className="form-control"
                value={this.state.email}
                onChange={this.handleChange}
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                type="button"
                style={{ color: "var(--light)", background: " var(--primary)" }}
                onClick={this.submitState}
              >
                Log In
              </button>
            </div>
            <Link className="forgot" to="/createAccount">
              Create Account
            </Link>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
