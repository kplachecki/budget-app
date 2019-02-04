import React, { Component } from 'react';
import classes from './Transaction.module.css';
import Aux from '../../hoc/_Aux';

class Transaction extends Component {
    render() {
        return(
            <div className={classes.TransactionWindow}>
                <input type='number' style={ {width: '20%', float: 'left' } }/>
                <input type='list' style={ {width: '40%', float: 'right' } }/>
                <p>Test</p>
            </div>
        ) 
    } 
};

export default Transaction;