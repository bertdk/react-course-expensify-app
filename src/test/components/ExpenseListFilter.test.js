import React from 'react';
import moment from 'moment';
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilter";
import { filters, altFilters } from "../fixtures/filters";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setEndDate={setEndDate}
      setStartDate={setStartDate}
    />
  )
});

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
  wrapper.find('input').simulate('change', {
    target: {
      value: altFilters.text
    }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(altFilters.text);
});

test('should sort by date', () => {
  const value = 'date';
  wrapper.setProps({
    filters: altFilters
  });
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
  const value = 'amount';
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () => {
  const startDate = moment(0);
  const endDate = moment(0).add(2,'days');
  wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
  expect(setStartDate).toHaveBeenCalled();
  expect(setEndDate).toHaveBeenCalled();
});

test('should handle date changes', () => {
  const value = 'endDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(value);
  expect(wrapper.state('calenderFocused')).toBe(value);
});