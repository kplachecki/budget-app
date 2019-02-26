import React, { Component } from "react";
import TransactionsScreen from "./containers/TransactionsScreen/TransactionsScreen";
import Layout from "./components/Layout/Layout";

const TRANSACTION = {
  amount: "",
  description: "",
  toggle: false,
  shareWith: "",
  date: null,
  isEditable: true,
  transactionContributors: [
    {
      name: "",
      defaultValue: 0,
      value: "",
      isReturned: false,
      contributorIsEditable: true
    }
  ]
};

const CONTRIBUTORS = {
  name: "",
  defaultValue: 0,
  value: "",
  isReturned: false,
  contributorIsEditable: true
};

class App extends Component {
  state = {
    transactions: [
      {
        amount: "",
        description: "",
        toggle: false,
        shareWith: "",
        date: null,
        isEditable: true,
        transactionContributors: [
          {
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
    budget: null,
    notReturned: null
  };

  // inputValidation = (event) => {

  //   if ((event.target.value).length === 0) {

  //   }
  // }

  // const arr = transaction[index].transactionContributors.map(contributor => {
  //   return contributor.defaultValue;
  // });
  // console.log(arr);

  // notReturnedAddition = () => {
  //   const transaction = [...this.state.transactions];
  //   const arr = transaction[0].transactionContributors.map(contributor => {
  //     return contributor.defaultValue;
  //   });
  //   console.log(arr);
  // };

  // onContributorValue = (index, contributorIndex) => {
  //   const transaction = [...this.state.transactions];

  //   const transactionValue = transaction[index].amount;
  //   const divider = transaction[index].transactionContributors.length;

  //   for (let i = 1; i < divider; i++) {
  //     transaction[index].transactionContributors[i].defaultValue = (
  //       transactionValue / divider
  //     ).toFixed(2);
  //   }
  //   transaction[index].transactionContributors[0].defaultValue =
  //     transactionValue / (divider + 1);

  //   this.setState({ transactions: transaction });
  // };

  onReturnedContributor = (index, contributorIndex) => {
    const transaction = [...this.state.transactions];

    transaction[index].transactionContributors[
      contributorIndex
    ].isReturned = !transaction[index].transactionContributors[contributorIndex]
      .isReturned;
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
    transaction[index].isEditable = !transaction[index].isEditable;
    this.setState({ transactions: transaction });
  };

  budgetDeduction = index => {
    const transaction = [...this.state.transactions];
    const currentTransaction = transaction[index];
    const currentBudget = this.state.budget;

    const newBudget = currentBudget + currentTransaction.amount;
    this.setState({ budget: newBudget });
  };

  budgetAdd = () => {
    const transaction = [...this.state.transactions];
    const currentBudget = this.state.budget;

    const newBudget = currentBudget - transaction[1].amount;
    this.setState({ budget: newBudget });
  };

  onBudgetChange = event => {
    const currentBudget = this.state.budget;
    const newBudget = event.target.value;

    if (currentBudget !== newBudget) {
      this.setState({ budget: newBudget });
    }
  };

  transactionDate = () => {
    const transaction = [...this.state.transactions];
    const today = new Date();
    const month = today.toLocaleString("pl-pl", { month: "long" });
    transaction[1].date =
      today.getDate() +
      " " +
      month +
      " " +
      today.getFullYear() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();
    this.setState({ transactions: transaction });
  };

  onToggleSwitch = index => {
    const transaction = [...this.state.transactions];
    transaction[index].toggle = !transaction[index].toggle;
    this.setState({ transactions: transaction });
  };

  onAddTransaction = () => {
    const defaultTransaction = { ...TRANSACTION };
    const transaction = [...this.state.transactions];

    transaction.unshift(defaultTransaction);
    this.setState({ transactions: transaction }, () => {
      this.onEdit(1);
      this.transactionDate();
      this.budgetAdd();
      // this.notReturnedAddition();
    });
  };

  onAddContributor = index => {
    const defaultContributor = { ...CONTRIBUTORS };
    const transaction = [...this.state.transactions];

    transaction[index].transactionContributors.unshift(defaultContributor);
    this.setState({ transactions: transaction }, () => {
      this.onEditContributor(index, 1);
      // this.onContributorValue(index);
    });
  };

  onDeleteContributor = (index, contributorIndex) => {
    const transaction = [...this.state.transactions];

    if (transaction[index].transactionContributors.length <= 1) {
      return;
    }
    transaction[index].transactionContributors.splice(contributorIndex, 1);
    this.setState(
      { transactions: transaction }
      // this.onContributorValue(index)
    );
  };

  onDeleteTransaction = index => {
    const transaction = [...this.state.transactions];

    if (transaction.length <= 1) {
      return;
    }
    this.budgetDeduction(index);
    transaction.splice(index, 1);
    this.setState({ transactions: transaction });
  };

  onInputContributor = (event, index, contributorIndex) => {
    const transaction = [...this.state.transactions];
    const currentContributor =
      transaction[index].transactionContributors[contributorIndex];

    const newContributor = event.target.value;

    currentContributor.name = newContributor;
    this.setState({
      transactions: transaction
    });
  };

  onInputHandler = (event, index) => {
    const transaction = [...this.state.transactions];
    const currentTransaction = transaction[index];

    if (event.target.name === "descriptionInput") {
      const newDescription = event.target.value;
      const prevDescription = currentTransaction.description;

      if (prevDescription !== newDescription) {
        currentTransaction.description = newDescription;
        this.setState({
          transactions: transaction
        });
      }
    } else if (event.target.name === "amountInput") {
      const newAmount = Number(event.target.value);
      const prevAmount = currentTransaction.amount;

      if (prevAmount !== newAmount) {
        currentTransaction.amount = newAmount;
        this.setState(
          {
            transactions: transaction
          }
          // () => this.onContributorValue(index)
        );
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <Layout
          addTransaction={this.onAddTransaction}
          budgetChange={this.onBudgetChange}
          budget={this.state.budget}
        >
          <TransactionsScreen
            transactions={this.state.transactions}
            inputChanged={this.onInputHandler}
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
