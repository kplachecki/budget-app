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
      value: "",
      isReturned: false,
      contributorIsEditable: true
    }
  ]
};

const CONTRIBUTORS = {
  name: "",
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
    budget: null
  };

  // inputValidation = (event) => {

  //   if ((event.target.value).length === 0) {

  //   }
  // }

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

    const newBudget = currentBudget + Number(currentTransaction.amount);
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
    });
  };

  onAddContributor = index => {
    const defaultContributor = { ...CONTRIBUTORS };
    const transaction = [...this.state.transactions];

    transaction[index].transactionContributors.unshift(defaultContributor);
    this.setState({ transactions: transaction }, () => {
      this.onEditContributor(index, 1);
    });
  };

  onDeleteContributor = (index, contributorIndex) => {
    const transaction = [...this.state.transactions];

    if (transaction[index].transactionContributors.length <= 1) {
      return;
    }
    transaction[index].transactionContributors.splice(contributorIndex, 1);
    this.setState({ transactions: transaction });
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
      const newAmount = event.target.value;
      const prevAmount = currentTransaction.amount;

      if (prevAmount !== newAmount) {
        currentTransaction.amount = newAmount;
        this.setState({
          transactions: transaction
        });
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
