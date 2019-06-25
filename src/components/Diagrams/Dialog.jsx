/* Other peoples code */
import React from 'react';
import { DialogContainer } from 'react-md';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';


/* Our code */
import { getNode, getNodeFields } from '../../graphql';
import Field from '../Fields/Field';

const _ = require('lodash');
/**
 * Radial Nodes are functional components that represent parent circle nodes.
 * They simply check the node data and will iteratively call itself if there are children.
 */
 class Dialog extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       name: '',
       visible: false,
       focusOnMount: true,
       containFocus: true,
       initialFocus: undefined,
     };

     this.show = this.show.bind(this);
     this.hide = this.hide.bind(this);
   }

   componentDidMount() {
     //this.updateVisibility();
   }

   componentDidUpdate(prevProps, prevState) {
     // console.log('Updating dialog visibility');
     if ( this.props.nodeID && prevProps.nodeID !== this.props.nodeID ) {
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

   render() {
     const {
       nodeID,
     } = this.props;

     const { visible, initialFocus, focusOnMount, containFocus } = this.state;
     const id = nodeID;

     const actions = [{
       id: 'dialog-cancel',
       secondary: true,
       children: 'Cancel',
       onClick: this.hide,
     }, {
       id: 'dialog-ok',
       primary: true,
       children: 'Ok',
       onClick: this.hide,
     }];

     const divID = `${nodeID}-dialog`;
     const dialogID = `${nodeID}-control-dialog`;

     return (
       <div id={divID}>
        <Query query={getNode} variables={{ id }} >
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error! ${error}`;
            console.log(data);
            return (
               <DialogContainer
                 id={dialogID}
                 className="radialDialog"
                 title={data.getNode ? data.getNode.name : ''}
                 visible={visible}
                 actions={actions}
                 onHide={this.hide}
                 initialFocus={initialFocus}
                 focusOnMount={focusOnMount}
                 containFocus={containFocus}
                 contentClassName="md-grid"
               >
                 <Query query={getNodeFields} variables={{ id }} >
                  {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return `Error! ${error}`;
                    let fieldlist = [];
                    for (let i=0; i<data.getNodeFields.length; i++) {
                      fieldlist.push(
                        <Field
                          key={data.getNodeFields[i].id}
                          id={data.getNodeFields[i].id}
                          name={data.getNodeFields[i].name}
                          fieldtype={'Currency'}
                          value={data.getNodeFields[i].value}
                          options={[]}
                          onChange={{}}
                        />
                      );
                    }
                    return(fieldlist);
                    }}
                  </Query>
                </DialogContainer>
              );
            }}
          </Query>
       </div>
     );
  }
}
Dialog.propTypes = {
  nodeID: PropTypes.string.isRequired
};
//export default withApollo(RadialDialog);
//export default React.forwardRef((props, ref) => <RadialDialog updateFocus={ref} {...props}/>);
export default Dialog;
