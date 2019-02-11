import React, { Component } from "react";
import classes from "./Transaction.module.css";
import Toggle from "./Toggle/Toggle";
import PropTypes from "prop-types";

class Transaction extends Component {
  render() {
    return (
      <div className={classes.Transaction}>
        <div className={classes.Input}>
          <input
            id="amountInput"
            value={this.props.amount}
            onChange={this.props.inputChanged}
            className={classes.InputLeft}
          />
          <input
            id="descriptionInput"
            value={this.props.description}
            onChange={this.props.inputChanged}
            className={classes.InputRight}
          />
        </div>
        <Toggle />
      </div>
    );
  }
}

Transaction.propTypes = {
  amout: PropTypes.number,
  description: PropTypes.string
};

export default Transaction;
