import React, { Component } from "react";
import classes from "./Transaction.module.css";
import Toggle from "./Toggle/Toggle";
import PropTypes from "prop-types";
import TransactionDate from "./TransactionDate/TransactionDate";

class Transaction extends Component {
  render() {
    let line = null;
    if (this.props.date != null) {
      line = <hr style={{ width: "50%" }} />;
    }
    return (
      <React.Fragment>
        {line}
        <TransactionDate date={this.props.date} />
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
              type="number"
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
      </React.Fragment>
    );
  }
}

Transaction.propTypes = {
  amout: PropTypes.number,
  description: PropTypes.string
};

export default Transaction;
