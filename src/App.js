import React, { Component } from "react";
import TransactionsScreen from "./containers/TransactionsScreen/TransactionsScreen";
import Layout from "./components/Layout/Layout";
import "antd/dist/antd.css";

const CONTRIBUTORS = {
  key: "",
  name: "",
  defaultValue: 0,
  value: "",
  isReturned: false,
  contributorIsEditable: true
};

const TRANSACTION = {
  amount: "",
  prevAmount: 0,
  description: "",
  toggle: false,
  date: null,
  isEditable: true,
  sharedAmount: 0,
  transactionContributors: [CONTRIBUTORS]
};

class App extends Component {
  state = {
    transactions: [
      {
        amount: "",
        prevAmount: 0,
        description: "",
        toggle: false,
        date: null,
        isEditable: true,
        sharedAmount: 0,
        transactionContributors: [
          {
            key: "",
            name: "",
            defaultValue: 0,
            value: "",
            isReturned: false,
            contributorIsEditable: true
          }
        ]
      }
    ],
    contributors: [
      {
        name: "",
        value: ""
      }
    ],
    budget: 0,
    notReturned: 0
  };

  // inputValidation = (event) => {

  //   if ((event.target.value).length === 0) {

  //   }
  // }

  //mapping contributors array and sum default contributors values to notReturned in state
  sharedAmountManipulation = index => {
    const transaction = [...this.state.transactions];
    const oldSharedAmount = transaction[index].sharedAmount;

    const arr = transaction[index].transactionContributors.map(contributor => {
      if (contributor.isReturned) {
        return 0;
      } else {
        return contributor.defaultValue;
      }
    });
    arr[0] = 0;
    const updatedSharedAmount = arr.reduce((a, b) => a + b);
    transaction[index].sharedAmount = Number(updatedSharedAmount.toFixed(2));

    this.setState({ transactions: transaction }, () =>
      this.notReturnedManipulation(oldSharedAmount, updatedSharedAmount)
    );
  };

  notReturnedManipulation = (oldSharedAmount, updatedSharedAmount) => {
    const oldNotReturned = this.state.notReturned;

    const newNotReturned =
      oldNotReturned - oldSharedAmount + updatedSharedAmount;
    this.setState({ notReturned: Number(newNotReturned.toFixed(2)) });
  };

  //calculate actual value for each contributor regard to transaction value
  onContributorValue = (index, contributorIndex) => {
    const transaction = [...this.state.transactions];

    const transactionValue = transaction[index].amount;
    const divider = transaction[index].transactionContributors.length;

    if (transaction[index].transactionContributors[0].value.length < 1) {
      transaction[index].transactionContributors[0].defaultValue = Number(
        (transactionValue / (divider + 1)).toFixed(2)
      );
    } else {
      transaction[index].transactionContributors[0].defaultValue =
        transaction[index].transactionContributors[0].value;
    }

    for (let i = 1; i < divider; i++) {
      if (transaction[index].transactionContributors[i].value.length < 1) {
        transaction[index].transactionContributors[i].defaultValue = Number(
          (transactionValue / divider).toFixed(2)
        );
      } else {
        transaction[index].transactionContributors[i].defaultValue =
          transaction[index].transactionContributors[i].value;
      }
    }

    this.setState({ transactions: transaction });
  };

  //change contributor if value was returned and update notReturned state value
  onReturnedContributor = (index, contributorIndex) => {
    const transaction = [...this.state.transactions];
    const oldSharedAmount = transaction[index].sharedAmount;

    const currentContributor =
      transaction[index].transactionContributors[contributorIndex];
    const oldBudget = this.state.budget;

    currentContributor.isReturned = !currentContributor.isReturned;

    if (currentContributor.isReturned) {
      const updatedSharedAmount =
        oldSharedAmount - currentContributor.defaultValue;
      transaction[index].sharedAmount = Number(updatedSharedAmount.toFixed(2));

      this.notReturnedManipulation(oldSharedAmount, updatedSharedAmount);
      const newBudget = oldBudget + currentContributor.defaultValue;
      this.setState({ budget: Number(newBudget.toFixed(2)) });
    }

    this.setState({ transactions: transaction });
  };

  onEditContributor = (index, contributorIndex) => {
    const transaction = [...this.state.transactions];

    transaction[index].transactionContributors[
      contributorIndex
    ].contributorIsEditable = !transaction[index].transactionContributors[
      contributorIndex
    ].contributorIsEditable;
    this.setState({ transactions: transaction });
  };

  onEdit = index => {
    const transaction = [...this.state.transactions];
    const prevAmount = transaction[index].prevAmount;
    const newAmount = transaction[index].amount;
    const budget = this.state.budget;

    if (transaction[index].isEditable === false) {
      transaction[index].prevAmount = transaction[index].amount;
    }
    if (transaction[index].isEditable && prevAmount !== newAmount) {
      this.setState({ budget: budget + prevAmount - newAmount });
    }
    transaction[index].isEditable = !transaction[index].isEditable;

    this.setState({ transactions: transaction });
  };

  budgetDeduction = index => {
    const transaction = [...this.state.transactions];
    const currentTransaction = transaction[index];
    const currentBudget = this.state.budget;

    const arr = currentTransaction.transactionContributors.map(contributor => {
      if (contributor.isReturned) {
        return contributor.defaultValue;
      } else {
        return false;
      }
    });

    const returnedAmount = arr.reduce((a, b) => a + b);
    const newBudget =
      currentBudget + (currentTransaction.amount - returnedAmount);
    this.setState({ budget: Number(newBudget.toFixed(2)) });
  };

  budgetAdd = () => {
    const transaction = [...this.state.transactions];
    const currentBudget = this.state.budget;

    const newBudget = currentBudget - transaction[1].amount;
    this.setState({ budget: newBudget });
  };

  onBudgetChange = event => {
    const currentBudget = this.state.budget;
    const newBudget = Number(event.target.value);

    if (currentBudget !== newBudget) {
      this.setState({ budget: newBudget });
    }
  };

  transactionDate = () => {
    const transaction = [...this.state.transactions];
    const today = new Date();
    const month = today.toLocaleString("pl-pl", { month: "long" });
    transaction[1].date =
      today.getDate() + " " + month + " " + today.getFullYear();
    this.setState({ transactions: transaction });
  };

  onToggleSwitch = index => {
    const transaction = [...this.state.transactions];
    const notReturned = this.state.notReturned;

    transaction[index].toggle = !transaction[index].toggle;

    if (transaction[index].toggle === false) {
      this.setState({
        notReturned: notReturned - transaction[index].sharedAmount
      });
    } else {
      this.setState({
        notReturned: notReturned + transaction[index].sharedAmount
      });
    }
    this.setState({ transactions: transaction });
  };

  onAddTransaction = () => {
    const defaultTransaction = { ...TRANSACTION };
    const defaultContributor = { ...CONTRIBUTORS };
    const transaction = [...this.state.transactions];

    defaultTransaction.transactionContributors = [];
    defaultTransaction.transactionContributors.unshift(defaultContributor);
    transaction.unshift(defaultTransaction);

    this.setState({ transactions: transaction }, () => {
      this.onEdit(1);
      this.transactionDate();
      this.budgetAdd();
    });
  };

  onAddContributor = index => {
    const defaultContributor = { ...CONTRIBUTORS };
    const transaction = [...this.state.transactions];

    const arr = transaction[index].transactionContributors.map(contributor => {
      if (
        String(transaction[index].transactionContributors[0].value).length >= 1
      ) {
        transaction[index].transactionContributors[0].defaultValue =
          transaction[index].transactionContributors[0].value;
      }
      return contributor.defaultValue;
    });
    const totalTransactionValue = arr.reduce((a, b) => a + b);
    // const firstContributorValue =
    //   transaction[index].transactionContributors[0].value;

    if (
      totalTransactionValue > transaction[index].amount
      // firstContributorValue > transaction[index].amount
    ) {
      return;
    } else {
      transaction[index].transactionContributors.unshift(defaultContributor);
      this.setState({ transactions: transaction }, () => {
        this.onEditContributor(index, 1);
        this.onContributorValue(index);
        this.sharedAmountManipulation(index);
      });
    }
  };

  onDeleteContributor = (index, contributorIndex) => {
    const transaction = [...this.state.transactions];

    if (transaction[index].transactionContributors.length <= 1) {
      return;
    }

    transaction[index].transactionContributors.splice(contributorIndex, 1);
    this.setState({ transactions: transaction }, () => {
      this.onContributorValue(index);
      this.sharedAmountManipulation(index);
    });
  };

  onDeleteTransaction = index => {
    const transaction = [...this.state.transactions];
    const sharedAmount = transaction[index].sharedAmount;
    const notReturned = this.state.notReturned;

    if (transaction.length <= 1) {
      return;
    }
    this.budgetDeduction(index);
    this.setState({
      notReturned: Number((notReturned - sharedAmount).toFixed(2))
    });
    transaction.splice(index, 1);
    this.setState({ transactions: transaction });
  };

  onInputContributor = (event, index, contributorIndex) => {
    const transaction = [...this.state.transactions];
    const currentContributor =
      transaction[index].transactionContributors[contributorIndex];

    if (event.target.name === "contributorValue") {
      const newContributorValue = Number(event.target.value);
      currentContributor.value = newContributorValue;
      this.setState({ transactions: transaction });
    }

    if (event.target.name === "contributorName") {
      const newContributorName = event.target.value;
      currentContributor.name = newContributorName;
      this.setState({
        transactions: transaction
      });
    }
  };

  onDescriptionInputHandler = (event, index) => {
    const transaction = [...this.state.transactions];
    const currentTransaction = transaction[index];

    const newDescription = event.target.value;
    const prevDescription = currentTransaction.description;

    if (prevDescription !== newDescription) {
      currentTransaction.description = newDescription;
      this.setState({
        transactions: transaction
      });
    }
  };

  onAmountInputHandler = (event, index) => {
    const transaction = [...this.state.transactions];
    const currentTransaction = transaction[index];

    const newAmount = Number(event.target.value);
    const prevAmount = currentTransaction.amount;

    if (prevAmount !== newAmount) {
      currentTransaction.amount = newAmount;
      this.setState(
        {
          transactions: transaction
        },
        () => this.onContributorValue(index)
      );
    }
  };

  onBlurTransactions = transaction => {};

  render() {
    return (
      <React.Fragment>
        <Layout
          addTransaction={this.onAddTransaction}
          budgetChange={this.onBudgetChange}
          budget={this.state.budget}
          notReturned={this.state.notReturned}
        >
          <TransactionsScreen
            handleDelete={this.handleDelete}
            transactions={this.state.transactions}
            amountInputHandler={this.onAmountInputHandler}
            descriptionInputHandler={this.onDescriptionInputHandler}
            deleteTransaction={this.onDeleteTransaction}
            toggleSwitch={this.onToggleSwitch}
            onEdit={this.onEdit}
            onInputContributor={this.onInputContributor}
            onAddContributor={this.onAddContributor}
            onEditContributor={this.onEditContributor}
            onReturnedContributor={this.onReturnedContributor}
            onDeleteContributor={this.onDeleteContributor}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
