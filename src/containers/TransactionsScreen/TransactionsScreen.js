import React from "react";
import Transaction from "../../components/Transaction/Transaction";

const TransactionsScreen = props => {
  const currentTransaction = [...props.transactions];

  const transactions = currentTransaction.map((transaction, index) => {
    return (
      <Transaction
        amount={transaction.amount}
        description={transaction.description}
        toggle={transaction.toggle}
        shareWith={transaction.shareWith}
        key={"transaction " + index}
        inputChanged={event => props.inputChanged(event, index)}
      />
    );
  });
  return transactions;
};
export default TransactionsScreen;
