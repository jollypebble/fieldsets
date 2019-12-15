const CircleDiagram = [
  {
    id: 'monthly_contribution_total',
    name: 'Total',
    value: 0,
    type: 'currency',
    fieldsets: ['monthly_contribution']
  },
  {
    id: 'lump_sums_total',
    name: 'Total',
    value: 0,
    type: 'currency',
    fieldsets: ['lump_sums']
  },
  {
    id: 'defense_allocation_monthly_total',
    name: 'Monthly Total',
    value: 0,
    type: 'currency',
    fieldsets: ['defense_allocation']
  },
  {
    id: 'will_status',
    name: 'Status',
    value: 'None',
    options:[ 'None', 'Complete', 'Incomplete', 'Needs Update' ],
    type: 'select',
    fieldsets: ['will']
  },
  {
    id: 'disability_insurance_monthly_benefit',
    name: 'Monthly Benefit',
    value: 0,
    type: 'currency',
    fieldsets: ['disability_insurance']
  },
  {
    id: 'disability_insurance_premium',
    name: 'Premium',
    value: 0,
    type: 'formula',
    callback: 'sum',
    fieldsets: ['disability_insurance'],
  },
  {
    id: 'long_term_care_daily_benefit',
    name: 'Daily Benefit',
    value: 0,
    type: 'currency',
    fieldsets: ['long_term_care']
  },
  {
    id: 'long_term_care_premium',
    name: 'Premium',
    value: 0,
    type: 'currency',
    callback: 'sum',
    fieldsets: ['long_term_care']
  },
  {
    id: 'term_insurance_benefit',
    name: 'Benefit',
    value: 0,
    type: 'currency',
    fieldsets: ['term_insurance']
  },
  {
    id: 'term_insurance_premium',
    name: 'Premium',
    description: '',
    value: 0,
    type: 'currency',
    callback: 'sum',
    fieldsets: ['term_insurance'],
  },
  {
    id: 'offense_allocation_monthly_total',
    name: 'Monthly Total',
    value: 0,
    type: 'currency',
    fieldsets: ['offense_allocation']
  }
];

export default CircleDiagram;
