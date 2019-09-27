/* Other peoples code */
import React from 'react';
import { DialogContainer } from 'react-md';
import { Query, Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

/* Our code */
import { fetchFieldSet, fetchFields, updateField } from 'graphql/queries';
import { Field } from 'components/Core';

/**
 * Dialog Sheets are fields sets in a popup modal
 */
class DialogSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      visible: true,
      focusOnMount: true,
      containFocus: true,
      initialFocus: undefined,
      activeDialog: []
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  componentDidMount() {
    //this.updateVisibility();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.setID && prevProps.setID !== this.props.setID) {
      this.show();
    }
  }

  show = () => {
    this.setState({ visible: true });
  };

  hide = () => {
    this.setState({ visible: false }, () => {
      this.props.onClose();
    });
  };

  handleChange = (value, id) => {
    let { activeDialog } = this.state;
    let matchIndex = activeDialog.findIndex(item => item.id === id);

    if (matchIndex !== -1) {
      activeDialog[matchIndex].value = value;
    } else {
      activeDialog.push({
        id,
        value
      });
    }

    this.setState({ activeDialog });
  }

  render() {
    const { setID } = this.props;

    const { visible, initialFocus, focusOnMount, containFocus, activeDialog } = this.state;
    const id = setID;

    const divID = `${setID}-dialog`;
    const dialogID = `${setID}-control-dialog`;

    return (
      <div id={divID}>
        <Query query={fetchFieldSet} variables={{ id }} >
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error! ${error}`;
            return (
                <DialogContainer
                  id={dialogID}
                  className="radialDialog"
                  title={data.fetchFieldSet ? data.fetchFieldSet.name : ''}
                  visible={visible}
                  actions={[{
                    id: 'dialog-cancel',
                    secondary: true,
                    children: 'Cancel',
                    onClick: this.hide,
                  }, {
                    id: 'dialog-ok',
                    primary: true,
                    children: 'Ok',
                    onClick: () => {
                      this.hide();
                    },
                  }]}
                  onHide={this.hide}
                  initialFocus={initialFocus}
                  focusOnMount={focusOnMount}
                  containFocus={containFocus}
                  contentClassName="md-grid"
                >
                  <Query query={fetchFields} variables={{ id }}>
                    {({ loading, error, data }) => {
                      if (loading) return null;
                      if (error) return `Error! ${error}`;
                      let fieldset = [];
                      let order = 0;
                      for (let i = 0; i < data.fetchFields.length; i++) {
                        order = data.fetchFields[i].order
                        fieldset[order] =
                          <Field
                            key={data.fetchFields[i].id}
                            id={data.fetchFields[i].id}
                            name={data.fetchFields[i].name}
                            fieldtype={data.fetchFields[i].type}
                            value={data.fetchFields[i].value}
                            options={[]}
                            onChange={this.handleChange}
                          />;
                      }
                      return (fieldset);
                    }}
                  </Query>
                </DialogContainer>
            );
          }}
        </Query>
      </div >
    );
  }
}
DialogSheet.propTypes = {
  setID: PropTypes.string.isRequired
};

export default DialogSheet;
