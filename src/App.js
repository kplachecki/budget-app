import React, { Component } from "react";
import TransactionsScreen from "./containers/TransactionsScreen/TransactionsScreen";
import Aux from "./hoc/_Aux";
import Layout from "./components/Layout/Layout";

class App extends Component {
  state = {
    transaction: [
      {
        amount: 0,
        description: "",
        toggle: false,
        shareWith: null
      }
    ]
  };

  // onAddTransaction = index => {
  //   const transactions = [...this.state.transaction];
  //   transactions.push(transactions);
  //   this.setState({ transaction: transactions });
  // };

  onInputHandler = (event, index) => {
    const transactions = [...this.state.transaction];
    const currentTransaction = transactions[index];
    console.log(index);

    if (event.target.id === "descriptionInput") {
      const newDescription = event.target.value;
      const prevDescription = currentTransaction.description;

      if (prevDescription !== newDescription) {
        currentTransaction.description = newDescription;
        this.setState({
          transaction: transactions
        });
      }
    } else if (event.target.id === "amountInput") {
      const newAmount = event.target.value;
      const prevAmount = currentTransaction.amount;

      if (prevAmount !== newAmount) {
        currentTransaction.amount = newAmount;
        this.setState({
          transaction: transactions
        });
      }
    }
  };

  render() {
    return (
      <Aux>
        <Layout addTransaction={this.onAddTransaction}>
          <TransactionsScreen
            transactions={this.state.transaction}
            inputChanged={this.onInputHandler}
          />
        </Layout>
      </Aux>
    );
  }
}

export default App;
