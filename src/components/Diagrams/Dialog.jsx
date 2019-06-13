import React from 'react';
import { DialogContainer } from 'react-md';
import Field from '../Fields/Field';
import PropTypes from 'prop-types';

/**
 * Radial Nodes are functional components that represent parent circle nodes.
 * They simply check the node data and will iteratively call itself if there are children.
 */
 class Dialog extends React.Component {
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

   componentDidMount() {
     //this.updateVisibility();
   }

   componentDidUpdate(prevProps, prevState) {
     // console.log('Updating dialog visibility');
     if ( prevProps.nodeID !== this.props.nodeID ) {
       this.show();
     }

     return true;
   }

   show = () => {
     this.setState({ visible: true });
   };

   hide = () => {
     this.setState({ visible: false });
   };

   render() {
     const {
       nodeID,
       name
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
     const dialogID = `${nodeID}-control-dialog`;

     return (
       <div id={divID}>
         <DialogContainer
           id={dialogID}
           className="radialDialog"
           title={name}
           visible={visible}
           actions={actions}
           onHide={this.hide}
           initialFocus={initialFocus}
           focusOnMount={focusOnMount}
           containFocus={containFocus}
           contentClassName="md-grid"
         >
          <Field
            id={nodeID}
            name={'$'}
            fieldtype={'Currency'}
            value={'VALUE'}
            options={[]}
            onChange={{}}
          />
         </DialogContainer>
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
