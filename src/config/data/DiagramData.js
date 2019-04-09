/**
  Type "Color" - is an usual object with props "bg" and "text" that determine color of node elements. E.g. color: { bg: '#5fc6f5', text: '#f5fcff' }
  Type "ZoomScale" - an object that shows how to zoom our sheet when we click on particular node. All props are optional.
    Object example: { scale: 1.5, x: 0.5, y: 0.5 }
    - scale: multiplier for the standard scale
    - x and y: values beetwen 0 and 1 (default 0.5) where 0 is 0 and 1 is max screen size (x=1 === x=window.innerWidth, same for y)

  @param {ZoomScale} zoom Explaines how exactly we scale the sheet when we click on the node
  @param {Color} color If it's specified then a node ignores "childrenColor" property from its parent
*/

const zoomScaleChild = 1;
const textSize = 0.4;
const ratio = 0.7;

const defaults = {
  parent: '',
  fields: [],
  children: [],
  shape: 'circle',
  /*
  display: {
    shape: 'circle',
    attributes: {},
    visible: true,
    zoom: { scale: zoomScaleChild },
    class: '',
  },
  */
  visible: true,
  zoom: { scale: zoomScaleChild },
  textSize: textSize ,
  ratio: ratio,
}

let data = [
  {
    ...defaults,
    name: 'Monthly Contribution',
    id: 'monthly_contribution',
    shape: 'rectangle',
    centerX: 37.5,
    centerY: 28,
    radiusX: 0,
    radiusY: 0,
    textX: 42.5,
    textY: 30.5,
    width: 10,
    height: 4,
    textSize: 0.6
  },
  {
    ...defaults,
    name: 'Lump Sums',
    id: 'lump_sums',
    shape: 'rectangle',
    centerX: 54,
    centerY: 28,
    radiusX: 0,
    radiusY: 0,
    textX: 59,
    textY: 30.5,
    width: 10,
    height: 4,
    textSize: 0.6
  },
  {
    ...defaults,
    name: 'Net Worth',
    id: 'net_worth',
    shape: 'ellipse',
    centerX: 51,
    centerY: 42.5,
    radiusX: 9,
    radiusY: 1.8,
    textSize: 0.6
  },
  {
    ...defaults,
    name: 'Defense Allocation',
    id: 'defense_allocation',
    centerX: 51, // X,Y represent points on a plane to map the current data to. If we wanted to get fancy we could rework this to include Z coordinates, but I don't see that showing a need for any time soon. If it does tracking down how these guys are used is a good place to start.
    centerY: 37,
    radiusX: 9,
    radiusY: 1.8,
    zoom: { y: 0.75 },
    textSize: 0.6,
    ratio: 0.8,
    shape: 'ellipse',
    children: [ // Should `children` be thought of as `data`. The `chldren` field name is used to imply this can be eith a series of liner data points or a series of relationally nested data objects.
      {
        ...defaults,
        name: 'Will',
        id: 'will',
        parent: 'defense_allocation',
        centerX: 28,
        centerY: 35,
        textSize: 0.6,
        ratio: 0.8,
      },
      {
        ...defaults,
        name: 'Disabilty Insurance',
        id: 'disability_insurance',
        parent: 'defense_allocation',
        centerX: 36,
        centerY: 38.5,
        textSize: 0.6,
        ratio: 0.8,
      },
      {
        ...defaults,
        name: 'Long Term Care',
        id: 'long_term_care',
        parent: 'defense_allocation',
        centerX: 66,
        centerY: 38.5,
        textSize: 0.6,
        ratio: 0.8,
      },
      {
        ...defaults,
        name: 'Term Insurance',
        id: 'term_insurance',
        parent: 'defense_allocation',
        centerX: 74,
        centerY: 35,
        textSize: 0.6,
        ratio: 0.8,
      },
    ]
  },
  {
    ...defaults,
    name: 'Offense Allocation',
    id: 'offense_allocation',
    shape: 'ellipse',
    centerX: 51,
    centerY: 48,
    radiusX: 9,
    radiusY: 1.8,
    zoom: { scale: 1.5 },
    textSize: 0.5,
    children: [
      {
        ...defaults,
        name: 'Short Term Money',
        id: 'short_term_money',
        shape: 'labelGroup',
        parent: 'offense_allocation',
        fields: [],
        centerX: 24,
        centerY: 50,
        textX: 32,
        textY: 57,
        width: 18,
        height: 14,
        radiusX: 6.5,
        radiusY: 6.5,
        rotate: '-45 33 57',
        textSize: textSize,
        zoom: { scale: zoomScaleChild },
        children: [
          {
            ...defaults,
            name: 'Cash Equivalents',
            id: 'cash_equivalents',
            parent: 'short_term_money',
            centerX: 32,
            centerY: 53,
          },
          {
            ...defaults,
            name: 'Mortgage',
            id: 'mortgage',
            parent: 'short_term_money',
            centerX: 38,
            centerY: 56.5,
          },
          {
            ...defaults,
            name: 'Liabilities/Debt',
            id: 'liabilities_debt',
            parent: 'short_term_money',
            centerX: 31,
            centerY: 60.5,
          },
        ]
      },
      {
        ...defaults,
        name: 'Mid Term Money',
        id: 'mid_term_money',
        parent: 'offense_allocation',
        shape: 'ellipse',
        centerX: 50.5,
        centerY: 60,
        radiusX: 7,
        radiusY: 8,
        children: [
          {
            ...defaults,
            name: 'UTMA\'s',
            id: 'utmas',
            parent: 'mid_term_money',
            centerX: 47.5,
            centerY: 63,
            ratio: 0.95,
          },
          {
            ...defaults,
            name: '529 Plan',
            id: 'plan_529',
            parent: 'mid_term_money',
            centerX: 50.5,
            centerY: 56.5,
            ratio: 0.95,
          },
          {
            ...defaults,
            name: 'Investment Account',
            id: 'investment_account',
            parent: 'mid_term_money',
            centerX: 53.5,
            centerY: 63,
            ratio: 0.95,
          },
        ]
      },
      {
        ...defaults,
        name: 'Long Term Money',
        id: 'long_term_money',
        parent: 'offense_allocation',
        shape: 'radialGroup',
        centerX: 60,
        centerY: 49,
        width: 20,
        height: 17,
        textX: 69,
        textY: 57.5,
        radiusX: 7.5,
        radiusY: 7.5,
        zoom: { scale: 1.5 },
        rotate: '45 70 57',
        textSize: textSize,
        children: [
          {
            ...defaults,
            name: 'IRA ROTH',
            id: 'ira_roth',
            parent: 'long_term_money',
            centerX: 66.5,
            centerY: 51.5,
          },
          {
            ...defaults,
            name: 'Cash Value Life',
            id: 'cash_value_life',
            parent: 'long_term_money',
            centerX: 63.5,
            centerY: 57,
          },
          {
            ...defaults,
            name: '401_K',
            id: 'k_401',
            parent: 'long_term_money',
            centerX: 67.5,
            centerY: 61.5,
          },
          {
            ...defaults,
            name: 'Annuity',
            id: 'annuity',
            parent: 'long_term_money',
            centerX: 73,
            centerY: 63,
          },
          {
            ...defaults,
            name: 'Stock option',
            id: 'stock_option',
            parent: 'long_term_money',
            centerX: 76.5,
            centerY: 60,
          },
          {
            ...defaults,
            name: 'Investment Real Estate',
            id: 'investment_real_estate',
            parent: 'long_term_money',
            centerX: 76,
            centerY: 55.5,
          },
          {
            ...defaults,
            name: 'Deffered Comp',
            id: 'deffered_comp',
            parent: 'long_term_money',
            centerX: 73,
            centerY: 52,
          }
        ]
      }
    ]
  }
];

// Put values that weren't specified in JSON
const addDepth = function (obj, depth = 0) {
    for (let key in obj) {
      let value = obj[key];
      value.depth = depth;
      value = addZoom(value);
      if (value.children.length > 0) {
        value.children = addDepth(value.children, depth + 1);
      } else {
        value.children = [];
      }
      obj[key] = value;
    }

    return obj;
}

const addZoom = function (value) {
    if (!value.zoom) value.zoom = {};
    if (!value.zoom.x) value.zoom.x = 0.5;
    if (!value.zoom.y) value.zoom.y = 0.5;
    if (!value.zoom.scale) value.zoom.scale = 1;
    return value;
}
const diagram = addDepth(data, 0);
export default diagram;
