import React, { Component } from 'react';
import TransactionsScreen from './containers/TransactionsScreen/TransactionsScreen';
import Aux from './hoc/_Aux';
import Layout from './components/Layout/Layout';

class App extends Component {
  render() {
    return (
      <Aux>
        <Layout>
          <TransactionsScreen />
        </Layout>
      </Aux>
    );
  }
}

export default App;
