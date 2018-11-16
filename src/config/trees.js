/* eslint-disable */
import Shapes from './shapes';

const Trees = [
  [{
    name: 'Total Contributions',
    id: 'contributions',
    attributes: {
      classes: [],
      input_fields: [],
      output_fields: []
    },
    startcoords: { x: 300, y: 100 },
    nodeSvgShape: Shapes.parent_circle,
    children: [],
  }],
  [{
    name: 'Defense Allocation',
    id: 'defense',
    startcoords: { x: 100, y: 200 },
    attributes: {
      classes: [],
      input_fields: [],
      output_fields: []
    },
    nodeSvgShape: Shapes.parent_circle,
    children: [
      {
        name: 'Will',
        id: 'will',
        attributes: {
          classes: [],
          input_fields: [],
          output_fields: []
        },
        nodeSvgShape: Shapes.child_circle,
        children: []
      },
      {
        name: 'Disability Insurance',
        id: 'disability_insurance',
        attributes: {
          classes: [],
          input_fields: [],
          output_fields: []
        },
        nodeSvgShape: Shapes.child_circle,
        children: []
      },
      {
        name: 'Will1',
        id: 'will1',
        attributes: {
          classes: [],
          input_fields: [],
          output_fields: []
        },
        nodeSvgShape: Shapes.child_circle,
        children: []
      },
      {
        name: 'Will2',
        id: 'will2',
        attributes : {
          classes: [],
          input_fields: [],
          output_fields: []
        },
        nodeSvgShape: Shapes['child_circle'],
        children: []
      },
      {
        name: 'Will3',
        id: 'will3',
        attributes : {
          classes: [],
          input_fields: [],
          output_fields: []
        },
        nodeSvgShape: Shapes['child_circle'],
        children: []
      },
      {
        name: 'Will4',
        id: 'will4',
        attributes : {
          classes: [],
          input_fields: [],
          output_fields: []
        },
        nodeSvgShape: Shapes['child_circle'],
        children: []
      },
      {
        name: 'Will5',
        id: 'will5',
        attributes : {
          classes: [],
          input_fields: [],
          output_fields: []
        },
        nodeSvgShape: Shapes['child_circle'],
        children: []
      }
    ]
  }],
  [{
    name: 'Offense Allocation',
    startcoords: {x: 300, y: 300},
    attributes : {
      id: 'offense_allocation',
    },
    nodeSvgShape: Shapes['parent_circle'],
    children : [
      {
        name: 'Cash Equivalents',
        attributes : {
          id : 'cash_equivalents',
        },
        nodeSvgShape: Shapes['child_circle'],
        children: []
      },
      {
        name: 'Mortgage / Liabilities',
        attributes : {
          id: 'mortgage_liabilities',
        },
        nodeSvgShape: Shapes['child_circle'],
        children: []
      },
      {
        name : "UTMA's",
        attributes : {
          id : 'utmas',
        },
        nodeSvgShape: Shapes['child_circle'],
        children: []
      },
      {
        name: '529 Plan',
        attributes : {
          id: 'plan_529',
        },
        nodeSvgShape: Shapes['child_circle'],
        children: []
      },
      {
        name: 'Investment Account',
        attributes:{
          id : 'investment_account',
        },
        nodeSvgShape: Shapes['child_circle'],
        // children: [
        //   {
        //     name: 'Business Investment',
        //     id: 'business_investment',
        //     attributes : {
        //       classes: [],
        //       input_fields: [],
        //       output_fields: []
        //     },
        //     nodeSvgShape: Shapes['child_circle'],
        //     children: []
        //   },
        //   {
        //     name: "Aaron's Money",
        //     id: 'aarons_money',
        //     attributes : {
        //       classes: [],
        //       input_fields: [],
        //       output_fields: []
        //     },
        //     nodeSvgShape: Shapes['child_circle'],
        //     children: []
        //   }
        // ]
      },
      {
        name: 'IRA ROTH',
        attributes : {
          id: 'ira_roth',
        },
        nodeSvgShape: Shapes['child_circle'],
      },
      {
        name: 'Cash Value Life',
        attributes : {
          id: 'cash_value_life',
        },
        nodeSvgShape: Shapes['child_circle'],
      },
      {
        name: '401_K',
        attributes : {
          id: 'k_401',
        },
        nodeSvgShape: Shapes['child_circle'],
      },
      {
        name: 'Annuity',
        attributes : {
          id: 'annuity',
        },
        nodeSvgShape: Shapes['child_circle'],
      },
      // {
      //   name: 'DEF comp',
      //   id: 'def_comp',
      //   attributes : {
      //     classes: ['mid_term'],
      //     input_fields: [],
      //     output_fields: []
      //   },
      //   nodeSvgShape: Shapes['child_circle'],
      // },
      // {
      //   name: 'Investment Real Estate',
      //   id: 'investment_real_estate',
      //   attributes : {
      //     classes: ['mid_term'],
      //     input_fields: [],
      //     output_fields: []
      //   },
      //   nodeSvgShape: Shapes['child_circle'],
      // },
      // {
      //   name: 'Stock option',
      //   id: 'stock_option',
      //   attributes : {
      //     classes: ['mid_term'],
      //     input_fields: [],
      //     output_fields: []
      //   },
      //   nodeSvgShape: Shapes['child_circle'],
      // }
    ]
  }]
];

export default Trees
