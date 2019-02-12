import React, { Component } from "react";
import classes from "./Transaction.module.css";
import Toggle from "./Toggle/Toggle";
import PropTypes from "prop-types";

class Transaction extends Component {
  render() {
    let extension = null;

    if (this.props.toggle) {
      extension = (
        <div>
          <input />
        </div>
      );
    }

    return (
      <div className={classes.Transaction}>
        <button onClick={this.props.deleteTransaction}>delete</button>
        <div className={classes.Input}>
          <input
            name="amountInput"
            value={this.props.amount}
            onChange={this.props.inputChanged}
            className={classes.InputLeft}
          />
          <input
            name="descriptionInput"
            value={this.props.description}
            onChange={this.props.inputChanged}
            className={classes.InputRight}
          />
        </div>
        <Toggle toggleSwitch={this.props.toggleSwitch} />
        {extension}
      </div>
    );
  }
}

Transaction.propTypes = {
  amout: PropTypes.number,
  description: PropTypes.string
};

export default Transaction;
