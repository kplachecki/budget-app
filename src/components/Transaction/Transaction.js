import React, { Component } from "react";
import classes from "./Transaction.module.css";
import Toggle from "./Toggle/Toggle";
import PropTypes from "prop-types";
import TransactionDate from "./TransactionDate/TransactionDate";
import DeleteButton from "./DeleteButton/DeleteButton";
import Editbutton from "./EditButton/EditButton";
import Contributors from "./Contributors/Contributors";
import { Input } from "antd";

class Transaction extends Component {
  render() {
    const line =
      this.props.date != null ? <hr style={{ width: "60%" }} /> : null;

    let transactionContent = (
      <div className={classes.Input}>
        <Input.Group compact>
          <Input
            placeholder="Amount"
            type="number"
            value={this.props.amount}
            onChange={this.props.amountInputHandler}
            style={{ width: "30%" }}
          />
          <Input
            placeholder="Transaction description"
            value={this.props.description}
            onChange={this.props.descriptionInputHandler}
            style={{ width: "70%" }}
          />
        </Input.Group>
      </div>
    );

    if (this.props.isEditable === false && this.props.index !== 0) {
      transactionContent = (
        <div className={classes.Input}>
          <p>
            Transaction value is {this.props.amount}, described as "
            {this.props.description}"
          </p>
        </div>
      );
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

          <Toggle
            toggleSwitch={this.props.toggleSwitch}
            isEditable={this.props.isEditable}
            index={this.props.index}
            toggle={this.props.toggle}
          />
          <Contributors
            transactionContributors={this.props.transactionContributors}
            index={this.props.index}
            inputChanged={this.props.inputChanged}
            isEditable={this.props.isEditable}
            toggle={this.props.toggle}
            onInputContributor={this.props.onInputContributor}
            onAddContributor={this.props.onAddContributor}
            onEditContributor={this.props.onEditContributor}
            onReturnedContributor={this.props.onReturnedContributor}
            onDeleteContributor={this.props.onDeleteContributor}
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
