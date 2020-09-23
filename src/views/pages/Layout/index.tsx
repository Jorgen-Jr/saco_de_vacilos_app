import React, { Component } from 'react';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

import items from '../../../sitemap';

import './style.css';

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
