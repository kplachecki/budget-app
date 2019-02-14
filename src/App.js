import React, { Component } from "react";
import TransactionsScreen from "./containers/TransactionsScreen/TransactionsScreen";
import Layout from "./components/Layout/Layout";

const TRANSACTION = {
  amount: "",
  description: "",
  toggle: false,
  shareWith: "",
  date: null
};

class App extends Component {
  state = {
    transactions: [
      {
        amount: "",
        description: "",
        toggle: false,
        shareWith: "",
        date: null
      }
    ]
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
    console.log(transaction[1].date);
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
    this.setState({ transactions: transaction }, () => this.transactionDate());
  };

  onDeleteTransaction = index => {
    const transaction = [...this.state.transactions];

    transaction.splice(index, 1);
    this.setState({ transactions: transaction });
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
    } else if (event.target.name === "shareWithInput") {
      const newShareWith = event.target.value;
      const prevShareWith = currentTransaction.shareWith;

      if (prevShareWith !== newShareWith) {
        currentTransaction.shareWith = newShareWith;
        this.setState({
          transactions: transaction
        });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <Layout addTransaction={this.onAddTransaction}>
          <TransactionsScreen
            transactions={this.state.transactions}
            inputChanged={this.onInputHandler}
            deleteTransaction={this.onDeleteTransaction}
            toggleSwitch={this.onToggleSwitch}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
