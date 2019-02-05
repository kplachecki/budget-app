import React, { Component } from 'react';
import Aux from '../../hoc/_Aux';
import Transaction from '../../components/Transaction/Transaction';


class TransactionsScreen extends Component {
    render() {
        return (
            <Aux>
                <Transaction />
                <button>Add</button>
            </Aux>
        
        )

    }
}

export default TransactionsScreen;