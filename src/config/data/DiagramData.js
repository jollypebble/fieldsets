/**
  Type "Color" - is an usual object with props "bg" and "text" that determine color of node elements. E.g. color: { bg: '#5fc6f5', text: '#f5fcff' }
  Type "ZoomScale" - an object that shows how to zoom our sheet when we click on particular node. All props are optional.
    Object example: { scale: 1.5, x: 0.5, y: 0.5 }
    - scale: multiplier for the standard scale
    - x and y: values beetwen 0 and 1 (default 0.5) where 0 is 0 and 1 is max screen size (x=1 === x=window.innerWidth, same for y)

  @param {ZoomScale} zoom Explaines how exactly we scale the sheet when we click on the node
  @param {Color} color If it's specified then a node ignores "childrenColor" property from its parent
*/

const zoomScaleChild1 = 1;
const zoomScaleChild2 = 1;

const smTextSize = 0.4;
const mdTextSize = 0.6;

const ratio = 0.7;

const bgColor1 = '#f55f68';
const strokeColor1 = '#f00';

const bgColor2 = '#9cff9c';
const strokeColor2 = '#66cccc';

const bgColor3 = '#ccccff';
const strokeColor3 = '#73cbd2';

const bgColor4 = '#ccffff';
const strokeColor4 = '#6ccfcf';

const offenseColors = {
  parent: { bg: '#5fc6f5' },
  shortTerm: { bg: '#e3ffe3', stroke: '#66cccc' },
  midTerm: { bg: '#dadaff', stroke: '#75ced2' },
  longTerm: { bg: '#e5ffff', stroke: '#7dd6d6' }
};

const defenceCommon = {
  color: {
    bg: bgColor1,
    stroke: strokeColor1
  },
  fields: [],
  shape: 'circle',
  children: [],
  visible: false,
  zoom: { scale: zoomScaleChild1 },
  textSize: mdTextSize,
  ratio: 0.8
};

const shortTermCommon = {
  color: {
    bg: bgColor2,
    stroke: strokeColor2
  },
  fields: [],
  children: [],
  visible: false,
  zoom: { scale: zoomScaleChild2 },
  shape: 'circle',
  textSize: smTextSize
};

const midTermCommon = {
  color: {
    bg: bgColor3,
    stroke: strokeColor3
  },
  fields: [],
  children: [],
  visible: false,
  zoom: { scale: zoomScaleChild2 },
  shape: 'circle',
  textSize: smTextSize,
  ratio: 0.95
};

const longTermCommon = {
  color: {
    bg: bgColor4,
    stroke: strokeColor4
  },
  fields: [],
  children: [],
  visible: false,
  zoom: { scale: zoomScaleChild2 },
  shape: 'circle',
  textSize: smTextSize
};

let ret = [
  {
    name: 'Monthly Contribution',
    id: 'monthly_contribution',
    parent: '',
    shape: 'rectangle',
    fields: [],
    centerX: 37.5,
    centerY: 28,
    radiusX: 0,
    radiusY: 0,
    textX: 42.5,
    textY: 30.5,
    width: 10,
    height: 4,
    visible: true,
    children: [],
    textSize: mdTextSize
  },
  {
    name: 'Lump Sums',
    id: 'lump_sums',
    parent: '',
    shape: 'rectangle',
    fields: [],
    centerX: 54,
    centerY: 28,
    radiusX: 0,
    radiusY: 0,
    textX: 59,
    textY: 30.5,
    width: 10,
    height: 4,
    visible: true,
    children: [],
    textSize: mdTextSize
  },
  {
    name: 'Net Worth',
    id: 'net_worth',
    parent: '',
    shape: 'ellipse',
    fields: [],
    centerX: 51,
    centerY: 42.5,
    radiusX: 9,
    radiusY: 1.8,
    visible: true,
    children: [],
    textSize: mdTextSize
  },
  {
    name: 'Defense Allocation',
    id: 'defense_allocation',
    parent: '',
    centerX: 51, // X,Y represent points on a plane to map the current data to. If we wanted to get fancy we could rework this to include Z coordinates, but I don't see that showing a need for any time soon. If it does tracking down how these guys are used is a good place to start.
    centerY: 37,
    radiusX: 9,
    radiusY: 1.8,
    zoom: { y: 0.75 },
    visible: true,
    ...defenceCommon,
    textSize: mdTextSize,
    shape: 'ellipse',
    children: [ // Should `children` be thought of as `data`. The `chldren` field name is used to imply this can be eith a series of liner data points or a series of relationally nested data objects.
      {
        name: 'Will',
        id: 'will',
        parent: 'defense_allocation',
        centerX: 28,
        centerY: 35,
        ...defenceCommon,
      },
      {
        name: 'Disabilty Insurance',
        id: 'disability_insurance',
        parent: 'defense_allocation',
        centerX: 36,
        centerY: 38.5,
        ...defenceCommon,
      },
      {
        name: 'Long Term Care',
        id: 'long_term_care',
        parent: 'defense_allocation',
        centerX: 66,
        centerY: 38.5,
        ...defenceCommon,
      },
      {
        name: 'Term Insurance',
        id: 'term_insurance',
        parent: 'defense_allocation',
        centerX: 74,
        centerY: 35,
        ...defenceCommon,
      },
    ]
  },
  {
    name: 'Offense Allocation',
    id: 'offense_allocation',
    shape: 'ellipse',
    parent: '',
    centerX: 51,
    centerY: 48,
    radiusX: 9,
    radiusY: 1.8,
    visible: true,
    zoom: { scale: 1.5 },
    color: {
      bg: offenseColors.parent.bg
    },
    fields: [],
    textSize: 0.5,
    children: [
      {
        name: 'Short Term Money',
        id: 'short_term_money',
        shape: 'labelGroup',
        parent: 'offense_allocation',
        fields: [],
        centerX: -25,
        centerY: 57,
        width: 18,
        height: 14,
        textX: 33,
        textY: 57,
        radiusX: 6.5,
        radiusY: 6.5,
        rotate: -45,
        color: {
          bg: offenseColors.shortTerm.bg,
          stroke: offenseColors.shortTerm.stroke
        },
        textSize: smTextSize,
        zoom: { scale: 0.5 },
        children: [
          {
            name: 'Cash Equivalents',
            id: 'cash_equivalents',
            parent: 'short_term_money',
            centerX: 33,
            centerY: 53,
            ...shortTermCommon
          },
          {
            name: 'Mortgage',
            id: 'mortgage',
            parent: 'short_term_money',
            centerX: 38.5,
            centerY: 56.5,
            ...shortTermCommon
          },
          {
            name: 'Liabilities/Debt',
            id: 'liabilities_debt',
            parent: 'short_term_money',
            centerX: 32,
            centerY: 60.5,
            ...shortTermCommon
          },
        ]
      },
      {
        name: 'Mid Term Money',
        id: 'mid_term_money',
        parent: 'offense_allocation',
        shape: 'ellipse',
        fields: [],
        centerX: 50.5,
        centerY: 60,
        radiusX: 7,
        radiusY: 8,
        visible: false,
        color: {
          bg: offenseColors.midTerm.bg,
          stroke: offenseColors.midTerm.stroke
        },
        textSize: smTextSize,
        zoom: { scale: zoomScaleChild1 },
        children: [
          {
            name: 'UTMA\'s',
            id: 'utmas',
            parent: 'mid_term_money',
            centerX: 47.5,
            centerY: 63,
            ...midTermCommon
          },
          {
            name: '529 Plan',
            id: 'plan_529',
            parent: 'mid_term_money',
            centerX: 50.5,
            centerY: 56.5,
            ...midTermCommon
          },
          {
            name: 'Investment Account',
            id: 'investment_account',
            parent: 'mid_term_money',
            centerX: 53.5,
            centerY: 63,
            ...midTermCommon
          },
        ]
      },
      {
        name: 'Long Term Money',
        id: 'long_term_money',
        parent: 'offense_allocation',
        shape: 'radialGroup',
        fields: [],
        centerX: 79,
        centerY: -16,
        width: 20,
        height: 17,
        textX: 68,
        textY: 58,
        radiusX: 7.5,
        radiusY: 7.5,
        rotate: 45,
        visible: false,
        color: {
          bg: offenseColors.longTerm.bg,
          stroke: offenseColors.longTerm.stroke
        },
        textSize: smTextSize,
        zoom: { scale: 1.5 },
        children: [
          {
            name: 'IRA ROTH',
            id: 'ira_roth',
            parent: 'long_term_money',
            centerX: 65,
            centerY: 52.5,
            ...longTermCommon
          },
          {
            name: 'Cash Value Life',
            id: 'cash_value_life',
            parent: 'long_term_money',
            centerX: 62,
            centerY: 58,
            ...longTermCommon
          },
          {
            name: '401_K',
            id: 'k_401',
            parent: 'long_term_money',
            centerX: 66.5,
            centerY: 62,
            ...longTermCommon
          },
          {
            name: 'Annuity',
            id: 'annuity',
            parent: 'long_term_money',
            centerX: 72,
            centerY: 64,
            ratio,
            ...longTermCommon
          },
          {
            name: 'Stock option',
            id: 'stock_option',
            parent: 'long_term_money',
            centerX: 75,
            centerY: 60.5,
            ratio,
            ...longTermCommon
          },
          {
            name: 'Investment Real Estate',
            id: 'investment_real_estate',
            parent: 'long_term_money',
            centerX: 75,
            centerY: 56,
            ratio,
            ...longTermCommon
          },
          {
            name: 'Deffered Comp',
            id: 'deffered_comp',
            parent: 'long_term_money',
            centerX: 71.75,
            centerY: 52.75,
            ratio,
            ...longTermCommon
          }
        ]
      }
    ]
  }
];

// Put values that weren't specified in JSON
const handle = function (obj, depth = 0) {
    let value
    for (let key in obj) {
        value = obj[key]
        value.depth = depth
        handleZoomProperty(value)
        if (!value.children) value.children = []
        if (value.children.length > 0) handle(value.children, depth + 1)
    }
}

const handleZoomProperty = function (value) {
    if (!value.zoom) value.zoom = {}
    if (!value.zoom.x) value.zoom.x = 0.5
    if (!value.zoom.y) value.zoom.y = 0.5
    if (!value.zoom.scale) value.zoom.scale = 1
}

handle(ret)

export default ret;
