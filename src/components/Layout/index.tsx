import React, { Component } from "react";

import Sidebar from "../Sidebar";
import Header from "../Header";

import items from "./../../sitemap";

export default class Layout extends Component {
  render() {
    return (
      <>
        <Header />
        <Sidebar items={items} />
        <div className="system-container" id="system_container">
          {this.props.children}
        </div>
      </>
    );
  }
}
