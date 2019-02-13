import React, { Component } from "react";
import classes from "./Transaction.module.css";
import Toggle from "./Toggle/Toggle";
import PropTypes from "prop-types";

class Transaction extends Component {
  render() {
    return (
      <div className={classes.Transaction}>
        <button
          onClick={this.props.deleteTransaction}
          className={classes.Delete}
        >
          delete
        </button>
        <div className={classes.Input}>
          <input
            name="amountInput"
            placeholder="0"
            value={this.props.amount}
            onChange={this.props.inputChanged}
            className={classes.InputLeft}
          />
          <input
            name="descriptionInput"
            placeholder="description"
            value={this.props.description}
            onChange={this.props.inputChanged}
            className={classes.InputRight}
          />
        </div>
        <Toggle
          toggleSwitch={this.props.toggleSwitch}
          toggle={this.props.toggle}
          inputChanged={this.props.inputChanged}
        />
      </div>
    );
  }
}

Transaction.propTypes = {
  amout: PropTypes.number,
  description: PropTypes.string
};

export default Transaction;
