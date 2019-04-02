/**
  Type "Color" - is an usual object with props "bg" and "text" that determine color of node elements. E.g. color: { bg: '#5fc6f5', text: '#f5fcff' }
  Type "ZoomScale" - an object that shows how to zoom our sheet when we click on particular node. All props are optional.
    Object example: { scale: 1.5, x: 0.5, y: 0.5 }
    - scale: multiplier for the standard scale
    - x and y: values beetwen 0 and 1 (default 0.5) where 0 is 0 and 1 is max screen size (x=1 === x=window.innerWidth, same for y)

  @param {ZoomScale} zoom Explaines how exactly we scale the sheet when we click on the node
  @param {Color} color If it's specified then a node ignores "childrenColor" property from its parent
*/

const zoomScaleChild1 = 1
const zoomScaleChild2 = 1

let ret = [
  {
    name: 'Monthly Contribution',
    id: 'monthly_contribution',
    parent: '',
    shape: 'rectangle',
    fields: [],
    centerX: 10,
    centerY: 25,
    textX: 15,
    textY: 27.5,
    width: 10,
    height: 5,
    visible: true,
    children: []
  },
  {
    name: 'Lump Sums',
    id: 'lump_sums',
    parent: '',
    shape: 'rectangle',
    fields: [],
    centerX: 40,
    centerY: 25,
    textX: 45,
    textY: 27.5,
    width: 10,
    height: 5,
    visible: true,
    children: []
  },
  {
    name: 'Net Worth',
    id: 'net_worth',
    parent: '',
    shape: 'ellipse',
    fields: [],
    centerX: 30.5,
    centerY: 42.5,
    radiusX: 3.5,
    radiusY: 1.5,
    visible: true,
    children: []
  },
  {
    name: 'Defense Allocation',
    id: 'defense_allocation',
    parent: '',
    shape: 'ellipse',
    fields: [],
    centerX: 30.5, // X,Y represent points on a plane to map the current data to. If we wanted to get fancy we could rework this to include Z coordinates, but I don't see that showing a need for any time soon. If it does tracking down how these guys are used is a good place to start.
    centerY: 37,
    radiusX: 3.5,
    radiusY: 1.5,
    visible: true,
    zoom: { y: 0.75 },
    children: [ // Should `children` be thought of as `data`. The `chldren` field name is used to imply this can be eith a series of liner data points or a series of relationally nested data objects.
      {
        name: 'Will',
        id: 'will',
        parent: 'defense_allocation',
        shape: 'circle',
        fields: [],
        centerX: 23,
        centerY: 36.5,
        visible: false,
        zoom: { scale: zoomScaleChild1 },
        children: []
      },
      {
        name: 'Disabilty Insurance',
        id: 'disability_insurance',
        parent: 'defense_allocation',
        shape: 'circle',
        fields: [],
        centerX: 28,
        centerY: 31.5,
        visible: false,
        zoom: { scale: zoomScaleChild1 },
        children: []
      },
      {
        name: 'Long Term Care',
        id: 'long_term_care',
        parent: 'defense_allocation',
        shape: 'circle',
        fields: [],
        centerX: 33,
        centerY: 31.5,
        visible: false,
        zoom: { scale: zoomScaleChild1 },
        children: []
      },
      {
        name: 'Term Insurance',
        id: 'term_insurance',
        parent: 'defense_allocation',
        shape: 'circle',
        fields: [],
        centerX: 38,
        centerY: 36.5,
        visible: false,
        zoom: { scale: zoomScaleChild1 },
        children: []
      },
    ]
  },
  {
    name: 'Offense Allocation',
    id: 'offense_allocation',
    shape: 'ellipse',
    parent: '',
    fields: [],
    centerX: 30.5,
    centerY: 48,
    radiusX: 3.5,
    radiusY: 1.5,
    visible: true,
    zoom: { y: 0.25 },
    children: [
      {
        name: 'Short Term Money',
        id: 'short_term_money',
        shape: 'labelgroup',
        parent: 'offense_allocation',
        fields: [],
        centerX: 24.5,
        centerY: 49.5,
        visible: false,
        zoom: { scale: zoomScaleChild1,  x: 0.7, y: 0.3 },
        children: [
          {
            name: 'Cash Equivalents',
            id: 'cash_equivalents',
            parent: 'short_term_money',
            shape: 'circle',
            fields: [],
            centerX: 20.5,
            centerY: 49.5,
            visible: false,
            zoom: { scale: zoomScaleChild2 },
            children: []
          },
          {
            name: 'Mortgage',
            id: 'mortgage',
            parent: 'short_term_money',
            shape: 'circle',
            fields: [],
            centerX: 21.5,
            centerY: 52.5,
            visible: false,
            zoom: { scale: zoomScaleChild2 },
            children: []
          },
          {
            name: 'Liabilities/Debt',
            id: 'liabilities_debt',
            parent: 'short_term_money',
            shape: 'circle',
            fields: [],
            centerX: 24.5,
            centerY: 53.5,
            visible: false,
            zoom: { scale: zoomScaleChild2 },
            children: []
          },
        ]
      },
      {
        name: 'Mid Term Money',
        id: 'mid_term_money',
        parent: 'offense_allocation',
        shape: 'labelgroup',
        fields: [],
        centerX: 30.5,
        centerY: 53.5,
        visible: false,
        zoom: { scale: zoomScaleChild1,  y: 0.3 },
        children: [
          {
            name: 'UTMA\'s',
            id: 'utmas',
            parent: 'mid_term_money',
            shape: 'circle',
            fields: [],
            centerX: 27.5,
            centerY: 56,
            visible: false,
            zoom: { scale: zoomScaleChild2 },
            children: []
          },
          {
            name: '529 Plan',
            id: 'plan_529',
            parent: 'mid_term_money',
            shape: 'circle',
            fields: [],
            centerX: 30.5,
            centerY: 57.5,
            visible: false,
            zoom: { scale: zoomScaleChild2 },
            children: []
          },
          {
            name: 'Investment Account',
            id: 'investment_account',
            parent: 'mid_term_money',
            shape: 'circle',
            fields: [],
            centerX: 33.5,
            centerY: 56,
            visible: false,
            zoom: { scale: zoomScaleChild2 },
            children: []
          },
        ]
      },
      {
        name: 'Long Term Money',
        id: 'long_term_money',
        parent: 'offense_allocation',
        shape: 'radialgroup',
        fields: [],
        centerX: 36.5,
        centerY: 49.5,
        visible: false,
        zoom: { scale: zoomScaleChild1,  x: 0.3, y: 0.3 },
        children: [
          {
            name: 'IRA ROTH',
            id: 'ira_roth',
            parent: 'long_term_money',
            fields: [],
            centerX: 36.5,
            centerY: 53.5,
            visible: false,
            zoom: { scale: zoomScaleChild2 },
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
            zoom: { scale: zoomScaleChild2 },
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
            zoom: { scale: zoomScaleChild2 },
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
            zoom: { scale: zoomScaleChild2 },
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
            zoom: { scale: zoomScaleChild2 },
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
            zoom: { scale: zoomScaleChild2 },
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
            zoom: { scale: zoomScaleChild2 },
            children: []
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
