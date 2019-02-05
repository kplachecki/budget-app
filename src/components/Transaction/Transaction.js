import React, { Component } from 'react';
import classes from './Transaction.module.css';
import Toggle from './Toggle/Toggle';
import PropTypes from 'prop-types';

class Transaction extends Component {
    render() {
        return(
            <div className={classes.Transaction}>
                <div className={classes.Input}>
                    <input value={this.props.amout} className={classes.InputLeft} />
                    <input value={this.props.description} className={classes.InputRight}/>
                </div>
                <Toggle />       
            </div>
        ) 
    } 
};

Transaction.PropTypes = {
    amout: PropTypes.currency,
    description: PropTypes.string
}

export default Transaction;