import React, { Component } from "react";
import { render } from "react-dom";
import Main from "./Main";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div
        className=""
        style={{
          border: "0px solid red",
          //width: "100%",
          position: "absolute",
          top: "10%",
          left: "32%",
          transform: "translate(-30% -30%)",
        }}
      >
        <Main />
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
