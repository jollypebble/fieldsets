// Values not explicity set here are backfilled using the graphql fragment defaults found at 'graphql/fragments/defaults';

const parentDefaultAttrs = {
  radiusX: 75,
  radiusY: 16,
};

const defenseDefaultAttrs = {
  ratio: 1.2,
  textSize: 0.45,
  radius: 26
};

const offenseDefaultAttrs = {
  ratio: 1.7,
  textSize: 0.28,
  radius: 17
};

const offenseSmallAttrs = {
  ratio: 1.4,
  textSize: 0.3,
  radius: 15
};

const MetaData =  [
  {
    id: 'econcircle-app',
    type: 'diagram',
    data: {
      setview: 'CircleDiagram',
      focus: {
        focusID: 'net_worth'
      }
    }
  },
  {
    id: 'monthly_contribution',
    type: 'fieldset',
    data: {
      setview: 'Rectangle',
      center: { x: 720, y: 240 },
      attributes: {
        textSize: 0.6,
        width: 120,
        height: 36
      }
    }
  },
  {
    id: 'lump_sums',
    type: 'fieldset',
    data: {
      setview: 'Rectangle',
      center: { x: 900, y: 240 },
      attributes: {
        textSize: 0.6,
        width: 120,
        height: 36
      }
    }
  },
  {
    id: 'defense_allocation',
    type: 'fieldset',
    data: {
      setview: 'ellipse',
      center: { x: 880, y: 390 },
      attributes: {
        ...parentDefaultAttrs
      }
    }
  },
  {
    id: 'will',
    type: 'fieldset',
    data: {
      setview: 'Circle',
      center: { x: 730, y: 375 },
      attributes: {
        ...defenseDefaultAttrs
      }
    }
  },
  {
    id: 'disability_insurance',
    type: 'fieldset',
    data: {
      setview: 'Circle',
      center: { x: 818, y: 332 },
      attributes: {
        ...defenseDefaultAttrs
      },
    }
  },
  {
    id: 'long_term_care',
    type: 'fieldset',
    data: {
      setview: 'Circle',
      center: { x: 940, y: 332 },
      attributes: {
        ...defenseDefaultAttrs
      }
    }
  },
  {
    id: 'term_insurance',
    type: 'fieldset',
    data: {
      setview: 'Circle',
      center: { x: 1030, y: 375 },
      attributes: {
        ...defenseDefaultAttrs
      }
    }
  },
  {
    id: 'offense_allocation',
    type: 'fieldset',
    data: {
      setview: 'ellipse',
      center: { x: 880, y: 465 },
      attributes: {
        ...parentDefaultAttrs
      }
    }
  },
  {
    id: 'short_term_money',
    type: 'fieldset',
    data: {
      setview: 'Label',
      center: { x: 725, y: 465 },
      attributes: {
        textSize: 1
      },
    }
  },
  {
    id: 'cash_equivalents',
    type: 'fieldset',
    data: {
      setview: 'Circle',
      center: { x: 690, y: 510 },
      attributes: {
        ...offenseDefaultAttrs
      }
    }
  },
  {
    id: 'mortgage',
    type: 'fieldset',
    data: {
      setview: 'Circle',
      center: { x: 770, y: 500 },
      attributes: {
        ...offenseDefaultAttrs
      }
    }
  },
  {
    id: 'liabilities_debt',
    type: 'fieldset',
    data: {
      setview: 'Circle',
      center: { x: 740, y: 570 },
      attributes: {
        ...offenseDefaultAttrs
      }
    }
  },
  {
    id: 'mid_term_money',
    type: 'fieldset',
    data: {
      setview: 'Label',
      center: { x: 890, y: 630 },
      attributes: {
        textSize: 1
      }
    }
  },
  {
    id: 'utmas',
    type: 'fieldset',
    data: {
      setview: 'Circle',
      center: { x: 885, y: 525 },
      attributes: {
        ...offenseDefaultAttrs
      }
    }
  },
  {
    id: 'plan_529',
    type: 'fieldset',
    data: {
      setview: 'Circle',
      center: { x: 845, y: 580 },
      attributes: {
        ...offenseDefaultAttrs
      }
    }
  },
  {
    id: 'investment_account',
    type: 'fieldset',
    data: {
      setview: 'Circle',
      center: { x: 925, y: 580 },
      attributes: {
        ...offenseDefaultAttrs
      }
    }
  },
  {
    id: 'long_term_money',
    type: 'fieldset',
    data: {
      setview: 'Label',
      center: { x: 1040, y: 455 },
      attributes: {
        textSize: 1
      },
    }
  },
  {
    id: 'cash_value_life',
    type: 'fieldset',
    data: {
      setview: 'Circle',
      center: { x: 980, y: 490 },
      attributes: {
        ...offenseDefaultAttrs
      }
    }
  },
  {
    id: 'ira_roth',
    type: 'fieldset',
    data: {
      setview: 'Circle',
      center: { x: 1010, y: 544 },
      attributes: {
        ...offenseDefaultAttrs
      }
    }
  },
  {
    id: 'k_401',
    type: 'fieldset',
    data: {
      setview: 'Circle',
      center: { x: 1045, y: 490 },
      attributes: {
        ...offenseDefaultAttrs
      }
    }
  },
  {
    id: 'annuity',
    type: 'fieldset',
    data: {
      setview: 'Circle',
      center: { x: 1032, y: 592 },
      attributes: {
        ...offenseSmallAttrs
      }
    }
  },
  {
    id: 'stock_option',
    type: 'fieldset',
    data: {
      setview: 'Circle',
      center: { x: 1069, y: 560 },
      attributes: {
        ...offenseSmallAttrs
      }
    }
  },
  {
    id: 'investment_real_estate',
    type: 'fieldset',
    data: {
      setview: 'Circle',
      center: { x: 1095, y: 520 },
      attributes: {
        ...offenseSmallAttrs
      }
    }
  },
  {
    id: 'deffered_comp',
    type: 'fieldset',
    data: {
      setview: 'Circle',
      center: { x: 1106, y: 474 },
      attributes: {
        ...offenseSmallAttrs
      }
    }
  },
  {
    id: 'net_worth',
    type: 'fieldset',
    data: {
      setview: 'GlowingEllipse',
      center: { x: 880, y: 428 },
      zoom: {
        scale: 2.3
      },
      attributes: {
        ...parentDefaultAttrs,
        path: 'M629,430.638262 L 878.611509,399.411159 L1126.163759,425.812255 L 878.611509 461.865365 z'
      }
    }
  },
  {
    id: 'net_worth_total',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'lump_sums_total',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'defense_allocation_monthly_total',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'will_status',
    type: 'field',
    data: {
      alwaysDisplay: true,
      options: {}
    }
  },
  {
    id: 'disability_insurance_monthly_benefit',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'disability_insurance_premium',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'long_term_care_daily_benefit',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'long_term_care_premium',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'term_insurance_benefit',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'term_insurance_premium',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'offense_allocation_monthly_total',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'cash_equivalents_value',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'mortgage_value',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'liabilities_debt_value',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'utmas_value',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'plan_529_value',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'plan_529_individal_value',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'investment_account_value',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'cash_value_life_value',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'ira_roth_value',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'k_401_value',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'annuity_value',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'stock_option_value',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'investment_real_estate_value',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  },
  {
    id: 'deffered_comp_value',
    type: 'field',
    data: {
      alwaysDisplay: true
    }
  }
];

// Backfill our data.
// const MetaData = DataUtils.backfillSetData(data, fragmentDefaults);
export default MetaData;
