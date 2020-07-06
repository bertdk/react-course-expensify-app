import moment from 'moment'

export default [{
  id: '1',
  description: 'Gum',
  note: '',
  amount: 1,
  createdAt: 0
}, {
  id: '2',
  description: 'Rent',
  note: '',
  amount: 9,
  createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
  id: '3',
  description: 'Credit Card',
  note: '',
  amount: 6,
  createdAt: moment(0).add(4, 'days').valueOf()
}]