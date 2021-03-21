import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/PageSurround.css";
import "../assets/fonts/font-awesome.min.css";
import "../assets/fonts/ionicons.min.css";
import ShoppingCartCollapse from "./ShoppingCartCollapse";
import { Link } from "react-router-dom";

export default class PageSurround extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingCartCollapsed: true,
    };
  }

  toggleShoppingCart = () => {
    // console.log("toggle");
    this.setState((state, props) => {
      return { shoppingCartCollapsed: !state.shoppingCartCollapsed };
    });
  };

  render() {
    return (
      <React.Fragment>
        <nav
          className="navbar navbar-dark navbar-expand-md fixed-top bg-dark"
          style={{ color: "var(--dark)" }}
        >
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Collab
            </Link>
            <button
              data-toggle="collapse"
              className="navbar-toggler"
              data-target="#navcol-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="navbar-nav d-flex flex-grow-1 align-items-center flex-md-row flex-sm-column">
                <li className="nav-item">
                  <Link className="nav-link" to="/shop">
                    Shop
                  </Link>
                </li>
                <li className="nav-item ml-md-auto">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <a onClick={this.toggleShoppingCart} className="nav-link">
                    <i className="fa fa-shopping-cart"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <ShoppingCartCollapse isCollapsed={this.state.shoppingCartCollapsed} />
        {this.props.children}

        <footer className="footer-dark" style={{ width: "100%" }}>
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-3 item">
                <h3>Services</h3>
                <ul>
                  <li>
                    <a href="#">Web design</a>
                  </li>
                  <li>
                    <a href="#">Development</a>
                  </li>
                  <li>
                    <a href="#">Hosting</a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-6 col-md-3 item">
                <h3>About</h3>
                <ul>
                  <li>
                    <a href="#">Company</a>
                  </li>
                  <li>
                    <a href="#">Team</a>
                  </li>
                  <li>
                    <a href="#">Careers</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6 item text">
                <h3>Company Name</h3>
                <p>
                  Praesent sed lobortis mi. Suspendisse vel placerat ligula.
                  Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam
                  quis tristique lectus. Aliquam in arcu eget velit pulvinar
                  dictum vel in justo.
                </p>
              </div>
              <div className="col item social">
                <a href="#">
                  <i className="icon ion-social-facebook"></i>
                </a>
                <a href="#">
                  <i className="icon ion-social-twitter"></i>
                </a>
                <a href="#">
                  <i className="icon ion-social-snapchat"></i>
                </a>
                <a href="#">
                  <i className="icon ion-social-instagram"></i>
                </a>
              </div>
            </div>
            <p className="copyright">Company Name © 2020</p>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}
