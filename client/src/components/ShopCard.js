import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/ShopCard.css";
import "../assets/fonts/font-awesome.min.css";
import bananaPic from "../assets/images/banana.jpg";

export default class ShopCard extends React.Component {
  render() {
    return (
      <div className="card shop-card">
        <img
          src={bananaPic}
          className="card-img-top w-100 d-block shop-card-image"
        />
        <div className="card-body d-flex flex-row align-items-center shop-card-body">
          <h4 className="align-self-baseline card-title">Banana</h4>
          <button className="btn btn-primary shop-card-add" type="button">
            <i className="fa fa-plus"></i>
          </button>
        </div>
      </div>
    );
  }
}
