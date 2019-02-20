import React, { Component } from "react";
import classes from "./Transaction.module.css";
import Toggle from "./Toggle/Toggle";
import PropTypes from "prop-types";
import TransactionDate from "./TransactionDate/TransactionDate";
import DeleteButton from "./DeleteButton/DeleteButton";
import Editbutton from "./EditButton/EditButton";

class Transaction extends Component {
  render() {
    const line =
      this.props.date != null ? <hr style={{ width: "50%" }} /> : null;

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
          <DeleteButton
            index={this.props.index}
            deleteTransaction={this.props.deleteTransaction}
          />
          <Editbutton
            isEditable={this.props.isEditable}
            onEdit={this.props.onEdit}
            index={this.props.index}
          />
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
