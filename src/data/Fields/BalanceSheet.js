const CashInvestments = [
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
  },
  {
    id: 'cash_equivalents_goal',
    name: 'Goal',
    value: 0,
    type: 'currency',
    fieldsets: ['cash_equivalents'],
  },
  {
    id: 'cash_equivalents_lump',
    name: 'LUMP',
    value: 0,
    type: 'currency',
    fieldsets: ['cash_equivalents'],
  },
  {
    id: 'cash_equivalents_total',
    name: 'Total',
    value: [],
    type: 'function',
    callback: 'sum',
    fieldsets: ['cash_equivalents'],
  }
];

const ExternalAccounts = [
  {
    id: 'external_investment_account_value',
    name: 'Value',
    value: 0,
    type: 'currency',
    fieldsets: ['investment_account'],
    children: ['external_investment_account_individal_value']
  },
  {
    id: 'external_investment_account_individal_value',
    name: 'Individual Value',
    value: [],
    type: 'currency',
    fieldsets: ['investment_account'],
    parent: 'external_investment_account_value',
  },
  {
    id: 'external_investment_account_lump',
    name: 'LUMP',
    value: 0,
    type: 'currency',
    fieldsets: ['investment_account'],
  },
  {
    id: 'external_investment_account_total',
    name: 'Total',
    value: 0,
    type: 'currency',
    fieldsets: ['investment_account'],
    children: ['external_investment_account_value', 'external_investment_account_lump']
  }
];

const InternalAccounts = [
  {
    id: 'internal_investment_account_value',
    name: 'Value',
    value: 0,
    type: 'currency',
    fieldsets: ['investment_account'],
    children: ['internal_investment_account_individal_value']
  },
  {
    id: 'internal_investment_account_individal_value',
    name: 'Individual Value',
    value: [],
    type: 'currency',
    fieldsets: ['investment_account'],
    parent: 'internal_investment_account_value',
  },
  {
    id: 'internal_investment_account_lump',
    name: 'LUMP',
    value: 0,
    type: 'currency',
    fieldsets: ['investment_account'],
  },
  {
    id: 'internal_investment_account_total',
    name: 'Total',
    value: 0,
    type: 'currency',
    fieldsets: ['investment_account'],
    children: ['internal_investment_account_value', 'internal_investment_account_lump']
  }
];

const OtherInvestments = [
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
  }
];

const Iras = [
  {
    id: 'ira_total_value',
    name: 'IRAs',
    value: 0,
    type: 'function',
    callback: 'sum',
    fieldsets: ['qualified_totals'],
    children: ['ira_individal_value'],
  },
  {
    id: 'ira_individal_value',
    name: 'Individual Value',
    value: [],
    type: 'array',
    fieldsets: ['qualified_individual'],
  }
];

const Roths = [
  {
    id: 'roth_total_value',
    name: 'Roth(s)',
    value: 0,
    type: 'function',
    callback: 'sum',
    fieldsets: ['qualified_totals'],
    children: ['roth_individal_value'],
  },
  {
    id: 'roth_individal_value',
    name: 'Individual Value',
    value: [],
    type: 'array',
    fieldsets: ['qualified_individual'],
  }
];

const Plan529 = [
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
  },
  {
    id: 'plan_529_lump',
    name: 'LUMP',
    value: 0,
    type: 'currency',
    fieldsets: ['plan_529'],
  },
  {
    id: 'plan_529_total',
    name: 'Total',
    value: 0,
    type: 'currency',
    fieldsets: ['plan_529'],
  }
];

const K401 = [
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
  },
  {
    id: 'k_401_total',
    name: 'Total',
    value: 0,
    type: 'currency',
    fieldsets: ['k_401'],
  }
];

const Utmas = [
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
  },
  {
    id: 'utmas_lump',
    name: 'LUMP',
    value: 0,
    type: 'currency',
    fieldsets: ['utmas'],
  },
  {
    id: 'utmas_total',
    name: 'Total',
    value: 0,
    type: 'currency',
    fieldsets: ['utmas'],
  }
];

const Annuities = [
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
  },
  {
    id: 'annuity_goal',
    name: 'Goal',
    value: 0,
    type: 'currency',
    fieldsets: ['annuity'],
  },
  {
    id: 'annuity_lump',
    name: 'LUMP',
    value: 0,
    type: 'currency',
    fieldsets: ['annuity'],
  },
  {
    id: 'annuity_total',
    name: 'Total',
    value: [],
    type: 'currency',
    callback: 'sum',
    fieldsets: ['annuity'],
  }
];

const CashValueLife = [
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
  },
  {
    id: 'whole_life_individal_value',
    name: 'Whole Life',
    value: [],
    type: 'currency',
    fieldsets: ['cash_value_life'],
  }
];

const Properties = [
  {
    id: 'properties_total',
    name: 'Total Properties Value',
    value: 0,
    type: 'function',
    callback: 'sum',
    children: ['properties_individual_value'],
    fieldsets: ['properties']
  },
  {
    id: 'properties_individual_value',
    name: 'Property Value',
    value: [],
    type: 'array',
    parent: ['properties_total'],
    fieldsets: ['properties']
  },
];

const MortgageLiabilities = [
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
  },
  {
    id: 'mortgage_lump',
    name: 'LUMP',
    value: 0,
    type: 'currency',
    fieldsets: ['mortgage'],
  },
  {
    id: 'mortgage_total',
    name: 'Total',
    value: 0,
    type: 'currency',
    fieldsets: ['mortgage'],
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
  },
  {
    id: 'liabilities_debt_lump',
    name: 'LUMP',
    value: 0,
    type: 'currency',
    fieldsets: ['liabilities_debt'],
  },
  {
    id: 'liabilities_debt_total',
    name: 'Total',
    value: 0,
    type: 'currency',
    fieldsets: ['liabilities_debt'],
  }
];

const NonQualified = [
  ...CashInvestments,
  ...ExternalAccounts,
  ...InternalAccounts,
  ...OtherInvestments,
  {
    id: 'investment_account_value',
    name: 'Monthly contribution',
    value: 0,
    type: 'currency',
    fieldsets: ['investment_account'],
  },
  {
    id: 'investment_account_lump',
    name: 'LUMP',
    value: 0,
    type: 'currency',
    fieldsets: ['investment_account'],
  },
  {
    id: 'investment_account_total',
    name: 'Total',
    value: 0,
    type: 'function',
    callback: 'sum',
    fieldsets: ['investment_account'],
    children: ['external_investment_account_total', 'internal_investment_account_total']
  }
];

const Qualified = [
  ...Iras,
  ...Roths,
  ...Plan529,
  ...K401,
  {
    id: 'ira_roth_value',
    name: 'Monthly Contribution',
    value: 0,
    type: 'function',
    callback: 'sum',
    fieldsets: ['qualified_totals', 'ira_roth'],
    children: ['ira_total_value', 'roth_total_value'],
  },
  {
    id: 'ira_roth_total_value',
    name: 'Total',
    value: 0,
    type: 'function',
    callback: 'sum',
    fieldsets: ['qualified_totals', 'ira_roth'],
    children: ['ira_total_value', 'roth_total_value'],
  },
  {
    id: 'ira_roth_individal_value',
    name: 'Roth(s)',
    value: [],
    type: 'currency',
    fieldsets: ['ira_roth'],
  },
  {
    id: 'ira_roth_lump',
    name: 'LUMP',
    value: 0,
    type: 'currency',
    fieldsets: ['ira_roth'],
  }
];

const BalanceSheet = [
  ...NonQualified,
  ...Qualified,
  ...Utmas,
  ...Annuities,
  ...Properties,
  ...CashValueLife,
  ...MortgageLiabilities,
  {
    id: 'net_worth_total',
    name: 'Total',
    value: 0,
    type: 'function',
    callback: 'diff',
    fieldsets: ['net_worth', 'balance_sheet'],
    children: ['assets_total', 'liabilities_total']
  },
  {
    id: 'assets_total',
    name: 'Total Assets',
    value: 0,
    type: 'function',
    callback: 'sum',
    fieldsets: ['balance_sheet', 'offense_allocation'],
    children: ['non_qualified_total', 'qualified_total', 'utmas_total', 'annuities_total', 'cashvaluelife_total', 'properties_total']
  },
  {
    id: 'liabilities_total',
    name: 'Total Liabilities',
    value: 0,
    type: 'function',
    callback: 'sum',
    fieldsets: ['balance_sheet', 'defense_allocation'],
    children: ['mortgage_total', 'liabilitiy_indivial_values']
  }
];

export default BalanceSheet;
