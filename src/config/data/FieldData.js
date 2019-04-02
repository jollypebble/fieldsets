// Callbacks are set when the value is being handled by our react app.
// At some point we will move the hacky excel functions to react callbacks and push this json data to an official data store/relational db
export default [
  {
    id: 'net_worth',
    name: 'Net Worth',
    description: '',
    value: '38742994',
    type: 'currency',
    callback: '',
    notes:[],
    owners:[],
    parent: 'net_worth',
    order: 0,
    alwaysDisplay: true,
  },
  {
    id: 'monthly_contribution',
    name: 'Monthly Contribution',
    description: '',
    value: '280000',
    type: 'currency',
    callback: '',
    notes:[],
    owners:[],
    parent: '',
    order: 0,
    alwaysDisplay: true,
  },
  {
    id: 'lump_sums',
    name: 'Lump Sums',
    description: '',
    value: '280000',
    type: 'currency',
    callback: '',
    notes:[],
    owners:[],
    parent: '',
    order: 0,
    alwaysDisplay: true,
  },
  {
    id: 'defense_allocation_monthly_total',
    name: 'Monthly Total',
    description: '',
    value: '1604',
    type: 'currency',
    callback: '',
    notes:[],
    owners:[],
    parent: 'defense_allocation',
    order: 0,
    alwaysDisplay: true,
  },
  {
    id: 'will_status',
    name: 'Status',
    description: '',
    value: 'none',
    type: 'status',
    callback: false,
    notes:[],
    owners:[],
    parent: 'will',
    order: 0,
    alwaysDisplay: true,
  },
  {
    id: 'disability_insurance_monthly_benefit',
    name: 'Monthly Benefit',
    description: '',
    value: '19026',
    type: 'currency', // TODO: Define currency sub types [credit vs debt, loss etc.], for now I am assuming having type defs will be useful as we prototype data structures. A type will correspond with a react field component.
    callback: false,
    notes:['is $12500 UNUM still there?'],
    owners:[],
    parent: 'disability_insurance',
    order: 0,
    alwaysDisplay: true,
  },
  {
    id: 'disability_insurance_premium',
    name: 'Premium',
    description: '',
    value: ['disability_insurance_premium_owner_1','disability_insurance_premium_owner_1'],
    type: 'field',
    callback: 'sum',
    notes:[],
    owners:[],
    parent: 'disability_insurance',
    order: 1,
    alwaysDisplay: true,
  },
  {
    id: 'disability_insurance_premium_owner_1',
    name: 'Premium',
    description: '',
    value: '550',
    type: 'currency',
    callback: false,
    notes:[],
    owners:['owner_1'],
    parent: 'disability_insurance',
    order: 2,
    alwaysDisplay: false,
  },
  {
    id: 'disability_insurance_premium_owner_2',
    name: 'Premium',
    description: '',
    value: '0',
    type: 'currency',
    callback: false,
    notes:[],
    owners:['owner_2'],
    parent: 'disability_insurance',
    order: 3,
    alwaysDisplay: false,
  },
  {
    id: 'long_term_care_daily_benefit',
    name: 'Daily Benefit',
    description: '',
    value: '294',
    type: 'currency',
    callback: false,
    notes:[],
    owners:[],
    parent: 'long_term_care',
    order: 0,
    alwaysDisplay: true,
  },
  {
    id: 'long_term_care_premium',
    name: 'Premium',
    description: '',
    value: ['long_term_care_premium_owner_1','long_term_care_premium_owner_2'],
    type: 'field',
    callback: 'sum',
    notes:[],
    owners:[],
    parent: 'long_term_care',
    order: 1,
    alwaysDisplay: true,
  },
  {
    id: 'long_term_care_premium_owner_1',
    name: 'Premium',
    description: '',
    value: '250',
    type: 'currency',
    callback: false,
    notes:[],
    owners:['owner_1'],
    parent: 'long_term_care',
    order: 2,
    alwaysDisplay: false,
  },
  {
    id: 'long_term_care_premium_owner_2',
    name: 'Premium',
    description: '',
    value: '250',
    type: 'currency',
    callback: false,
    notes:[],
    owners:['owner_2'],
    parent: 'long_term_care',
    order: 3,
    alwaysDisplay: false,
  },
  /**
   * Q For Aaron:
   * Inconsistencies between Summation of Term life vs LTC, Disbility Insurance. Do we want to sum 2 values or just take a single value?.
   * Currently can take a single value but workflow would need to change to incorporate sheets O7:P8 location
   */
  {
    id: 'term_insurance_benefit',
    name: 'Benefit',
    description: '',
    value: '2000000',
    type: 'currency',
    callback: false,
    notes:[],
    owners:[],
    parent: 'term_insurance',
    order: 0,
    alwaysDisplay: true,
  },
  {
    id: 'term_insurance_premium',
    name: 'Premium',
    description: '',
    value: ['term_insurance_premium_owner_1','term_insurance_premium_owner_2'],
    type: 'field',
    callback: 'sum',
    notes:[],
    owners:[],
    parent: 'term_insurance',
    order: 1,
    alwaysDisplay: true,
  },
  {
    id: 'term_insurance_premium_owner_1',
    name: 'Premium',
    description: '',
    value: '391',
    type: 'currency',
    callback: false,
    notes:[],
    owners:['owner_1'],
    parent: 'term_insurance',
    order: 2,
    alwaysDisplay: false,
  },
  {
    id: 'term_insurance_premium_owner_2',
    name: 'Premium',
    description: '',
    value: '163',
    type: 'currency',
    callback: false,
    notes:[],
    owners:['owner_2'],
    parent: 'term_insurance',
    order: 3,
    alwaysDisplay: false,
  },
  // TODO: offense_allocation

  // TODO: people



  // TO Monthly Contribution, Lum Sum & Net Worth.
];
