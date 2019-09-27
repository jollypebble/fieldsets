// import DataUtils from 'components/Core/DataCache/utils/DataUtils';
// import { fragmentDefaults } from 'graphql/fragments/defaults';

const parentDefaultAttrs = {
  radiusX: 75,
  radiusY: 16,
};

const defenseDefaultAttrs = {
  ratio: 1.2,
  textSize: 0.45,
  radius: 80
};

const offenseDefaultAttrs = {
  ratio: 1.7,
  textSize: 0.28,
  radius: 75
};

const offenseSmallAttrs = {
  ratio: 1.4,
  textSize: 0.3,
  radius: 65
};

const MetaData =  [
  {
    id: 'econcircle-app',
    type: 'diagram',
    data: {
      setview: 'CircleDiagram',
      focus: {
        focusID: 'networth',
        type: 'fieldset'
      },
      center: { x: 880, y: 428 },
      dialog: null,
      attributes: null
    }
  },
  {
    id: 'monthly_contribution',
    type: 'fieldset',
    data: {
      setview: 'Rectangle',
      center: { x: 720, y: 240 },
      attributes: {
        textX: 780,
        textY: 258,
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
        textX: 960,
        textY: 258,
        textSize: 0.6,
        width: 120,
        height: 36
      }
    }
  },
  {
    id: 'net_worth',
    type: 'fieldset',
    data: {
      setview: 'radialGroup',
      center: { x: 880, y: 428 },
      attributes: {
        path: 'M629,430.638262 L 878.611509,399.411159 L1126.163759,425.812255 L 878.611509 461.865365 z',
        gradientId: 'netWorth',
      }
    }
  },
  {
    id: 'defense_allocation',
    type: 'fieldset',
    data: {
      setview: 'radialGroup',
      center: { x: 880, y: 384 },
      attributes: {
        path: 'M626,430.638262 L875.611509,399.411159 L1123.16376,425.812255 C1210.57272,435.134296 1151.09059,506.664739 1123.3138,426.146136 C1095.53701,345.627533 995.302104,286 875.905688,286 C754.089207,286 652.21888,348.069231 626.898289,431.067696',
        gradientId: 'defenceAllocation',
        textSize: 0.5
      }
    }
  },
  {
    id: 'will',
    type: 'fieldset',
    data: {
      center: { x: 730, y: 375 },
      attributes: {
        ...defenseDefaultAttrs,
        textY: 326
      }
    }
  },
  {
    id: 'disability_insurance',
    type: 'fieldset',
    data: {
      center: { x: 818, y: 332 },
      attributes: {
        ...defenseDefaultAttrs,
        textY: 326
      },
    }
  },
  {
    id: 'long_term_care',
    type: 'fieldset',
    data: {
      center: { x: 940, y: 332 },
      attributes: {
        ...defenseDefaultAttrs,
        textY: 326
      }
    }
  },
  {
    id: 'term_insurance',
    type: 'fieldset',
    data: {
      center: { x: 1030, y: 375 },
      attributes: {
        ...defenseDefaultAttrs,
        textY: 370
      }
    }
  },
  {
    id: 'offense_allocation',
    type: 'fieldset',
    data: {
      center: { x: 880, y: 465 }
    }
  },
  {
    id: 'short_term_money',
    type: 'fieldset',
    data: {
      setview: 'radialGroup',
      center: { x: 725, y: 465 },
      attributes: {
        path: 'M758.003055,634 C735.033876,625.238795 714.128139,614.002703 695.954648,600.77872 C649.83742,567.221412 621.314391,520.863156 621.314391,469.661898 C621.314391,456.029381 623.336416,442.740188 627.174184,429.944527 C631.011952,417.148866 612.361949,428.791811 626.172556,430.118997 L876,454.127187 L758.079091,633.200035',
        textSize: 1,
        gradientId: 'shortTermMoney'
      },
    }
  },
  {
    id: 'cash_equivalents',
    type: 'fieldset',
    data: {
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
      setview: 'radialGroup',
      center: { x: 890, y: 630 },
      attributes: {
        path: 'M756.882797,634.106114 L876,455 L1010.00201,628.173577 C1036.03727,661.510959 1049.72019,610.1111 1010.47324,627.909784 C971.226293,645.708467 924.802732,656 875.054149,656 C832.05672,656 791.5431,648.312173 756,634.734206',
        textSize: 1,
        gradientId: 'midTermMoney'
      }
    }
  },
  {
    id: 'utmas',
    type: 'fieldset',
    data: {
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
      setview: 'radialGroup',
      center: { x: 1040, y: 455 },
      attributes: {
        path: 'M1123.21486,425 L876,454.061867 L1010.99136,628.717987 C1058.76391,690.527632 938.872803,661.542717 1010.95587,628.683133 C1083.03893,595.823548 1131,537.367903 1131,470.729702 C1131,455.17425 1128.38659,440.064667 1123.463,425.622449',
        textSize: 1,
        gradientId: 'longTermMoney'
      },
    }
  },
  {
    id: 'cash_value_life',
    type: 'fieldset',
    data: {
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
      center: { x: 1106, y: 474 },
      attributes: {
        ...offenseSmallAttrs
      }
    }
  },
  {
    id: 'offense_parent',
    type: 'fieldset',
    data: {
      setview: 'ellipse',
      center: { x: 880, y: 465 },
      attributes: {
        ...parentDefaultAttrs,
        textY: 468
      }
    }
  },
  {
    id: 'defense_parent',
    type: 'fieldset',
    data: {
      setview: 'ellipse',
      center: { x: 880, y: 390 },
      attributes: {
        ...parentDefaultAttrs,
        textY: 393
      }
    }
  },
  {
    id: 'net_worth',
    type: 'fieldset',
    data: {
      setview: 'ellipse',
      center: { x: 880, y: 428 },
      attributes: {
        ...parentDefaultAttrs
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
