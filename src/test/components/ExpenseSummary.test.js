import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';

test('Viewing 1 expenses', () => {
  const wrapper = shallow(<ExpenseSummary count={1} total={333333} />);
  expect(wrapper).toMatchSnapshot();
});

test('Viewing 2 expenses', () => {
  const wrapper = shallow(<ExpenseSummary count={4} total={777777} />);
  expect(wrapper).toMatchSnapshot();
});