import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/ShoppingCartCollapse.css";

export default class ShoppingCartCollapse extends React.Component {
  render() {
    return (
      <div
        className={
          "container shopping-cart-collapse" +
          (this.props.isCollapsed ? " collapse" : "")
        }
        style={{ background: "var(--white)" }}
      >
        <ul className="list-group">
          <li className="list-group-item">
            <span>List Group Item 1</span>
          </li>
          <li className="list-group-item">
            <span>List Group Item 2</span>
          </li>
          <li className="list-group-item">
            <span>List Group Item 3</span>
          </li>
        </ul>
        <button className="btn btn-primary" type="button">
          Checkout
        </button>
      </div>
    );
  }
}
