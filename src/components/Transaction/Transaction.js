import React, { Component } from "react";
import classes from "./Transaction.module.css";
import Toggle from "./Toggle/Toggle";
import PropTypes from "prop-types";
import TransactionDate from "./TransactionDate/TransactionDate";

class Transaction extends Component {
  render() {
    const line =
      this.props.date != null ? <hr style={{ width: "50%" }} /> : null;

    const editArr = [];
    let editStr = "edit";
    if (this.props.isEditable) {
      editArr.push(classes.Accept);
      editStr = "accept";
    }

    let deleteButton = null;
    let editButton = null;
    if (this.props.index !== 0) {
      deleteButton = (
        <button
          onClick={this.props.deleteTransaction}
          className={classes.Delete}
        >
          delete
        </button>
      );
      editButton = (
        <button onClick={this.props.onEdit} className={editArr.join(" ")}>
          {editStr}
        </button>
      );
    }

    let transactionContent = (
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
    );

    if (this.props.isEditable === false && this.props.index !== 0) {
      transactionContent = (
        <div className={classes.Input}>
          <p>
            {this.props.amount} <span>{this.props.description}</span>
          </p>
        </div>
      );
    }

    let toggleContent = (
      <Toggle
        toggleSwitch={this.props.toggleSwitch}
        toggle={this.props.toggle}
        inputChanged={this.props.inputChanged}
        isEditable={this.props.isEditable}
        index={this.props.index}
        shareWith={this.props.shareWith}
      />
    );
    if (this.props.index !== 0 && this.props.shareWith.length === 0) {
      toggleContent = null;
    }

    return (
      <React.Fragment>
        {line}
        <TransactionDate date={this.props.date} />
        <div className={classes.Transaction}>
          {deleteButton}
          {editButton}
          {transactionContent}
          {toggleContent}
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
