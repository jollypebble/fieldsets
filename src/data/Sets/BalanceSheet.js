/**
 * This is our balance sheet set.
 * For top level sets, assign parent to container id it belongs to.
 */
const BalanceSheet = [
  {
    id: 'balance_sheet',
    name: 'Balance Sheet',
    parent: 'econcircle-balancesheet',
    children: [
      {
        id: 'non_qualified',
        name: 'Non-Qualiified',
        parent: 'balance_sheet',
        children: [
          {
            id: 'non_qualified_totals',
            name: 'Total',
            parent: 'non_qualified'
          },
          {
            id: 'non_qualified_individual',
            name: 'Accounts',
            parent: 'non_qualified'
          }
        ]
      },
      {
        id: 'qualified',
        name: 'Qualiified',
        parent: 'balance_sheet',
        children: [
          {
            id: 'qualified_totals',
            name: 'Total',
            parent: 'qualified'
          },
          {
            id: 'qualified_individual',
            name: 'Accounts',
            parent: 'qualified'
          }
        ]
      }
    ]
  }
];
export default BalanceSheet;
