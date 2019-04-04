import React, { Component } from "react";
import classes from "./Transaction.module.css";
import Toggle from "./Toggle/Toggle";
import TransactionDate from "./TransactionDate/TransactionDate";
import DeleteButton from "./DeleteButton/DeleteButton";
import Editbutton from "./EditButton/EditButton";
import Contributors from "./Contributors/Contributors";
import OptionsSwitch from "./OptionsSwitch/OptionsSwitch";
import { Input, Statistic } from "antd";

class Transaction extends Component {
  render() {
    const line =
      this.props.date !== "" ? (
        <hr style={{ width: "60%", marginTop: "20px" }} />
      ) : null;

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
            allowClear
          />
        </Input.Group>
      </div>
    );

    let inputValid = false;
    if (
      this.props.amount !== 0 &&
      this.props.amount.length !== 0 &&
      this.props.description.length !== 0
    ) {
      inputValid = true;
    }

    if (this.props.isEditable === false && this.props.index !== 0) {
      transactionContent = (
        <div className={classes.Input}>
          <Statistic
            title={this.props.description}
            prefix="$"
            value={this.props.amount}
            style={{
              textAlign: "center"
            }}
          />
        </div>
      );
    }

    let switchOptions = (
      <Toggle
        toggleSwitch={this.props.toggleSwitch}
        isEditable={this.props.isEditable}
        index={this.props.index}
        toggle={this.props.toggle}
        inputValid={inputValid}
      />
    );

    if (this.props.toggle && this.props.isEditable) {
      switchOptions = (
        <React.Fragment>
          <Toggle
            toggleSwitch={this.props.toggleSwitch}
            isEditable={this.props.isEditable}
            index={this.props.index}
            toggle={this.props.toggle}
            inputValid={inputValid}
          />
          <OptionsSwitch
            toggle={this.props.toggle}
            onOptionsSwitchChange={this.props.onOptionsSwitchChange}
            index={this.props.index}
            transactionContributors={this.props.transactionContributors}
            splitOption={this.props.splitOption}
            isEditable={this.props.isEditable}
          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {line}
        <TransactionDate date={this.props.date} />
        <div className={classes.Transaction}>
          <div className={classes.Actions}>
            <Editbutton
              isEditable={this.props.isEditable}
              onEdit={this.props.onEdit}
              index={this.props.index}
            />
            <DeleteButton
              index={this.props.index}
              deleteTransaction={this.props.deleteTransaction}
            />
          </div>

          {transactionContent}
          <div className={classes.SwitchOptions}>{switchOptions}</div>
          <Contributors
            handleDelete={this.props.handleDelete}
            transactionContributors={this.props.transactionContributors}
            index={this.props.index}
            inputChanged={this.props.inputChanged}
            isEditable={this.props.isEditable}
            toggle={this.props.toggle}
            splitOption={this.props.splitOption}
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

export default Transaction;
