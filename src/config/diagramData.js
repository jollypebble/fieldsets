export default [
  {
    name: 'Defense Allocation',
    id: 'defense_allocation',
    parentID: '',
    fields: [],
    startx: 30.5,
    starty: 38.5,
    children: [
      {
        name: 'Will',
        id: 'will',
        parentID: 'defense_allocation',
        fields: [],
        startx: 25,
        starty: 38,
        children: []
      },
      {
        name: 'Disabilty Insurance',
        id: 'disability_insurance',
        parentID: 'defense_allocation',
        fields: [],
        startx: 28,
        starty: 34,
        children: []
      },
      {
        name: 'Long Term Care',
        id: 'long_term_care',
        parentID: 'defense_allocation',
        fields: [],
        startx: 33,
        starty: 34,
        children: []
      },
      {
        name: 'Term Insurance',
        id: 'term_insurance',
        parentID: 'defense_allocation',
        fields: [],
        startx: 36,
        starty: 38,
        children: []
      },
    ]
  },
  {
    name: 'Offense Allocation',
    id: 'offense_allocation',
    parentID: '',
    fields: [],
    startx: 30.5,
    starty: 46,
    children: [
      {
        name: 'Short Term Money',
        id: 'short_term_money',
        fields: [],
        startx: 23,
        starty: 49,
        children: [
          {
            name: 'Cash Equivalents',
            id: 'cash_equivalents',
            parentID: 'short_term_money',
            fields: [],
            startx: 20,
            starty: 49,
            children: []
          },
          {
            name: 'Mortgage',
            id: 'mortgage',
            parentID: 'short_term_money',
            fields: [],
            startx: 21,
            starty: 51,
            children: []
          },
          {
            name: 'Liabilities/Debt',
            id: 'liabilities_debt',
            parentID: 'short_term_money',
            fields: [],
            startx: 23,
            starty: 52,
            children: []
          },
        ]
      },
      {
        name: 'Mid Term Money',
        id: 'mid_term_money',
        parentID: 'offense_allocation',
        fields: [],
        startx: 30.5,
        starty: 52,
        children: [
          {
            name: 'UTMA\'s',
            id: 'utmas',
            parentID: 'mid_term_money',
            fields: [],
            startx: 28.5,
            starty: 54,
            children: []
          },
          {
            name: '529 Plan',
            id: 'plan_529',
            parentID: 'mid_term_money',
            fields: [],
            startx: 30.5,
            starty: 55,
            children: []
          },
          {
            name: 'Investment Account',
            id: 'investment_account',
            parentID: 'mid_term_money',
            fields: [],
            startx: 32.5,
            starty: 54,
            children: []
          },
        ]
      },
      {
        name: 'Long Term Money',
        id: 'long_term_money',
        parentID: 'offense_allocation',
        fields: [],
        startx: 38,
        starty: 48.75,
        children: [
          {
            name: 'IRA ROTH',
            id: 'ira_roth',
            parentID: 'long_term_money',
            fields: [],
            startx: 36.5,
            starty: 51.75,
            children: []
          },
          {
            name: 'Cash Value Life',
            id: 'cash_value_life',
            parentID: 'long_term_money',
            fields: [],
            startx: 39,
            starty: 51.5,
            children: []
          },
          {
            name: '401_K',
            id: 'k_401',
            parentID: 'long_term_money',
            fields: [],
            startx: 40.75,
            starty: 49.5,
            children: []
          },
          {
            name: 'Annuity',
            id: 'annuity',
            parentID: 'long_term_money',
            fields: [],
            startx: 40.75,
            starty: 47,
            children: []
          },
          {
            name: 'Stock option',
            id: 'stock_option',
            parentID: 'long_term_money',
            fields: [],
            startx: 38,
            starty: 53.5,
            children: []
          },
          {
            name: 'Investment Real Estate',
            id: 'investment_real_estate',
            parentID: 'long_term_money',
            fields: [],
            startx: 41.25,
            starty: 51.75,
            children: []
          },
          {
            name: 'Deffered comp',
            id: 'deffered_comp',
            parentID: 'long_term_money',
            fields: [],
            startx: 42.75,
            starty: 48.25,
            children: []
          }
        ]
      }
    ]
  }
];
