/* Other peoples code */
import React from 'react';
import { DialogContainer } from 'react-md';
import { Query, Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

/* Our code */
import { getNode, getNodeFields, updateField } from '../../graphql';
import Field from '../Fields/Field';

/**
 * Radial Nodes are functional components that represent parent circle nodes.
 * They simply check the node data and will iteratively call itself if there are children.
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
    if (this.props.nodeID && prevProps.nodeID !== this.props.nodeID) {
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
    const { nodeID } = this.props;

    const { visible, initialFocus, focusOnMount, containFocus, activeDialog } = this.state;
    const id = nodeID;

    const divID = `${nodeID}-dialog`;
    const dialogID = `${nodeID}-control-dialog`;

    return (
      <div id={divID}>
        <Query query={getNode} variables={{ id }} >
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error! ${error}`;
            return (
              <Mutation mutation={updateField} variables={{ data: activeDialog }} refetchQueries={ res => res.data.updateField.map(id => ({ query: getNodeFields, variables: { id } })) } awaitRefetchQueries={true}>
                {updateData => (
                  <DialogContainer
                    id={dialogID}
                    className="radialDialog"
                    title={data.getNode ? data.getNode.name : ''}
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
                        updateData();
                        this.hide();
                      },
                    }]}
                    onHide={this.hide}
                    initialFocus={initialFocus}
                    focusOnMount={focusOnMount}
                    containFocus={containFocus}
                    contentClassName="md-grid"
                  >
                    <Query query={getNodeFields} variables={{ id }}>
                      {({ loading, error, data }) => {
                        if (loading) return null;
                        if (error) return `Error! ${error}`;
                        let fieldlist = [];
                        let order = 0;
                        for (let i = 0; i < data.getNodeFields.length; i++) {
                          order = data.getNodeFields[i].order
                          fieldlist[order] =
                            <Field
                              key={data.getNodeFields[i].id}
                              id={data.getNodeFields[i].id}
                              name={data.getNodeFields[i].name}
                              fieldtype={data.getNodeFields[i].type}
                              value={data.getNodeFields[i].value}
                              options={[]}
                              onChange={this.handleChange}
                            />;
                        }
                        return (fieldlist);
                      }}
                    </Query>
                  </DialogContainer>
                )}
              </Mutation>
            );
          }}
        </Query>
      </div >
    );
  }
}
Dialog.propTypes = {
  nodeID: PropTypes.string.isRequired
};
//export default withApollo(RadialDialog);
//export default React.forwardRef((props, ref) => <RadialDialog updateFocus={ref} {...props}/>);
export default Dialog;