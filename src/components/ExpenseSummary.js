import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral'
import selectExpenses from '../selectors/expenses';
import getTotal from '../selectors/expenses-total';

export const ExpenseSummary = ({count, total}) => (
  <div>
    <p>Total is {numeral(total / 100).format('$0,0.00')} for {count} expenses</p>
  </div>
);

const mapStateToProps = (state) => {
  return {
    count: selectExpenses(state.expenses, state.filter).length,
    total: getTotal(selectExpenses(state.expenses, state.filter))
  }
};

export default connect((state) => mapStateToProps)(ExpenseSummary);