import React from "react";
import Transaction from "../../components/Transaction/Transaction";

const TransactionsScreen = props => {
  const currentTransaction = [...props.transactions];
  const transactions = currentTransaction.map((transaction, index) => {
    return (
      <Transaction
        handleDelete={props.handleDelete}
        amount={transaction.amount}
        description={transaction.description}
        toggle={transaction.toggle}
        key={"transaction " + index}
        amountInputHandler={event => props.amountInputHandler(event, index)}
        descriptionInputHandler={event =>
          props.descriptionInputHandler(event, index)
        }
        deleteTransaction={() => props.deleteTransaction(index)}
        toggleSwitch={() => props.toggleSwitch(index)}
        date={transaction.date}
        index={index}
        onEdit={() => props.onEdit(index)}
        isEditable={transaction.isEditable}
        transactionContributors={transaction.transactionContributors}
        onInputContributor={props.onInputContributor}
        onAddContributor={props.onAddContributor}
        onEditContributor={props.onEditContributor}
        onReturnedContributor={props.onReturnedContributor}
        onDeleteContributor={props.onDeleteContributor}
      />
    );
  });
  return transactions;
};
export default TransactionsScreen;
