/**
  Type "Color" - is an usual object with props "bg" and "text" that determine color of node elements. E.g. color: { bg: '#5fc6f5', text: '#f5fcff' }

  @param {Color} color If it's specified then a node ignores "childrenColor" property from its parent
*/

export default [
  {
    name: 'Net Worth',
    id: 'net_worth',
    parent: '',
    fields: [],
    centerX: 30.5,
    centerY: 42.5,
    visible: true,
    children: []
  },
  {
    name: 'Defense Allocation',
    id: 'defense_allocation',
    parent: '',
    fields: [],
    centerX: 30.5, // X,Y represent points on a plane to map the current data to. If we wanted to get fancy we could rework this to include Z coordinates, but I don't see that showing a need for any time soon. If it does tracking down how these guys are used is a good place to start.
    centerY: 37,
    visible: true,
    children: [ // Should `children` be thought of as `data`. The `chldren` field name is used to imply this can be eith a series of liner data points or a series of relationally nested data objects.
      {
        name: 'Will',
        id: 'will',
        parent: 'defense_allocation',
        fields: [],
        centerX: 25,
        centerY: 36.5,
        visible: false,
        children: []
      },
      {
        name: 'Disabilty Insurance',
        id: 'disability_insurance',
        parent: 'defense_allocation',
        fields: [],
        centerX: 28,
        centerY: 32.5,
        visible: false,
        children: []
      },
      {
        name: 'Long Term Care',
        id: 'long_term_care',
        parent: 'defense_allocation',
        fields: [],
        centerX: 33,
        centerY: 32.5,
        visible: false,
        children: []
      },
      {
        name: 'Term Insurance',
        id: 'term_insurance',
        parent: 'defense_allocation',
        fields: [],
        centerX: 36,
        centerY: 36.5,
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
    centerY: 48,
    visible: true,
    children: [
      {
        name: 'Short Term Money',
        id: 'short_term_money',
        parent: 'offense_allocation',
        fields: [],
        centerX: 24.5,
        centerY: 49.5,
        visible: false,
        children: [
          {
            name: 'Cash Equivalents',
            id: 'cash_equivalents',
            parent: 'short_term_money',
            fields: [],
            centerX: 20.5,
            centerY: 49.5,
            visible: false,
            children: []
          },
          {
            name: 'Mortgage',
            id: 'mortgage',
            parent: 'short_term_money',
            fields: [],
            centerX: 21.5,
            centerY: 52.5,
            visible: false,
            children: []
          },
          {
            name: 'Liabilities/Debt',
            id: 'liabilities_debt',
            parent: 'short_term_money',
            fields: [],
            centerX: 24.5,
            centerY: 53.5,
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
        centerY: 53.5,
        visible: false,
        children: [
          {
            name: 'UTMA\'s',
            id: 'utmas',
            parent: 'mid_term_money',
            fields: [],
            centerX: 27.5,
            centerY: 56,
            visible: false,
            children: []
          },
          {
            name: '529 Plan',
            id: 'plan_529',
            parent: 'mid_term_money',
            fields: [],
            centerX: 30.5,
            centerY: 57.5,
            visible: false,
            children: []
          },
          {
            name: 'Investment Account',
            id: 'investment_account',
            parent: 'mid_term_money',
            fields: [],
            centerX: 33.5,
            centerY: 56,
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
        centerX: 36.5,
        centerY: 49.5,
        visible: false,
        children: [
          {
            name: 'IRA ROTH',
            id: 'ira_roth',
            parent: 'long_term_money',
            fields: [],
            centerX: 36.5,
            centerY: 53.5,
            visible: false,
            children: []
          },
          {
            name: 'Cash Value Life',
            id: 'cash_value_life',
            parent: 'long_term_money',
            fields: [],
            centerX: 39,
            centerY: 53.25,
            visible: false,
            children: []
          },
          {
            name: '401_K',
            id: 'k_401',
            parent: 'long_term_money',
            fields: [],
            centerX: 40.75,
            centerY: 51.25,
            visible: false,
            children: []
          },
          {
            name: 'Annuity',
            id: 'annuity',
            parent: 'long_term_money',
            fields: [],
            centerX: 40.75,
            centerY: 48.75,
            visible: false,
            children: []
          },
          {
            name: 'Stock option',
            id: 'stock_option',
            parent: 'long_term_money',
            fields: [],
            centerX: 38,
            centerY: 55.25,
            visible: false,
            children: []
          },
          {
            name: 'Investment Real Estate',
            id: 'investment_real_estate',
            parent: 'long_term_money',
            fields: [],
            centerX: 41.25,
            centerY: 53.5,
            visible: false,
            children: []
          },
          {
            name: 'Deffered Comp',
            id: 'deffered_comp',
            parent: 'long_term_money',
            fields: [],
            centerX: 42.75,
            centerY: 50.0,
            visible: false,
            children: []
          }
        ]
      }
    ]
  }
];
