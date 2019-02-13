import React, { Component } from "react";
import TransactionsScreen from "./containers/TransactionsScreen/TransactionsScreen";
import Aux from "./hoc/_Aux";
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

  onToggleSwitch = index => {
    const transaction = [...this.state.transactions];
    transaction[index].toggle = !transaction[index].toggle;
    this.setState({ transactions: transaction });
  };

  onAddTransaction = () => {
    const defaultTransaction = { ...TRANSACTION };
    const transaction = [...this.state.transactions];

    transaction.push(defaultTransaction);
    this.setState({ transactions: transaction });
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
      <Aux>
        <Layout addTransaction={this.onAddTransaction}>
          <TransactionsScreen
            transactions={this.state.transactions}
            inputChanged={this.onInputHandler}
            deleteTransaction={this.onDeleteTransaction}
            toggleSwitch={this.onToggleSwitch}
          />
        </Layout>
      </Aux>
    );
  }
}

export default App;
