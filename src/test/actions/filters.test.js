import { setEndDate, setStartDate, setTextFilter, sortByAmount, sortByDate } from "../../actions/filters";
import moment from "moment";

test('should generate set start', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    date: moment(0)
  })
});

test('should generate set end', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    date: moment(0)
  })
});


test('should generate set text default', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ""
  })
});

test('should generate set text', () => {
  const text = "test case";
  const action = setTextFilter(text);
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text
  })
});

test('should generate set sort date', () => {
  expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' })
});

test('should generate set sort amount', () => {
  expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' })
});