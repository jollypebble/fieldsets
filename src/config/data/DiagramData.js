export default [
  {
    name: 'Defense Allocation',
    id: 'defense_allocation',
    parent: '',
    fields: [],
    centerX: 30.5, // X,Y represent points on a plane to map the current data to. If we wanted to get fancy we could rework this to include Z coordinates, but I don't see that showing a need for any time soon. If it does tracking down how these guys are used is a good place to start.
    centerY: 38.5,
    visible: true,
    children: [ // Should `children` be thought of as `data`. The `chldren` field name is used to imply this can be eith a series of liner data points or a series of relationally nested data objects.
      {
        name: 'Will',
        id: 'will',
        parent: 'defense_allocation',
        fields: [],
        centerX: 25,
        centerY: 38,
        visible: false,
        children: []
      },
      {
        name: 'Disabilty Insurance',
        id: 'disability_insurance',
        parent: 'defense_allocation',
        fields: [],
        centerX: 28,
        centerY: 34,
        visible: false,
        children: []
      },
      {
        name: 'Long Term Care',
        id: 'long_term_care',
        parent: 'defense_allocation',
        fields: [],
        centerX: 33,
        centerY: 34,
        visible: false,
        children: []
      },
      {
        name: 'Term Insurance',
        id: 'term_insurance',
        parent: 'defense_allocation',
        fields: [],
        centerX: 36,
        centerY: 38,
        visible: false,
        children: []
      },
    ]
  },
  {
    name: 'Offense Allocation',
    id: 'offense_allocation',
    parent: '',
    fields: [],
    centerX: 30.5,
    centerY: 46,
    visible: true,
    children: [
      {
        name: 'Short Term Money',
        id: 'short_term_money',
        parent: 'offense_allocation',
        fields: [],
        centerX: 23,
        centerY: 49,
        visible: false,
        children: [
          {
            name: 'Cash Equivalents',
            id: 'cash_equivalents',
            parent: 'short_term_money',
            fields: [],
            centerX: 20,
            centerY: 49,
            visible: false,
            children: []
          },
          {
            name: 'Mortgage',
            id: 'mortgage',
            parent: 'short_term_money',
            fields: [],
            centerX: 21,
            centerY: 51,
            visible: false,
            children: []
          },
          {
            name: 'Liabilities/Debt',
            id: 'liabilities_debt',
            parent: 'short_term_money',
            fields: [],
            centerX: 23,
            centerY: 52,
            visible: false,
            children: []
          },
        ]
      },
      {
        name: 'Mid Term Money',
        id: 'mid_term_money',
        parent: 'offense_allocation',
        fields: [],
        centerX: 30.5,
        centerY: 52,
        visible: false,
        children: [
          {
            name: 'UTMA\'s',
            id: 'utmas',
            parent: 'mid_term_money',
            fields: [],
            centerX: 28.5,
            centerY: 54,
            visible: false,
            children: []
          },
          {
            name: '529 Plan',
            id: 'plan_529',
            parent: 'mid_term_money',
            fields: [],
            centerX: 30.5,
            centerY: 55,
            visible: false,
            children: []
          },
          {
            name: 'Investment Account',
            id: 'investment_account',
            parent: 'mid_term_money',
            fields: [],
            centerX: 32.5,
            centerY: 54,
            visible: false,
            children: []
          },
        ]
      },
      {
        name: 'Long Term Money',
        id: 'long_term_money',
        parent: 'offense_allocation',
        fields: [],
        centerX: 38,
        centerY: 48.75,
        visible: false,
        children: [
          {
            name: 'IRA ROTH',
            id: 'ira_roth',
            parent: 'long_term_money',
            fields: [],
            centerX: 36.5,
            centerY: 51.75,
            visible: false,
            children: []
          },
          {
            name: 'Cash Value Life',
            id: 'cash_value_life',
            parent: 'long_term_money',
            fields: [],
            centerX: 39,
            centerY: 51.5,
            visible: false,
            children: []
          },
          {
            name: '401_K',
            id: 'k_401',
            parent: 'long_term_money',
            fields: [],
            centerX: 40.75,
            centerY: 49.5,
            visible: false,
            children: []
          },
          {
            name: 'Annuity',
            id: 'annuity',
            parent: 'long_term_money',
            fields: [],
            centerX: 40.75,
            centerY: 47,
            visible: false,
            children: []
          },
          {
            name: 'Stock option',
            id: 'stock_option',
            parent: 'long_term_money',
            fields: [],
            centerX: 38,
            centerY: 53.5,
            visible: false,
            children: []
          },
          {
            name: 'Investment Real Estate',
            id: 'investment_real_estate',
            parent: 'long_term_money',
            fields: [],
            centerX: 41.25,
            centerY: 51.75,
            visible: false,
            children: []
          },
          {
            name: 'Deffered Comp',
            id: 'deffered_comp',
            parent: 'long_term_money',
            fields: [],
            centerX: 42.75,
            centerY: 48.25,
            visible: false,
            children: []
          }
        ]
      }
    ]
  }
];
