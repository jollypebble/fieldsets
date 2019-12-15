import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import { Button } from 'react-md';
import Field from 'lib/fieldsets/Field/Field';
import { FieldData } from 'data';

import { fetchFields, updateField } from 'lib/fieldsets/graphql/queries';

const SHORT_TERM_PARENTS = ['cash_equivalents', 'mortgage', 'liabilities_debt'];
const MID_TERM_PARENTS = ['utmas', 'plan_529', 'investment_account'];
const LONG_TERM_PARENTS = ['cash_value_life', 'ira_roth', 'k_401', 'annuity', 'stock_option', 'investment_real_estate', 'deffered_comp'];

class SheetTab extends Component {
  constructor() {
    super();

    this.state = {
      updateList: []
    };
  }

  getFieldData() {
    const { tabId } = this.props;
    let parentIds = [],
        data = [];

    switch(tabId) {
      case 'SHORT_TERM':
        parentIds = SHORT_TERM_PARENTS;
        break;
      case 'MID_TERM':
        parentIds = MID_TERM_PARENTS;
        break;
      case 'LONG_TERM':
        parentIds = LONG_TERM_PARENTS;
        break;
      default:
        break;
    };

    parentIds.forEach(parentId => {
      data.push({
        id: parentId,
        children: FieldData.filter(data => data.parent === parentId)
      });
    });

    return data;
  }

  handleChange = (value, id) => {
    const { updateList } = this.state;

    let temp = updateList.filter(item => item.id !== id);
    temp.push({
      id,
      value
    });

    this.setState({ updateList: temp });
  }

  render() {
    const { updateList } = this.state;
    const fieldData = this.getFieldData();

    return (
      <Mutation mutation={updateField} variables={{ data: updateList }} refetchQueries={ res => res.data.updateField.map(id => ({ query: fetchFields, variables: { id } })) } awaitRefetchQueries={true}>
        {updateData => (
          <div className="tab-container">
            {fieldData.map(field => (
              <div key={field.id} className="field-item">
                <h4>{ field.id.replace('_', ' ') }</h4>
                <Query query={fetchFields} variables={{ id: field.id }}>
                  {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return `Error! ${error}`;

                    return data.fetchFields.map(item => (
                      <Field
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        fieldtype={item.type}
                        value={item.value}
                        options={[]}
                        onChange={this.handleChange}
                      />
                    ))
                  }}
                </Query>
              </div>
            ))}
            <Button raised primary onClick={updateData}>Save</Button>
          </div>
        )}
      </Mutation>
    );
  }
};

export default SheetTab;

SheetTab.propTypes = {
  tabId: PropTypes.string.isRequired
}
