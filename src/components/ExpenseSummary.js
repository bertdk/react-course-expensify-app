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
  const visibleExpenses = selectExpenses(state.expenses, state.filter);
  return {
    count: visibleExpenses.length,
    total: getTotal(visibleExpenses)
  }
};

export default connect((state) => mapStateToProps)(ExpenseSummary);