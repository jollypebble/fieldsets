import React from 'react';
import { TextField } from '@material-ui/core';

const data = [
  {
    title: 'Non Qualified',
    'Non Qualified': [
      { key: 'Cash & Equivalents', value: '500000' },
      { key: 'NMIS/GE/UBS/Merrill', value: '1013926' },
      { key: 'CPAF accounts', value: '17072057' }
    ]
  },
  {
    title: 'Qualified',
    Qualified: [
      { key: 'IRAs', value: '500000' },
      { key: 'Roth(s)', value: '1013926' }
    ],
  },
  {
    title: 'Annuities',
    Annuities: [
      { key: 'Annuities', value: '53062' }
    ]
  },
  {
    title: 'Cash Value Life',
    'Cash Value Life': [
      { key: 'Cash value Life', value: '39000' }
    ]
  },
  {
    title: 'Properties',
    Properties: [
      { key: 'Properties', value: '620000' }
    ]
  },
  {
    title: 'Mortgage(s)',
    'Mortgage(s)': [
      { key: 'Personal Loan(s)', value: '20244' },
      { key: 'Liability', value: '25000' },
      { key: 'Liability #2', value: '0' },
      { key: 'Total Liabilities', value: '265636' }
    ],
  },
];

export default class BalanceSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataValues: data,
      AllTotalAmount: 0,
    };
  }

  componentDidMount() {
    this.updateTotalAmount();
  }

  /**
   * Handle form elements's values change
   * @param {*} event
   */
  handleValueChange = (event, index, parentIndex) => {
    if (event.target.value !== '' && event.target.value >= 0) {
      const { dataValues } = this.state;
      dataValues[parentIndex][event.target.name][index].value = event.target.value;
      this.setState({ dataValues });
      this.updateTotalAmount();
    }
  }

  updateTotalAmount = () => {
    let TotalAmount = 0;
    data.map((item) => {
      const iterateTitle = item.title;
      return (
        item[iterateTitle].forEach((subItem) => {
          TotalAmount += parseInt(subItem.value, 10);
        }));
    });
    this.setState({ AllTotalAmount: TotalAmount });
  }

  render() {
    return (
      <div className="drawer-sheet balanceSheetContainer">
        {
          this.state.dataValues.map((item, i) => {
            const iterateTitle = item.title;
            let totalAmount = 0;
            return (
              item[iterateTitle].length > 1 ?
                <div key={ i }>
                  <div className="mainHeadContainer">
                    <div className="mainHeadTitle headerText">
                      <h4 className="amountWrap">
                        {iterateTitle}:
                      </h4>
                    </div>
                  </div>
                  {item[iterateTitle].map((subItem, i1) => {
                    totalAmount += parseInt(subItem.value, 10);
                    return (
                      <div className="dataFields" key={ i1 }>
                        <div className="dataTitle">
                          {subItem.key}
                        </div>
                        <div className="dataValue">
                          <h4 className="amountWrap">
                            $<TextField
                              type="number"
                              hintText={ iterateTitle }
                              name={ iterateTitle }
                              onChange={ e => this.handleValueChange(e, i1, i) }
                              value={ subItem.value }
                            />
                          </h4>
                        </div>
                      </div>
                    );
                  })
                  }
                  <div className="dataFields">
                    <div className="dataTitle">
                      Total Amount:
                    </div>
                    <div className="dataValue totalAmount">
                      <h4 className="amountWrap">
                        $<TextField
                          hintText="Total Amount"
                          name="Total Amount"
                          value={ totalAmount }
                        />
                      </h4>
                    </div>
                  </div>
                </div>
                :
                <div className="mainHeadContainer" key={ i }>
                  <div className="mainHeadTitle headerText headerSingleTitle">
                    <h4 className="amountWrap">
                      {item.title}:
                    </h4>
                  </div>
                  <div className="mainHeadValue headerText headerSingleValue">
                    <h4 className="amountWrap">
                      $<TextField
                        hintText={ iterateTitle }
                        name={ iterateTitle }
                        onChange={ e => this.handleValueChange(e, 0, i) }
                        value={ item[iterateTitle][0].value }
                      />
                    </h4>
                  </div>
                </div>
            );
          })
        }

        <div className="dataFields">
          <div className="dataTitle">
            <h4 className="amountWrap">
              TOTAL NET WORTH:
            </h4>
          </div>
          <div className="dataValue totalAmount">
            <h4 className="amountWrap">
              $<TextField
                hintText="Total Amount"
                name="Total Amount"
                value={ this.state.AllTotalAmount }
              />
            </h4>
          </div>
        </div>
      </div>
    );
  }
}
