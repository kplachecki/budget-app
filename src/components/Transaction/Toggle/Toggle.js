import React, { Component } from "react";
import classes from "./Toggle.module.css";

class Toggle extends Component {
  render() {
    return (
      <div className={classes.Button}>
        <span>Rachunek Dzielony</span>
        <button onClick={this.props.toggleSwitch}>Toggle Button</button>
      </div>
    );
  }
}

export default Toggle;
