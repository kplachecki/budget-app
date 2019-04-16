import React, { Component } from "react";
import "antd/dist/antd.css";
import axios from "./axios";
import TransactionsScreen from "./containers/TransactionsScreen/TransactionsScreen";
import Layout from "./components/Layout/Layout";
import Spinner from "./components/Layout/Spinner/Spinner";

let CONTRIBUTOR = null;

let TRANSACTION = null;

class App extends Component {
  state = {
    transactions: null,
    budget: null,
    notReturned: null,
    drawerVisible: false,
    loginModalVisible: false,
    dataLoaded: false,
    authLogin: {
      token: localStorage.getItem("token"),
      id: localStorage.getItem("userID"),
      email: "",
      password: ""
    }
  };

  user = {
    userID: "",
    data: {
      budget: 0,
      notReturned: 0,
      transactions: null
    }
  };

  componentDidMount() {
    const dateTime = new Date().getTime();
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("tokenExpireDate") > dateTime
    ) {
      axios
        .get("/defaultData.json")
        .then(response => {
          CONTRIBUTOR = response.data.CONTRIBUTOR;
          TRANSACTION = response.data.TRANSACTION;

          axios
            .get(
              `/users/${this.state.authLogin.id}/data.json?auth=${
                this.state.authLogin.token
              }`
            )
            .then(response => {
              const transactions = response.data.transactions;
              const budget = response.data.budget;
              const notReturned = response.data.notReturned;
              this.setState({ budget: budget });
              this.setState({ notReturned: notReturned });
              this.setState({ transactions: transactions }, () => {
                this.setState({ dataLoaded: true });
              });
            })
            .catch(error => {
              alert(error);
            });
        })
        .catch(error => {
          alert(error);
        });
    } else {
      this.setState({ loginModalVisible: true });
      axios
        .get("/defaultData.json")
        .then(response => {
          CONTRIBUTOR = response.data.CONTRIBUTOR;
          TRANSACTION = response.data.TRANSACTION;

          const transactions = response.data.transactions;
          const budget = 0;
          const notReturned = 0;
          this.setState({ budget: budget });
          this.setState({ notReturned: notReturned });
          this.setState({ transactions: transactions }, () => {
            this.setState({ dataLoaded: true });
          });
        })
        .catch(error => {
          alert(error);
        });
    }
  }

  onEmailHandler = event => {
    const authLogin = { ...this.state.authLogin };
    const userEmail = event.target.value;

    authLogin.email = userEmail;
    this.setState({ authLogin: authLogin });
  };

  onPasswordHandler = event => {
    const authLogin = { ...this.state.authLogin };
    const userPassword = event.target.value;

    authLogin.password = userPassword;
    this.setState({ authLogin: authLogin });
  };

  onSignInHandler = () => {
    const authLogin = { ...this.state.authLogin };
    const authData = {
      email: authLogin.email,
      password: authLogin.password,
      returnSecureToken: true
    };

    axios
      .post(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=",
        authData
      )
      .then(response => {
        if (response.status === 200) {
          const authLogin = { ...this.state.authLogin };

          const tokenExpireDate =
            new Date().getTime() + response.data.expiresIn * 1000;
          localStorage.setItem("token", response.data.idToken);
          localStorage.setItem("tokenExpireDate", tokenExpireDate);
          localStorage.setItem("userID", response.data.localId);
          this.checkAuthTimeout(response.data.expiresIn);
          authLogin.id = response.data.localId;
          authLogin.token = response.data.idToken;

          axios
            .get(
              `/users/${response.data.localId}/data/transactions.json?auth=${
                response.data.idToken
              }`
            )
            .then(response => {
              if (response.status === 200) {
                const transactions = response.data;
                this.setState({ transactions: transactions });
                this.setState({ loginModalVisible: false });
                this.setState({ authLogin: authLogin });
              } else {
                alert("Couldn't get transactions data!");
              }
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => alert(err));
  };

  onSubmitHandler = () => {
    const authLogin = { ...this.state.authLogin };
    const authData = {
      email: authLogin.email,
      password: authLogin.password,
      returnSecureToken: true
    };
    axios
      .post(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=",
        authData
      )
      .then(response => {
        if (response.status === 200) {
          const user = { ...this.user };
          const authLogin = { ...this.state.authLogin };
          const transactions = [];

          transactions[0] = TRANSACTION;
          transactions[0].transactionContributors = [];
          transactions[0].transactionContributors[0] = CONTRIBUTOR;

          user.data.transactions = transactions;
          user.userID = response.data.localId;
          authLogin.id = response.data.localId;
          authLogin.token = response.data.idToken;
          authLogin.id = user.userID;

          const tokenExpireDate =
            new Date().getTime() + response.data.expiresIn * 1000;
          localStorage.setItem("token", response.data.idToken);
          localStorage.setItem("tokenExpireDate", tokenExpireDate);
          localStorage.setItem("userID", response.data.localId);

          this.checkAuthTimeout(response.data.expiresIn);
          axios
            .put(
              `/users/${response.data.localId}.json?auth=${
                response.data.idToken
              }`,
              user
            )
            .then(response => {
              if (response.status === 200) {
                this.setState({ loginModalVisible: false });
                this.setState({ authLogin: authLogin });
              } else {
                alert("Couldn't create new user!");
              }
            })
            .catch(err => alert(err));
        }
      })
      .catch(err => alert(err));
  };

  checkAuthTimeout = expiresIn => {
    setTimeout(() => {
      this.onLogout();
    }, expiresIn * 1000);
  };

  onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpireDate");
    localStorage.removeItem("userID");
    window.location.reload();
  };

  onLoginModalOpen = () => {
    this.setState({ loginModalVisible: true });
  };

  onLoginModalClose = () => {
    const dateTime = new Date().getTime();
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("tokenExpireDate") > dateTime
    ) {
      this.setState({ loginModalVisible: false });
    } else {
      return;
    }
  };

  onDrawerOpen = () => {
    this.setState({ drawerVisible: true });
  };

  onDrawerClose = () => {
    this.setState({ drawerVisible: false });
  };

  resetHandler = () => {
    const defaultTransaction = { ...TRANSACTION };
    const defaultContributor = { ...CONTRIBUTOR };
    let transaction = [...this.state.transactions];
    defaultTransaction.transactionContributors = [];
    defaultTransaction.transactionContributors.unshift(defaultContributor);
    transaction.unshift(defaultTransaction);
    transaction = [transaction[0]];

    axios
      .put(
        `/users/${this.state.authLogin.id}/data/transactions.json?auth=${
          this.state.authLogin.token
        }`,
        transaction
      )
      .then(response => {
        if (response.statusText === "OK") {
          this.setState({ transactions: transaction });
        } else {
          alert("Couldn't reset transactions!");
        }
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .put(
        `/users/${this.state.authLogin.id}/data/budget.json?auth=${
          this.state.authLogin.token
        }`,
        0
      )
      .then(response => {
        if (response.statusText === "OK") {
          this.setState({ budget: 0 });
        } else {
          alert("Couldn't reset budget!");
        }
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .put(
        `/users/${this.state.authLogin.id}/data/notReturned.json?auth=${
          this.state.authLogin.token
        }`,
        0
      )
      .then(response => {
        if (response.statusText === "OK") {
          this.setState({ notReturned: 0 });
        } else {
          alert("Couldn't reset pending for return value!");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  onOptionsSwitchChange = (event, index) => {
    let transaction = [...this.state.transactions];
    const newSplitOption = event.target.value;

    transaction[index].splitOption = newSplitOption;
    transaction = this.onContributorValue(index, transaction);
    axios
      .put(
        `/users/${this.state.authLogin.id}/data/transactions.json?auth=${
          this.state.authLogin.token
        }`,
        transaction
      )
      .then(response => {
        if (response.statusText === "OK") {
          this.setState({ transactions: transaction });
        } else {
          alert("Couldn't switch share options!");
        }
      })
      .catch(error => console.log(error));
  };

  sharedAmountManipulation = (index, transaction) => {
    const oldSharedAmount = transaction[index].sharedAmount;

    const arr = transaction[index].transactionContributors.map(contributor => {
      if (contributor.isReturned) {
        return 0;
      } else {
        return contributor.value;
      }
    });
    arr[0] = 0;
    const updatedSharedAmount = arr.reduce((a, b) => a + b);
    transaction[index].sharedAmount = Number(updatedSharedAmount.toFixed(2));

    return [transaction, oldSharedAmount, updatedSharedAmount];
  };

  notReturnedManipulation = (oldSharedAmount, updatedSharedAmount) => {
    const oldNotReturned = this.state.notReturned;

    const newNotReturned = Number(
      (oldNotReturned - oldSharedAmount + updatedSharedAmount).toFixed(2)
    );
    axios
      .put(
        `/users/${this.state.authLogin.id}/data/notReturned.json?auth=${
          this.state.authLogin.token
        }`,
        newNotReturned
      )
      .then(response => {
        if (response.statusText === "OK") {
          this.setState({ notReturned: newNotReturned });
        } else {
          alert("Couldn't update pending for return value!");
        }
      })
      .catch(error => console.log(error));
  };

  onContributorValue = (index, transaction) => {
    const transactionValue = transaction[index].amount;

    if (transaction[index].splitOption === "equal") {
      const divider = transaction[index].transactionContributors.length;

      transaction[index].transactionContributors[0].value = Number(
        (transactionValue / (divider + 1)).toFixed(2)
      );

      for (let i = 1; i < divider; i++) {
        transaction[index].transactionContributors[i].value = Number(
          (transactionValue / divider).toFixed(2)
        );
      }
    }
    if (transaction[index].splitOption === "own") {
      transaction[index].transactionContributors[0].value = "";
    }

    return transaction;
  };

  onReturnedContributor = (index, contributorIndex) => {
    const transaction = [...this.state.transactions];
    const oldSharedAmount = transaction[index].sharedAmount;

    const currentContributor =
      transaction[index].transactionContributors[contributorIndex];
    const oldBudget = this.state.budget;

    currentContributor.isReturned = !currentContributor.isReturned;

    if (currentContributor.isReturned) {
      const updatedSharedAmount = oldSharedAmount - currentContributor.value;
      transaction[index].sharedAmount = Number(updatedSharedAmount.toFixed(2));
      this.notReturnedManipulation(oldSharedAmount, updatedSharedAmount);
      const newBudget = Number(
        (oldBudget + currentContributor.value).toFixed(2)
      );
      axios
        .put(
          `/users/${this.state.authLogin.id}/data/budget.json?auth=${
            this.state.authLogin.token
          }`,
          newBudget
        )
        .then(response => {
          if (response.statusText === "OK") {
            this.setState({ budget: newBudget });
          } else {
            alert("Couldn't update budget!");
          }
        })
        .catch(error => console.log(error));
    }
    axios
      .put(
        `/users/${this.state.authLogin.id}/data/transactions.json?auth=${
          this.state.authLogin.token
        }`,
        transaction
      )
      .then(response => {
        if (response.statusText === "OK") {
          this.setState({ transactions: transaction });
        } else {
          alert("Couldn't return contributor");
        }
      })
      .catch(error => console.log(error));
  };

  onEditContributor = (index, contributorIndex, transaction) => {
    transaction[index].transactionContributors[
      contributorIndex
    ].contributorIsEditable = !transaction[index].transactionContributors[
      contributorIndex
    ].contributorIsEditable;
    return transaction;
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
      const newBudget = Number((budget + prevAmount - newAmount).toFixed(2));
      axios
        .put(
          `/users/${this.state.authLogin.id}/data/budget.json?auth=${
            this.state.authLogin.token
          }`,
          newBudget
        )
        .then(response => {
          if (response.statusText === "OK") {
            this.setState({ budget: newBudget });
          } else {
            alert("Couldn't update budget!");
          }
        })
        .catch(error => console.log(error));
    }
    transaction[index].isEditable = !transaction[index].isEditable;
    axios
      .put(
        `/users/${this.state.authLogin.id}/data/transactions.json?auth=${
          this.state.authLogin.token
        }`,
        transaction
      )
      .then(response => {
        if (response.statusText === "OK") {
          this.setState({ transactions: transaction });
        } else {
          alert("Couldn't update transaction!");
        }
      })
      .catch(error => console.log(error));
  };

  budgetDeduction = index => {
    const transaction = [...this.state.transactions];
    const currentTransaction = transaction[index];
    const currentBudget = this.state.budget;

    const arr = currentTransaction.transactionContributors.map(contributor => {
      if (contributor.isReturned) {
        return contributor.value;
      } else {
        return false;
      }
    });

    const returnedAmount = arr.reduce((a, b) => a + b);
    const newBudget = Number(
      (currentBudget + (currentTransaction.amount - returnedAmount)).toFixed(2)
    );

    axios
      .put(
        `/users/${this.state.authLogin.id}/data/budget.json?auth=${
          this.state.authLogin.token
        }`,
        newBudget
      )
      .then(response => {
        if (response.statusText === "OK") {
          this.setState({ budget: newBudget });
        } else {
          alert("Couldn't update budget!");
        }
      })
      .catch(error => console.log(error));
  };

  budgetAdd = transaction => {
    const currentBudget = this.state.budget;

    const newBudget = currentBudget - transaction[1].amount;
    return newBudget;
  };

  onBudgetChange = event => {
    const currentBudget = Number(this.state.budget);
    const providedBudget = Number(event.target.value);
    const newBudget = Number(currentBudget + providedBudget).toFixed(2);

    axios
      .put(
        `/users/${this.state.authLogin.id}/data/budget.json?auth=${
          this.state.authLogin.token
        }`,
        newBudget
      )
      .then(response => {
        if (response.statusText === "OK") {
          this.setState({ budget: Number(newBudget) });
        } else {
          alert("Couldn't update budget!");
        }
      })
      .catch(error => console.log(error));
  };

  transactionDate = transaction => {
    const today = new Date();
    const month = today.toLocaleString("pl-pl", { month: "long" });
    transaction[1].date =
      today.getDate() + " " + month + " " + today.getFullYear();
    return transaction;
  };

  onToggleSwitch = index => {
    const transaction = [...this.state.transactions];
    const notReturned = this.state.notReturned;

    transaction[index].toggle = !transaction[index].toggle;

    if (transaction[index].toggle === false) {
      const newNotReturned = Number(
        (notReturned - transaction[index].sharedAmount).toFixed(2)
      );
      axios
        .put(
          `/users/${this.state.authLogin.id}/data/notReturned.json?auth=${
            this.state.authLogin.token
          }`,
          newNotReturned
        )
        .then(response => {
          if (response.statusText === "OK") {
            this.setState({
              notReturned: newNotReturned
            });
          } else {
            alert("Couldn't update pending for return value!");
          }
        })
        .catch(error => console.log(error));
    } else {
      const newNotReturned = Number(
        (notReturned + transaction[index].sharedAmount).toFixed(2)
      );
      axios
        .put(
          `/users/${this.state.authLogin.id}/data/notReturned.json?auth=${
            this.state.authLogin.token
          }`,
          newNotReturned
        )
        .then(response => {
          if (response.statusText === "OK") {
            this.setState({
              notReturned: newNotReturned
            });
          } else {
            alert("Couldn't update pending for return value!");
          }
        })
        .catch(error => console.log(error));
    }
    axios
      .put(
        `/users/${this.state.authLogin.id}/data/transactions.json?auth=${
          this.state.authLogin.token
        }`,
        transaction
      )
      .then(response => {
        if (response.statusText === "OK") {
          this.setState({
            transactions: transaction
          });
        } else {
          alert("Couldn't share transaction!");
        }
      })
      .catch(error => console.log(error));
  };

  onAddTransaction = () => {
    const defaultTransaction = { ...TRANSACTION };
    const defaultContributor = { ...CONTRIBUTOR };
    let transaction = [...this.state.transactions];
    defaultTransaction.transactionContributors = [];
    defaultTransaction.transactionContributors.unshift(defaultContributor);
    transaction.unshift(defaultTransaction);

    transaction[1].isEditable = false;
    transaction[1].prevAmount = transaction[1].amount;
    transaction = this.transactionDate(transaction);
    const newBudget = this.budgetAdd(transaction);

    axios
      .put(
        `/users/${this.state.authLogin.id}/data/transactions.json?auth=${
          this.state.authLogin.token
        }`,
        transaction
      )
      .then(response => {
        if (response.statusText === "OK") {
          this.setState({ transactions: transaction });
        } else {
          alert("Couldn't add new transaction!");
        }
      })
      .catch(error => console.log(error));
    axios
      .put(
        `/users/${this.state.authLogin.id}/data/budget.json?auth=${
          this.state.authLogin.token
        }`,
        newBudget
      )
      .then(response => {
        if (response.statusText === "OK") {
          this.setState({ budget: newBudget });
        } else {
          alert("Couldn't update budget!");
        }
      })
      .catch(error => console.log(error));
  };

  onAddContributor = index => {
    const defaultContributor = { ...CONTRIBUTOR };
    let transaction = [...this.state.transactions];

    const arr = transaction[index].transactionContributors.map(contributor => {
      return contributor.value;
    });
    const totalTransactionValue = arr.reduce((a, b) => a + b);

    if (totalTransactionValue > transaction[index].amount) {
      return alert("Contributors values are over transaction amount!");
    } else {
      transaction[index].transactionContributors.unshift(defaultContributor);
      transaction = this.onContributorValue(index, transaction);
      const sharedAmountOutput = this.sharedAmountManipulation(
        index,
        transaction
      );
      transaction = sharedAmountOutput[0];
      const oldSharedAmount = sharedAmountOutput[1];
      const updatedSharedAmount = sharedAmountOutput[2];
      transaction = this.onEditContributor(index, 1, transaction);

      axios
        .put(
          `/users/${this.state.authLogin.id}/data/transactions.json?auth=${
            this.state.authLogin.token
          }`,
          transaction
        )
        .then(response => {
          if (response.statusText === "OK") {
            this.setState({ transactions: transaction });
            this.notReturnedManipulation(oldSharedAmount, updatedSharedAmount);
          } else {
            alert("Couldn't add contributor!");
          }
        })
        .catch(error => console.log(error));
    }
  };

  onDeleteContributor = (index, contributorIndex) => {
    let transaction = [...this.state.transactions];

    if (transaction[index].transactionContributors.length <= 1) {
      return;
    }

    transaction[index].transactionContributors.splice(contributorIndex, 1);
    transaction = this.onContributorValue(index, transaction);
    const sharedAmountOutput = this.sharedAmountManipulation(
      index,
      transaction
    );
    transaction = sharedAmountOutput[0];
    const oldSharedAmount = sharedAmountOutput[1];
    const updatedSharedAmount = sharedAmountOutput[2];
    axios
      .put(
        `/users/${this.state.authLogin.id}/data/transactions.json?auth=${
          this.state.authLogin.token
        }`,
        transaction
      )
      .then(response => {
        if (response.statusText === "OK") {
          this.notReturnedManipulation(oldSharedAmount, updatedSharedAmount);
          this.setState({ transactions: transaction });
        } else {
          alert("Couldn't delete contributor!");
        }
      })
      .catch(error => console.log(error));
  };

  onDeleteTransaction = index => {
    const transaction = [...this.state.transactions];
    const sharedAmount = transaction[index].sharedAmount;
    const notReturned = this.state.notReturned;
    const isToggled = transaction[index].toggle;

    if (transaction.length <= 1) {
      return;
    }

    transaction.splice(index, 1);
    axios
      .put(
        `/users/${this.state.authLogin.id}/data/transactions.json?auth=${
          this.state.authLogin.token
        }`,
        transaction
      )
      .then(response => {
        if (response.statusText === "OK") {
          this.budgetDeduction(index);
          if (isToggled) {
            const newNotReturned = Number(
              (notReturned - sharedAmount).toFixed(2)
            );
            axios
              .put(
                `/users/${this.state.authLogin.id}/data/notReturned.json?auth=${
                  this.state.authLogin.token
                }`,
                newNotReturned
              )
              .then(response => {
                if (response.statusText === "OK") {
                  this.setState({
                    notReturned: newNotReturned
                  });
                } else {
                  alert("Couldn't update pending for return value!");
                }
              })
              .catch(error => console.log(error));
          }

          this.setState({ transactions: transaction });
        } else {
          alert("Couldn't delete transaction!");
        }
      })
      .catch(error => console.log(error));
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
    let transaction = [...this.state.transactions];
    const currentTransaction = transaction[index];

    const newAmount = Number(event.target.value);
    const prevAmount = currentTransaction.amount;

    if (prevAmount !== newAmount) {
      currentTransaction.amount = newAmount;
      transaction = this.onContributorValue(index, transaction);
      this.setState({
        transactions: transaction
      });
    }
  };

  render() {
    let appContent = <Spinner />;

    if (this.state.dataLoaded) {
      let addButtonState = false;
      if (
        String(this.state.transactions[0].amount).length < 1 ||
        this.state.transactions[0].amount === 0
      ) {
        addButtonState = true;
      }
      appContent = (
        <Layout
          addTransaction={this.onAddTransaction}
          budgetChange={this.onBudgetChange}
          budget={this.state.budget}
          notReturned={this.state.notReturned}
          addButtonState={addButtonState}
          onDrawerOpen={this.onDrawerOpen}
          onDrawerClose={this.onDrawerClose}
          drawerVisible={this.state.drawerVisible}
          resetHandler={this.resetHandler}
          loginModalVisible={this.state.loginModalVisible}
          onLoginModalOpen={this.onLoginModalOpen}
          onLoginModalClose={this.onLoginModalClose}
          onPasswordHandler={this.onPasswordHandler}
          onEmailHandler={this.onEmailHandler}
          onSubmitHandler={this.onSubmitHandler}
          onSignInHandler={this.onSignInHandler}
          onLogout={this.onLogout}
          authLogin={this.state.authLogin}
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
            onOptionsSwitchChange={this.onOptionsSwitchChange}
          />
        </Layout>
      );
    }

    return <React.Fragment>{appContent}</React.Fragment>;
  }
}

export default App;
