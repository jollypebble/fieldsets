/* Other peoples code */
import React from 'react';
import { DialogContainer } from 'react-md';
import { Query, Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

/* Our code */
import { getSet, getSetFields, updateField } from '../../graphql';
import Field from '../Fields/Field';

/**
 * Radial Sets are functional components that represent parent circle sets.
 * They simply check the set data and will iteratively call itself if there are children.
 */
class Dialog extends React.Component {
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
        <Query query={getSet} variables={{ id }} >
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error! ${error}`;
            return (
                <DialogContainer
                  id={dialogID}
                  className="radialDialog"
                  title={data.getSet ? data.getSet.name : ''}
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
                  <Query query={getSetFields} variables={{ id }}>
                    {({ loading, error, data }) => {
                      if (loading) return null;
                      if (error) return `Error! ${error}`;
                      let fieldlist = [];
                      let order = 0;
                      for (let i = 0; i < data.getSetFields.length; i++) {
                        order = data.getSetFields[i].order
                        fieldlist[order] =
                          <Field
                            key={data.getSetFields[i].id}
                            id={data.getSetFields[i].id}
                            name={data.getSetFields[i].name}
                            fieldtype={data.getSetFields[i].type}
                            value={data.getSetFields[i].value}
                            options={[]}
                            onChange={this.handleChange}
                          />;
                      }
                      return (fieldlist);
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
Dialog.propTypes = {
  setID: PropTypes.string.isRequired
};

export default Dialog;
