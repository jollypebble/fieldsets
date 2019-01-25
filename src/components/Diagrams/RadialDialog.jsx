import React from 'react';
import {
  DialogContainer,
  TextField
} from 'react-md';
import PropTypes from 'prop-types';
import { Query, Mutation, graphql } from 'react-apollo';
import { focusCircleQuery } from '../../graphql';

/**
 * Radial Nodes are functional components that represent parent circle nodes.
 * They simply check the node data and will iteratively call itself if there are children.
 */
 class RadialDialog extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       visible: false,
       focusOnMount: true,
       containFocus: true,
       initialFocus: undefined,
     };

     this.show = this.show.bind(this);
     this.hide = this.hide.bind(this);
   }

   show = () => {
     this.setState({ visible: true });
   };

   hide = () => {
     this.setState({ visible: false });
   };

   render() {
     const {
       nodeData,
       nodeID
     } = this.props;

     const { visible, initialFocus, focusOnMount, containFocus } = this.state;

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

     /*
     if (typeof(nodeData) !== undefined && nodeData.length > 0) {
       nodeData.map(node => (
         <RadialDialog
           key={ node.id }
           nodeData={ typeof(node.children) === undefined ? [] : node.children }
           nodeID={ node.id }
         />
       ));
     }
     */
     const divID = `${nodeID}-dialog`;
     return (
       <div id={divID}>
         <DialogContainer
           id="focus-control-dialog"
           title="Focus Control Example"
           visible={visible}
           actions={actions}
           onHide={this.hide}
           initialFocus={initialFocus}
           focusOnMount={focusOnMount}
           containFocus={containFocus}
           contentClassName="md-grid"
         >
           <TextField id="field-1" label="Field 1" placeholder="Lorem ipsum" className="md-cell md-cell--12" />
           <TextField id="field-2" label="Field 2" placeholder="Multiline text here" rows={2} className="md-cell md-cell--12" />
         </DialogContainer>
       </div>
     );
  }
}
RadialDialog.propTypes = {
  nodeID: PropTypes.string.isRequired,
  nodeData: PropTypes.array.isRequired
};
//export default withApollo(RadialDialog);
//export default React.forwardRef((props, ref) => <RadialDialog updateFocus={ref} {...props}/>);
export default RadialDialog;
