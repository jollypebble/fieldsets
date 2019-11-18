import { callCache } from 'lib/fieldsets/DataCache/reducers/datacache';

// Callbacks are set when the value is being handled by our react app.
// At some point we will move the hacky excel functions to react callbacks and push this json data to an official data store/relational db
export default [
  {
    id: 'net_worth_total',
    name: 'Total',
    value: 0,
    type: 'currency',
    callback: 'sum',
    fieldsets: ['net_worth'],
    children: ['defense_allocation_monthly_total', 'offense_allocation_monthly_total']
  },
  {
    id: 'monthly_contribution_total',
    name: 'Total',
    value: 0,
    type: 'currency',
    fieldsets: ['monthly_contribution']
  },
  {
    id: 'lump_sums_total',
    name: 'Total',
    value: 0,
    type: 'currency',
    fieldsets: ['lump_sums']
  },
  {
    id: 'defense_allocation_monthly_total',
    name: 'Monthly Total',
    value: 0,
    type: 'currency',
    fieldsets: ['defense_allocation']
  },
  {
    id: 'will_status',
    name: 'Status',
    value: 'None',
    options:[ 'None', 'Complete', 'Incomplete', 'Needs Update' ],
    type: 'select',
    fieldsets: ['will']
  },
  {
    id: 'disability_insurance_monthly_benefit',
    name: 'Monthly Benefit',
    value: 0,
    type: 'currency',
    fieldsets: ['disability_insurance']
  },
  {
    id: 'disability_insurance_premium',
    name: 'Premium',
    value: 0,
    type: 'formula',
    callback: 'sum',
    fieldsets: ['disability_insurance'],
    order: 1
  },
  {
    id: 'long_term_care_daily_benefit',
    name: 'Daily Benefit',
    value: 0,
    type: 'currency',
    fieldsets: ['long_term_care']
  },
  {
    id: 'long_term_care_premium',
    name: 'Premium',
    value: 0,
    type: 'currency',
    callback: 'sum',
    fieldsets: ['long_term_care']
  },
  /**
   * Q For Aaron:
   * Inconsistencies between Summation of Term life vs LTC, Disbility Insurance. Do we want to sum 2 values or just take a single value?.
   * Currently can take a single value but workflow would need to change to incorporate sheets O7:P8 location
   */
  {
    id: 'term_insurance_benefit',
    name: 'Benefit',
    value: 0,
    type: 'currency',
    fieldsets: ['term_insurance']
  },
  {
    id: 'term_insurance_premium',
    name: 'Premium',
    description: '',
    value: 0,
    type: 'currency',
    callback: 'sum',
    fieldsets: ['term_insurance'],
    order: 1
  },
  // Offense
  {
    id: 'offense_allocation_monthly_total',
    name: 'Monthly Total',
    value: 0,
    type: 'currency',
    fieldsets: ['offense_allocation']
  },
  // Short Term Money
  {
    id: 'cash_equivalents_value',
    name: 'Value',
    value: 0,
    type: 'currency',
    fieldsets: ['cash_equivalents']
  },
  {
    id: 'cash_equivalents_monthly_goal',
    name: 'Monthly Goal',
    value: 0,
    type: 'currency',
    fieldsets: ['cash_equivalents'],
    order: 1
  },
  {
    id: 'cash_equivalents_goal',
    name: 'Goal',
    value: 0,
    type: 'currency',
    fieldsets: ['cash_equivalents'],
    order: 2
  },
  {
    id: 'cash_equivalents_lump',
    name: 'LUMP',
    value: 0,
    type: 'currency',
    fieldsets: ['cash_equivalents'],
    order: 3
  },
  {
    id: 'cash_equivalents_total',
    name: 'Total',
    value: [],
    type: 'function',
    callback: 'sum',
    fieldsets: ['cash_equivalents'],
    order: 4
  },
  {
    id: 'mortgage_value',
    name: 'Amount',
    value: 0,
    type: 'currency',
    fieldsets: ['mortgage']
  },
  {
    id: 'mortgage_monthly_goal',
    name: 'Monthly Goal',
    value: 0,
    type: 'currency',
    fieldsets: ['mortgage'],
    order: 1
  },
  {
    id: 'mortgage_lump',
    name: 'LUMP',
    value: 0,
    type: 'currency',
    fieldsets: ['mortgage'],
    order: 2
  },
  {
    id: 'mortgage_total',
    name: 'Total',
    value: 0,
    type: 'currency',
    fieldsets: ['mortgage'],
    order: 3
  },
  {
    id: 'liabilities_debt_value',
    name: 'Amount',
    value: 0,
    type: 'currency',
    fieldsets: ['liabilities_debt']
  },
  {
    id: 'liabilities_debt_monthly_goal',
    name: 'Monthly Goal',
    value: 0,
    type: 'currency',
    fieldsets: ['liabilities_debt'],
    order: 1
  },
  {
    id: 'liabilities_debt_lump',
    name: 'LUMP',
    value: 0,
    type: 'currency',
    fieldsets: ['liabilities_debt'],
    order: 2
  },
  {
    id: 'liabilities_debt_total',
    name: 'Total',
    value: 0,
    type: 'currency',
    fieldsets: ['liabilities_debt'],
    order: 3
  },
  // Mid Term Money
  {
    id: 'utmas_value',
    name: 'Value',
    value: 0,
    type: 'currency',
    fieldsets: ['utmas']
  },
  {
    id: 'utmas_individal_value',
    name: 'Individual Value',
    value: [],
    callback: 'sum',
    type: 'array',
    fieldsets: ['utmas'],
    order: 1
  },
  {
    id: 'utmas_lump',
    name: 'LUMP',
    value: 0,
    type: 'currency',
    fieldsets: ['utmas'],
    order: 2
  },
  {
    id: 'utmas_total',
    name: 'Total',
    value: 0,
    type: 'currency',
    fieldsets: ['utmas'],
    order: 3
  },
  {
    id: 'plan_529_value',
    name: 'Value',
    value: 0,
    type: 'currency',
    fieldsets: ['plan_529']
  },
  {
    id: 'plan_529_individal_value',
    name: 'Individual Value',
    value: [],
    type: 'array',
    fieldsets: ['plan_529'],
    order: 1
  },
  {
    id: 'plan_529_lump',
    name: 'LUMP',
    value: 0,
    type: 'currency',
    fieldsets: ['plan_529'],
    order: 2
  },
  {
    id: 'plan_529_total',
    name: 'Total',
    value: 0,
    type: 'currency',
    fieldsets: ['plan_529'],
    order: 3
  },
  {
    id: 'investment_account_value',
    name: 'Value',
    value: 0,
    type: 'currency',
    fieldsets: ['investment_account'],
    children: ['investment_account_individal_value']
  },
  {
    id: 'investment_account_individal_value',
    name: 'Individual Value',
    value: [],
    type: 'currency',
    fieldsets: ['investment_account'],
    order: 1,
    parent: 'investment_account_value',
  },
  {
    id: 'investment_account_lump',
    name: 'LUMP',
    value: 0,
    type: 'currency',
    fieldsets: ['investment_account'],
    order: 2
  },
  {
    id: 'investment_account_total',
    name: 'Total',
    value: 0,
    type: 'currency',
    fieldsets: ['investment_account'],
    order: 3,
    children: ['investment_account_value', 'investment_account_lump']
  },
  // Long Term Money
  {
    id: 'cash_value_life_value',
    name: 'Value',
    value: 0,
    type: 'currency',
    fieldsets: ['cash_value_life']
  },
  {
    id: 'cash_value_life_individal_value',
    name: 'Life Individual',
    value: [],
    type: 'currency',
    fieldsets: ['cash_value_life'],
    order: 1
  },
  {
    id: 'whole_life_individal_value',
    name: 'Whole Life',
    value: [],
    type: 'currency',
    fieldsets: ['cash_value_life'],
    order: 2
  },
  {
    id: 'ira_roth_value',
    name: 'IRAs',
    value: 0,
    type: 'currency',
    fieldsets: ['ira_roth']
  },
  {
    id: 'ira_roth_individal_value',
    name: 'Roth(s)',
    value: [],
    type: 'currency',
    fieldsets: ['ira_roth'],
    order: 1
  },
  {
    id: 'ira_roth_lump',
    name: 'LUMP',
    value: 0,
    type: 'currency',
    fieldsets: ['ira_roth'],
    order: 2
  },
  {
    id: 'ira_roth_total',
    name: 'Total',
    value: 0,
    type: 'currency',
    fieldsets: ['ira_roth'],
    order: 3
  },
  {
    id: 'k_401_value',
    name: 'Value',
    value: 0,
    type: 'currency',
    fieldsets: ['k_401']
  },
  {
    id: 'k_401_individal_value',
    name: 'Individual Value',
    value: [],
    type: 'currency',
    fieldsets: ['k_401'],
    order: 1,
    alwaysDisplay: false
  },
  {
    id: 'k_401_total',
    name: 'Total',
    value: 0,
    type: 'currency',
    fieldsets: ['k_401'],
    order: 2
  },
  {
    id: 'annuity_value',
    name: 'Value',
    value: 0,
    type: 'currency',
    fieldsets: ['annuity']
  },
  {
    id: 'annuity_monthly_goal',
    name: 'Monthly Goal',
    value: 0,
    type: 'currency',
    fieldsets: ['annuity'],
    order: 1
  },
  {
    id: 'annuity_goal',
    name: 'Goal',
    value: 0,
    type: 'currency',
    fieldsets: ['annuity'],
    order: 2
  },
  {
    id: 'annuity_lump',
    name: 'LUMP',
    value: 0,
    type: 'currency',
    fieldsets: ['annuity'],
    order: 3
  },
  {
    id: 'annuity_total',
    name: 'Total',
    value: [],
    type: 'currency',
    callback: 'sum',
    fieldsets: ['annuity'],
    order: 4
  },
  {
    id: 'stock_option_value',
    name: 'Value',
    value: 0,
    type: 'currency',
    fieldsets: ['stock_option']
  },
  {
    id: 'investment_real_estate_value',
    name: 'Value',
    value: 0,
    type: 'currency',
    fieldsets: ['investment_real_estate']
  },
  {
    id: 'deffered_comp_value',
    name: 'Value',
    value: 0,
    type: 'currency',
    fieldsets: ['deffered_comp']
  },
];
