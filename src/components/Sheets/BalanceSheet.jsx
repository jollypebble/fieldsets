import React from 'react';

import TextField from '@material-ui/core/TextField';

const data = [
  {
    title: 'Non Qualified',
    'Non Qualified': [
      { key: 'Cash & Equivalents', value: '500000' },
      { key: 'NMIS/GE/UBS/Merrill', value: '1013926' },
      { key: 'CPAF accounts', value: '17072057' }
    ],
    total: '18585983'
  },
  {
    title: 'Qualified',
    Qualified: [
      { key: 'IRAs', value: '500000' },
      { key: 'Roth(s)', value: '1013926' }
    ],
    total: '1513926'
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
    total: '310880'
  },
];

export class BalanceSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataValues: data,
      totalAmount: 0,
    };
  }

  componentDidMount() {
    this.updateTotalAmount();
  }

  handleValueChange = (event, index, parentIndex) => {
    const { name, value } = event.target;

    if (value !== '' && value >= 0) {
      const { dataValues } = this.state;
      const parentItem = dataValues[parentIndex];
      dataValues[parentIndex] = {
        ...dataValues[parentIndex],
        total: parentItem.total - parseInt(parentItem[name][index].value) + parseInt(value),
      }
      dataValues[parentIndex][name][index].value = value;
      this.setState({ dataValues });
      this.updateTotalAmount();
    }
  }

  updateTotalAmount = () => {
    let amount = 0;
    data.map((item) => {
      const iterateTitle = item.title;
      return (
        item[iterateTitle].forEach((subItem) => {
          amount += parseInt(subItem.value, 10);
        }));
    });
    this.setState({ totalAmount: amount });
  }

  renderMultiItems = (data, index) => {
    const itemTitle = data.title;

    return (
      <div key={ index }>
        <div className="mainHeadContainer">
          <div className="mainHeadTitle headerText">{ itemTitle }</div>
          {data[itemTitle].map((item, i) => (
            <div className="dataFields" key={ i }>
              <div className="dataTitle">
                {item.key}
              </div>
              <div className="dataValue">
                $<TextField
                  type="number"
                  hintText={ itemTitle }
                  name={ itemTitle }
                  value={ item.value }
                  onChange={ e => this.handleValueChange(e, i, index) }
                />
              </div>
            </div>
          ))}
        </div>

        <div className="dataFields totalAmount">
          <div className="dataTitle">
            Total Amount:
          </div>
          <div className="dataValue">
            $<TextField
              hintText="Total Amount"
              name="Total Amount"
              value={ data.total }
            />
          </div>
        </div>
      </div>
    );
  };

  renderSingleItem = (data, index) => {
    return (
      <div className="mainHeadContainer" key={ index }>
        <div className="mainHeadTitle headerText headerSingleTitle">
          {data.title}:
        </div>
        <div className="mainHeadValue headerSingleValue">
          $<TextField
            hintText={ data.title }
            name={ data.title }
            onChange={ e => this.handleValueChange(e, 0, index) }
            value={ data[data.title][0].value }
          />
        </div>
      </div>
    );
  };

  renderBalanceSheet = () => {
    const { dataValues } = this.state;

    return dataValues.map((data, index) => {
      return data[data.title].length > 1 ? this.renderMultiItems(data, index) : this.renderSingleItem(data, index);
    });
  };

  render() {
    const { totalAmount } = this.state;

    return (
      <div className="drawer-sheet balanceSheetContainer">
        { this.renderBalanceSheet() }

        <div className="dataFields totalAmount">
          <div className="dataTitle">
            TOTAL NET WORTH:
          </div>
          <div className="dataValue">
            $<TextField
              hintText="Total Amount"
              name="Total Amount"
              value={ totalAmount }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BalanceSheet;
