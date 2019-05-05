import DataUtils from '../../utils/DataUtils'

/**
 * Defaults will be merged with defined values in the data variable below.
 * Core functionality is based around the following variables.
 * @param int id - The node id.
 * @param string name - The node name
 * @param string parent - id of the parent node
 * @param float centerX - X coordinate on the diagram
 * @param float centerY - Y coordinate on the diagram
 * @param array[string] children - Any child node ids
 * @param object{string,object} display{shape,attributes{}} - Display parameters includig tHe shape to display on the x,y coordinate and any attibutes needed for that shape.
 */
const valueDefaults = {
  id: 'default',
  name: 'default',
  parent: '',
  centerX: 0,
  centerY: 0,
  children: [],
  display: {
    shape: 'Circle', // The shape Component
    attributes: {
      textSize: 0.6,
      ratio: 0.8
    }, // Shape attributes
    className: '', // Additional classnames
    visible: true, // Visibility
    zoom: { // Used for handling zoom functionality
      scale: 1,
      x: 0.5,
      y: 0.5,
    } // Zoom functionality
  }
}

const defenseDefault = {
  display: {
    attributes: {
      ratio: 1.1,
      textSize: 0.45
    }
  }
};

const offenseDefault = {
  display: {
    attributes: {
      ratio: 1.6,
      textSize: 0.28,
    }
  }
};

const offenseSmall = {
  display: {
    attributes: {
      ratio: 1.2,
      textSize: 0.3
    }
  }
}

/**
 * This is our diagram data point. We define this here in our config, but this could just as easily be generated by a graphql query that spits back the needed data format.
 * Data values found in the defaults will be merged with the elements in this array.
 */
const data = [
  {
    id: 'monthly_contribution',
    name: 'Monthly Contribution',
    centerX: 37.5,
    centerY: 28,
    display: {
      shape: 'Rectangle',
      attributes: {
        textX: 42.5,
        textY: 30.5,
        textSize: 0.8
      }
    }
  },
  {
    id: 'lump_sums',
    name: 'Lump Sums',
    centerX: 54,
    centerY: 28,
    display: {
      shape: 'Rectangle',
      attributes: {
        textX: 59,
        textY: 30.5,
        textSize: 0.8
      }
    }
  },
  {
    id: 'net_worth',
    name: 'Net Worth',
    centerX: 51,
    centerY: 42.5,
    display: {
      shape: 'Ellipse'
    }
  },
  {
    id: 'defense_allocation',
    name: 'Defense Allocation',
    centerX: 51, // X,Y represent points on a plane to map the current data to. If we wanted to get fancy we could rework this to include Z coordinates, but I don't see that showing a need for any time soon. If it does tracking down how these guys are used is a good place to start.
    centerY: 37,
    display: {
      shape: 'Ellipse',
      zoom: { y: 0.75 }
    },
    children: [ // Should `children` be thought of as `data`. The `chldren` field name is used to imply this can be eith a series of liner data points or a series of relationally nested data objects.
      {
        id: 'will',
        name: 'Will',
        parent: 'defense_allocation',
        centerX: 28,
        centerY: 35,
        ...defenseDefault
      },
      {
        id: 'disability_insurance',
        name: 'Disabilty Insurance',
        parent: 'defense_allocation',
        centerX: 36,
        centerY: 38.5,
        ...defenseDefault
      },
      {
        id: 'long_term_care',
        name: 'Long Term Care',
        parent: 'defense_allocation',
        centerX: 66,
        centerY: 38.5,
        ...defenseDefault
      },
      {
        id: 'term_insurance',
        name: 'Term Insurance',
        parent: 'defense_allocation',
        centerX: 74,
        centerY: 35,
        ...defenseDefault
      }
    ]
  },
  {
    id: 'offense_allocation',
    name: 'Offense Allocation',
    centerX: 51,
    centerY: 48,
    display: {
      shape: 'Ellipse'
    },
    children: [
      {
        id: 'short_term_money',
        name: 'Short Term Money',
        parent: 'offense_allocation',
        centerX: 24,
        centerY: 50,
        display: {
          shape: 'labelGroup',
          attributes: {
            textX: 32,
            textY: 57,
            width: 18,
            height: 14,
            radiusX: 6.5,
            radiusY: 6.5,
            rotate: '-45 33 57',
            textSize: 0.7
          },
        },
        children: [
          {
            id: 'cash_equivalents',
            name: 'Cash Equivalents',
            parent: 'short_term_money',
            centerX: 32,
            centerY: 53,
            ...offenseDefault
          },
          {
            id: 'mortgage',
            name: 'Mortgage',
            parent: 'short_term_money',
            centerX: 38,
            centerY: 56.5,
            ...offenseDefault
          },
          {
            id: 'liabilities_debt',
            name: 'Liabilities/Debt',
            parent: 'short_term_money',
            centerX: 31,
            centerY: 60.5,
            ...offenseDefault
          },
        ]
      },
      {
        id: 'mid_term_money',
        name: 'Mid Term Money',
        parent: 'offense_allocation',
        centerX: 50.5,
        centerY: 60,
        display: {
          shape: 'ellipse',
          attributes: {
            radiusX: 7,
            radiusY: 8.5,
            textSize: 0.7
          }
        },
        children: [
          {
            id: 'utmas',
            name: 'UTMA\'s',
            parent: 'mid_term_money',
            centerX: 47.5,
            centerY: 63,
            ...offenseDefault
          },
          {
            id: 'plan_529',
            name: '529 Plan',
            parent: 'mid_term_money',
            centerX: 50.5,
            centerY: 56.5,
            ...offenseDefault
          },
          {
            id: 'investment_account',
            name: 'Investment Account',
            parent: 'mid_term_money',
            centerX: 53.5,
            centerY: 63,
            ...offenseDefault
          },
        ]
      },
      {
        id: 'long_term_money',
        name: 'Long Term Money',
        parent: 'offense_allocation',
        centerX: 60,
        centerY: 49,
        display: {
          shape: 'radialGroup',
          attributes: {
            width: 20,
            height: 17,
            textX: 69,
            textY: 57.5,
            radiusX: 7.5,
            radiusY: 7.5,
            rotate: '45 70 57',
            textSize: 0.7
          },
          zoom: { scale: 1.5 },
        },
        children: [
          {
            id: 'ira_roth',
            name: 'IRA ROTH',
            parent: 'long_term_money',
            centerX: 66.5,
            centerY: 51.5,
            ...offenseDefault
          },
          {
            id: 'cash_value_life',
            name: 'Cash Value Life',
            parent: 'long_term_money',
            centerX: 63,
            centerY: 57,
            ...offenseDefault
          },
          {
            id: 'k_401',
            name: '401_K',
            parent: 'long_term_money',
            centerX: 67,
            centerY: 62,
            ...offenseDefault
          },
          {
            id: 'annuity',
            name: 'Annuity',
            parent: 'long_term_money',
            centerX: 73,
            centerY: 63,
            ...offenseSmall
          },
          {
            id: 'stock_option',
            name: 'Stock option',
            parent: 'long_term_money',
            centerX: 76.5,
            centerY: 60,
            ...offenseSmall
          },
          {
            id: 'investment_real_estate',
            name: 'Real Estate',
            parent: 'long_term_money',
            centerX: 76,
            centerY: 55.5,
            ...offenseSmall
          },
          {
            id: 'deffered_comp',
            name: 'Deffered Comp',
            parent: 'long_term_money',
            centerX: 72.5,
            centerY: 52,
            ...offenseSmall
          }
        ]
      }
    ]
  }
];
// Backfill our data.
const DiagramData = DataUtils.backfillDiagramData(data, valueDefaults);
export default DiagramData;
