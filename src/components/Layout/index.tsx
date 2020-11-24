import React, { Component } from "react";

import Header from "../Header";

import { Flex } from "@chakra-ui/core";

export default class Layout extends Component {
  render() {
    return (
      <>
        <Header />
        <Flex pt="70px" justifyContent="center">
          {this.props.children}
        </Flex>
      </>
    );
  }
}
