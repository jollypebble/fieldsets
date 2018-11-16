export default [
  {
    name: 'Offense Allocation',
    id: 'offense_allocation',
    isParent: true,
    hasChildren: true,
    shape: 'oval',
    positionPath: 'm 234.12746,123.41832 a 19.938244,20.977678 0 0 1 10.21297,27.52593 19.938244,20.977678 0 0 1 -26.08015,10.96354 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91146,-11.39771 l -7.49609,19.43862 z',
    primaryParent: '',
    fields: [],
    children: [
      {
        name: 'Short Term Money',
        id: 'short_term_money',
        isParent: true,
        hasChildren: true,
        shape: 'oval',
        positionPath: '',
        primaryParent: 'offense_allocation',
        fields: [],
        children: [
          {
            name: 'Cash Equivalents',
            id: 'cash_equivalents',
            isParent: false,
            hasChildren: false,
            shape: 'oval',
            positionPath: '',
            primaryParent: 'short_term_money',
            fields: []
          },
          {
            name: 'Mortgage',
            id: 'mortgage',
            isParent: false,
            hasChildren: false,
            shape: 'oval',
            positionPath: '',
            primaryParent: 'short_term_money',
            fields: []
          },
          {
            name: 'Liabilities/Debt',
            id: 'liabilities_debt',
            isParent: false,
            hasChildren: false,
            shape: 'oval',
            positionPath: '',
            primaryParent: 'short_term_money',
            fields: []
          },
        ]
      },
      {
        name: 'Mid Term Money',
        id: 'mid_term_money',
        isParent: true,
        hasChildren: true,
        shape: 'oval',
        positionPath: 'm 234.12746,123.41832 a 19.938244,20.977678 0 0 1 10.21297,27.52593 19.938244,20.977678 0 0 1 -26.08015,10.96354 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91146,-11.39771 l -7.49609,19.43862 z',
        primaryParent: 'offense_allocation',
        fields: [],
        children: [
          {
            name: 'UTMA\'s',
            id: 'utmas',
            isParent: false,
            hasChildren: false,
            shape: 'oval',
            positionPath: '',
            primaryParent: 'mid_term_money',
            fields: []
          },
          {
            name: '529 Plan',
            id: 'plan_529',
            isParent: false,
            hasChildren: false,
            shape: 'oval',
            positionPath: '',
            primaryParent: 'mid_term_money',
            fields: []
          },
          {
            name: 'Investment Account',
            id: 'investment_account',
            isParent: false,
            hasChildren: false,
            shape: 'oval',
            positionPath: '',
            primaryParent: 'mid_term_money',
            fields: []
          },
        ]
      },
      {
        name: 'Long Term Money',
        id: 'long_term_money',
        isParent: true,
        hasChildren: true,
        shape: 'oval',
        positionPath: 'm 234.12746,123.41832 a 19.938244,20.977678 0 0 1 10.21297,27.52593 19.938244,20.977678 0 0 1 -26.08015,10.96354 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91146,-11.39771 l -7.49609,19.43862 z',
        primaryParent: 'offense_allocation',
        fields: [],
        children: [
          {
            name: 'IRA ROTH',
            id: 'ira_roth',
            isParent: false,
            hasChildren: false,
            shape: 'oval',
            positionPath: '',
            primaryParent: 'long_term_money',
            fields: []
          },
          {
            name: 'Cash Value Life',
            id: 'cash_value_life',
            isParent: false,
            hasChildren: false,
            shape: 'oval',
            positionPath: '',
            primaryParent: 'long_term_money',
            fields: []
          },
          {
            name: '401_K',
            id: 'k_401',
            isParent: false,
            hasChildren: false,
            shape: 'oval',
            positionPath: '',
            primaryParent: 'long_term_money',
            fields: []
          },
          {
            name: 'Annuity',
            id: 'annuity',
            isParent: false,
            hasChildren: false,
            shape: 'oval',
            positionPath: '',
            primaryParent: 'long_term_money',
            fields: []
          },
          {
            name: 'Stock option',
            id: 'stock_option',
            isParent: false,
            hasChildren: false,
            shape: 'oval',
            positionPath: '',
            primaryParent: 'long_term_money',
            fields: []
          },
          {
            name: 'Investment Real Estate',
            id: 'investment_real_estate',
            isParent: false,
            hasChildren: false,
            shape: 'oval',
            positionPath: '',
            primaryParent: 'long_term_money',
            fields: []
          },
          {
            name: 'Deffered comp',
            id: 'deffered_comp',
            isParent: false,
            hasChildren: false,
            shape: 'oval',
            positionPath: '',
            primaryParent: 'long_term_money',
            fields: []
          }
        ]
      }
    ]
  },
  {
    name: 'Defense Allocation',
    id: 'defense_allocation',
    isParent: true,
    hasChildren: true,
    shape: 'oval',
    positionPath: 'm 233.7684,75.226549 a 19.938244,20.977678 0 0 1 10.21298,27.525931 19.938244,20.977678 0 0 1 -26.08015,10.96353 19.938244,20.977678 0 0 1 -10.62696,-27.351896 19.938244,20.977678 0 0 1 25.91146,-11.397707 l -7.49609,19.438622 z',
    primaryParent: '',
    fields: [],
    children: [
      {
        name: 'Will',
        id: 'will',
        isParent: false,
        hasChildren: false,
        shape: 'oval',
        positionPath: 'm 153.67509,45.215257 a 19.938244,20.977678 0 0 1 10.21298,27.525931 19.938244,20.977678 0 0 1 -26.08015,10.963534 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91146,-11.397707 l -7.49609,19.438623 z',
        primaryParent: 'defense_allocation',
        fields: []
      },
      {
        name: 'Disabilty Insurance',
        id: 'disability_insurance',
        isParent: false,
        hasChildren: false,
        shape: 'oval',
        positionPath: 'm 203.41685,22.99024 a 19.938244,20.977678 0 0 1 10.21298,27.52593 19.938244,20.977678 0 0 1 -26.08015,10.963535 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91146,-11.397707 l -7.49609,19.438622 z',
        primaryParent: 'defense_allocation',
        fields: []
      },
      {
        name: 'Long Term Care',
        id: 'long_term_care',
        isParent: false,
        hasChildren: false,
        shape: 'oval',
        positionPath: 'm 263.96864,23.746198 a 19.938244,20.977678 0 0 1 10.21298,27.525931 19.938244,20.977678 0 0 1 -26.08015,10.963534 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91146,-11.397707 l -7.49609,19.438623 z',
        primaryParent: 'defense_allocation',
        fields: []
      },
      {
        name: 'Term Insurance',
        id: 'term_insurance',
        isParent: false,
        hasChildren: false,
        shape: 'oval',
        positionPath: 'm 314.54181,44.912866 a 19.938244,20.977678 0 0 1 10.21297,27.525931 19.938244,20.977678 0 0 1 -26.08015,10.963534 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91147,-11.397707 l -7.4961,19.438623 z',
        primaryParent: 'defense_allocation',
        fields: []
      },
    ]
  }
];
