import React, { Component } from 'react';
import Transaction from './containers/Transaction/Transaction';
import Aux from './hoc/_Aux';
import Layout from './components/Layout/Layout';

class App extends Component {
  render() {
    return (
      <Aux>
        <Layout>
          <Transaction />
        </Layout>
      </Aux>
    );
  }
}

export default App;
