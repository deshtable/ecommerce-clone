import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/ShopDeck.css";
import ShopCard from "./ShopCard.js";

export default class ShopDeck extends React.Component {
  render() {
    return (
      <section>
        <div className="container d-flex flex-row justify-content-center flex-wrap shop-deck">
          <ShopCard />
          <ShopCard />
          <ShopCard />
          <ShopCard />
          <ShopCard />
          <ShopCard />
          <ShopCard />
          <ShopCard />
          <ShopCard />
          <ShopCard />
          <ShopCard />
          <ShopCard />
        </div>
      </section>
    );
  }
}
