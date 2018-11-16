/* eslint-disable */
import {
  OFFENCE_ALLOCATION_ADD_EXTRA_FIELD,
  OFFENCE_ALLOCATION_REMOVE_EXTRA_FIELD
} from 'redux-base/actions';

const initialState = {
  offense_allocation: {
    children: {
      offense_allocation: {
        isParent: true,
        fields: [{
          key: 'monthly_total',
          value: 0,
          label: 'monthly total',
          displayInCircle: true
        }, {
          key: 'monthly_unallocated',
          value: 0,
          label: 'monthly unallocated',
          displayInCircle: true
        }, {
          key: 'lump_unallocated',
          value: 0,
          label: 'Lump unallocated',
          displayInCircle: true
        }]
      },
      cash_equivalents: {
        fields: [{
          key: 'dollar',
          value: 0,
          label: '$',
          displayInCircle: true
        }, {
          key: 'extra_field',
          hasExtraFields: true,
          extra_fields: []
        }, {
          key: 'lump',
          value: 0,
          label: 'Lump'
        }, {
          key: 'total_value',
          value: 0,
          label: 'Total Val',
          displayInCircle: true
        }]
      },
      mortgage: {
        fields: [{
          key: 'dollar',
          value: 0,
          label: '$',
          displayInCircle: true
        }, {
          key: 'extra_field',
          hasExtraFields: true,
          extra_fields: []
        }, {
          key: 'lump',
          value: 0,
          label: 'Lump'
        }, {
          key: 'total_value',
          value: 0,
          label: 'Total Val',
          displayInCircle: true
        }]
      },
      liabilities_debt: {
        fields: [{
          key: 'dollar',
          value: 0,
          label: '$',
          displayInCircle: true
        }, {
          key: 'extra_field',
          hasExtraFields: true,
          extra_fields: []
        }, {
          key: 'lump',
          value: 0,
          label: 'Lump'
        }, {
          key: 'total_value',
          value: 0,
          label: 'Total Val',
          displayInCircle: true
        }]
      },
      utmas: {
        fields: [{
          key: 'dollar',
          value: 0,
          label: '$',
          displayInCircle: true
        }, {
          key: 'extra_field',
          hasExtraFields: true,
          extra_fields: []
        }, {
          key: 'lump',
          value: 0,
          label: 'Lump'
        }, {
          key: 'total_value',
          value: 0,
          label: 'Total Val',
          displayInCircle: true
        }]
      },
      plan_529: {
        fields: [{
          key: 'dollar',
          value: 0,
          label: '$',
          displayInCircle: true
        }, {
          key: 'extra_field',
          hasExtraFields: true,
          extra_fields: []
        }, {
          key: 'lump',
          value: 0,
          label: 'Lump'
        }, {
          key: 'total_value',
          value: 0,
          label: 'Total Val',
          displayInCircle: true
        }]
      },
      investment_account: {
        fields: [{
          key: 'dollar',
          value: 0,
          label: '$',
          displayInCircle: true
        }, {
          key: 'extra_field',
          hasExtraFields: true,
          extra_fields: []
        }, {
          key: 'lump',
          value: 0,
          label: 'Lump'
        }, {
          key: 'total_value',
          value: 0,
          label: 'Total Val',
          displayInCircle: true
        }]
      },
      ira_roth: {
        fields: [{
          key: 'dollar',
          value: 0,
          label: '$',
          displayInCircle: true
        }, {
          key: 'extra_field',
          hasExtraFields: true,
          extra_fields: []
        }, {
          key: 'lump',
          value: 0,
          label: 'Lump'
        }, {
          key: 'total_value',
          value: 0,
          label: 'Total Val',
          displayInCircle: true
        }]
      },
      cash_value_life: {
        fields: [{
          key: 'dollar',
          value: 0,
          label: '$',
          displayInCircle: true
        }, {
          key: 'extra_field',
          hasExtraFields: true,
          extra_fields: []
        }]
      },
      k_401: {
        fields: [{
          key: 'dollar',
          value: 0,
          label: '$',
          displayInCircle: true
        }, {
          key: 'extra_field',
          hasExtraFields: true,
          extra_fields: []
        }, {
          key: 'total_value',
          value: 0,
          label: 'Total Val',
          displayInCircle: true
        }]
      },
      annuity: {
        fields: [{
          key: 'dollar',
          value: 0,
          label: '$',
          displayInCircle: true
        }, {
          key: 'extra_field',
          hasExtraFields: true,
          extra_fields: []
        }, {
          key: 'lump',
          value: 0,
          label: 'Lump'
        }, {
          key: 'total_value',
          value: 0,
          label: 'Total Val',
          displayInCircle: true
        }]
      },
      stock_option: {
        fields: [{
          key: 'dollar',
          value: 0,
          label: '$',
          displayInCircle: true
        }]
      },
      investment_real_estate: {
        fields: [{
          key: 'dollar',
          value: 0,
          label: '$',
          displayInCircle: true
        }]
      },
      deffered_comp: {
        fields: [{
          key: 'dollar',
          value: 0,
          label: '$',
          displayInCircle: true
        }]
      }
    }
  }
};

export default function treeDiagram(state = initialState, action = {}) {
  switch (action.type) {
    case OFFENCE_ALLOCATION_ADD_EXTRA_FIELD:
      return {
        ...state,
        offense_allocation: {
          ...state.offense_allocation,
          children: {
            ...state.offense_allocation.children,
            [action.data.id]: {
              ...state.offense_allocation.children[action.data.id],
              fields: state.offense_allocation.children[action.data.id].fields.map(item =>
                (item.key === 'extra_field' ? {
                  ...item,
                  extra_fields: [...item.extra_fields, action.data.payload]
                } : item))
            }
          }
        }
      };
    case OFFENCE_ALLOCATION_REMOVE_EXTRA_FIELD:
      return {
        ...state,
        offense_allocation: {
          ...state.offense_allocation,
          children: {
            ...state.offense_allocation.children,
            [action.data.id]: {
              ...state.offense_allocation.children[action.data.id],
              fields: state.offense_allocation.children[action.data.id].fields.map(item =>
                (item.key === 'extra_field' ? {
                  ...item,
                  extra_fields: item.extra_fields.filter(field => field.key !== action.data.key)
                } : item))
            }
          }
        }
      };
    default:
      return state;
  }
}
