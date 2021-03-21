import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Modal extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div
          className={"modal fade" + (this.props.active ? " show" : "")}
          tabIndex="-1"
          role="dialog"
          style={{ display: this.props.active ? "block" : "none" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{this.props.title}</h5>
                <button
                  type="button"
                  className="close"
                  onClick={this.props.dismissHandler}
                >
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">{this.props.body}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.props.dismissHandler}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  {this.props.successTitle}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal-backdrop fade show"
          style={{ display: this.props.active ? "block" : "none" }}
        ></div>
      </React.Fragment>
    );
  }
}
