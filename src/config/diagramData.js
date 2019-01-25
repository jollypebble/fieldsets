export default [
  {
    name: 'Defense Allocation',
    id: 'defense_allocation',
    parentID: '',
    fields: [],
    centerX: 30.5,
    centerY: 38.5,
    children: [
      {
        name: 'Will',
        id: 'will',
        parentID: 'defense_allocation',
        fields: [],
        centerX: 25,
        centerY: 38,
        children: []
      },
      {
        name: 'Disabilty Insurance',
        id: 'disability_insurance',
        parentID: 'defense_allocation',
        fields: [],
        centerX: 28,
        centerY: 34,
        children: []
      },
      {
        name: 'Long Term Care',
        id: 'long_term_care',
        parentID: 'defense_allocation',
        fields: [],
        centerX: 33,
        centerY: 34,
        children: []
      },
      {
        name: 'Term Insurance',
        id: 'term_insurance',
        parentID: 'defense_allocation',
        fields: [],
        centerX: 36,
        centerY: 38,
        children: []
      },
    ]
  },
  {
    name: 'Offense Allocation',
    id: 'offense_allocation',
    parentID: '',
    fields: [],
    centerX: 30.5,
    centerY: 46,
    children: [
      {
        name: 'Short Term Money',
        id: 'short_term_money',
        parentID: 'offense_allocation',
        fields: [],
        centerX: 23,
        centerY: 49,
        children: [
          {
            name: 'Cash Equivalents',
            id: 'cash_equivalents',
            parentID: 'short_term_money',
            fields: [],
            centerX: 20,
            centerY: 49,
            children: []
          },
          {
            name: 'Mortgage',
            id: 'mortgage',
            parentID: 'short_term_money',
            fields: [],
            centerX: 21,
            centerY: 51,
            children: []
          },
          {
            name: 'Liabilities/Debt',
            id: 'liabilities_debt',
            parentID: 'short_term_money',
            fields: [],
            centerX: 23,
            centerY: 52,
            children: []
          },
        ]
      },
      {
        name: 'Mid Term Money',
        id: 'mid_term_money',
        parentID: 'offense_allocation',
        fields: [],
        centerX: 30.5,
        centerY: 52,
        children: [
          {
            name: 'UTMA\'s',
            id: 'utmas',
            parentID: 'mid_term_money',
            fields: [],
            centerX: 28.5,
            centerY: 54,
            children: []
          },
          {
            name: '529 Plan',
            id: 'plan_529',
            parentID: 'mid_term_money',
            fields: [],
            centerX: 30.5,
            centerY: 55,
            children: []
          },
          {
            name: 'Investment Account',
            id: 'investment_account',
            parentID: 'mid_term_money',
            fields: [],
            centerX: 32.5,
            centerY: 54,
            children: []
          },
        ]
      },
      {
        name: 'Long Term Money',
        id: 'long_term_money',
        parentID: 'offense_allocation',
        fields: [],
        centerX: 38,
        centerY: 48.75,
        children: [
          {
            name: 'IRA ROTH',
            id: 'ira_roth',
            parentID: 'long_term_money',
            fields: [],
            centerX: 36.5,
            centerY: 51.75,
            children: []
          },
          {
            name: 'Cash Value Life',
            id: 'cash_value_life',
            parentID: 'long_term_money',
            fields: [],
            centerX: 39,
            centerY: 51.5,
            children: []
          },
          {
            name: '401_K',
            id: 'k_401',
            parentID: 'long_term_money',
            fields: [],
            centerX: 40.75,
            centerY: 49.5,
            children: []
          },
          {
            name: 'Annuity',
            id: 'annuity',
            parentID: 'long_term_money',
            fields: [],
            centerX: 40.75,
            centerY: 47,
            children: []
          },
          {
            name: 'Stock option',
            id: 'stock_option',
            parentID: 'long_term_money',
            fields: [],
            centerX: 38,
            centerY: 53.5,
            children: []
          },
          {
            name: 'Investment Real Estate',
            id: 'investment_real_estate',
            parentID: 'long_term_money',
            fields: [],
            centerX: 41.25,
            centerY: 51.75,
            children: []
          },
          {
            name: 'Deffered Comp',
            id: 'deffered_comp',
            parentID: 'long_term_money',
            fields: [],
            centerX: 42.75,
            centerY: 48.25,
            children: []
          }
        ]
      }
    ]
  }
];
