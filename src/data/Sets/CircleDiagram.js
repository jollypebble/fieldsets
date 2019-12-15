/**
 * This is our diagram set structure.
 * For top level sets, assign parent to container id it belongs to.
 */
const CircleDiagram = [
  {
    id: 'monthly_contribution',
    name: 'Monthly Contribution',
    parent: 'econcircle-app'
  },
  {
    id: 'lump_sums',
    name: 'Lump Sums',
    parent: 'econcircle-app'
  },
  {
    id: 'net_worth',
    name: 'Net Worth',
    parent: 'econcircle-app'
  },
  {
    id: 'defense_allocation',
    name: 'Defense Allocation',
    parent: 'econcircle-app',
    children: [
      {
        id: 'will',
        name: 'Will',
        parent: 'defense_allocation',
      },
      {
        id: 'disability_insurance',
        name: 'Disabilty Insurance',
        parent: 'defense_allocation',
      },
      {
        id: 'long_term_care',
        name: 'Long Term Care',
        parent: 'defense_allocation',
      },
      {
        id: 'term_insurance',
        name: 'Term Insurance',
        parent: 'defense_allocation',
      }
    ]
  },
  {
    id: 'offense_allocation',
    name: 'Offense Allocation',
    parent: 'econcircle-app',
    children: [
      {
        id: 'short_term_money',
        name: 'Short Term Money',
        parent: 'offense_allocation',
        children: [
          {
            id: 'cash_equivalents',
            name: 'Cash Equivalents',
            parent: 'short_term_money',
          },
          {
            id: 'mortgage',
            name: 'Mortgage',
            parent: 'short_term_money',
          },
          {
            id: 'liabilities_debt',
            name: 'Liabilities / Debt',
            parent: 'short_term_money',
          },
        ]
      },
      {
        id: 'mid_term_money',
        name: 'Mid Term Money',
        parent: 'offense_allocation',
        children: [
          {
            id: 'utmas',
            name: 'UTMA\'s',
            parent: 'mid_term_money',
          },
          {
            id: 'plan_529',
            name: '529 Plan',
            parent: 'mid_term_money',
          },
          {
            id: 'investment_account',
            name: 'Invest Account',
            parent: 'mid_term_money',
          },
        ]
      },
      {
        id: 'long_term_money',
        name: 'Long Term Money',
        parent: 'offense_allocation',
        children: [
          {
            id: 'cash_value_life',
            name: 'Cash Value Life',
            parent: 'long_term_money',
          },
          {
            id: 'ira_roth',
            name: 'IRA ROTH',
            parent: 'long_term_money',
          },
          {
            id: 'k_401',
            name: '401 K',
            parent: 'long_term_money',
          },
          {
            id: 'annuity',
            name: 'Annuity',
            parent: 'long_term_money',
          },
          {
            id: 'stock_option',
            name: 'Stock Option',
            parent: 'long_term_money',
          },
          {
            id: 'investment_real_estate',
            name: 'Real Estate',
            parent: 'long_term_money',
          },
          {
            id: 'deffered_comp',
            name: 'Deffered Comp',
            parent: 'long_term_money',
          }
        ]
      }
    ]
  }
];
export default CircleDiagram;
