/**
 * Accounts & members are a unique set type that can be assigned as owners of fieldset snapshots.
 * Members can also be given roles that can be used for capabilities within the app.
 */
 /**
  * Accounts & members are a unique set type that can be assigned as owners of fieldset snapshots.
  * Members can also be given roles that can be used for capabilities within the app.
  */
 import React, { useEffect, useState } from 'react';
 import PropTypes from 'prop-types';
 import { defaults } from 'graphql/defaults';
 import { callCache } from 'components/Core/DataCache/reducers/datacache';
 import { fetchMember } from 'graphql/queries';

 const Member = ({id, name, attributes, children}) => {
    const [status, updateStatus] = useState('initializing');
    const [data, updateData] = useState({
      id: id,
      fields: {},
      sets: {},
      meta: {}
    });

    /*
    const allClients = getClientList();

    const handleChange = (name, value) => {
      this.setState({ [name]: value });
    };


    this.setState({
      clients: (allClients && allClients.list) || []
    });


    handleClientSave = () => {
      const temp = {};
      clientSheetItems.forEach((item) => {
        temp[item] = this._clientSheet[item]._field.getValue();
      });
      this.setClientCache([{ ...temp, id: Date.now() }]);
      temp.dependencies = this._clientSheet.state.dependencies;
      this.setState({ clients: this.state.clients.concat(temp) });
      this.initializeClientSheet();
    };

    initializeClientSheet = () => {
      clientSheetItems.forEach((item) => {
        this._clientSheet[item]._field._field.value = '';
      });
      this._clientSheet.setState({ dependencies: [] });
    };

    setClientCache = (data = []) => {
      if (!data.length) return false;

      data.forEach(currentClient => {
        currentClient.__typename = 'Client';

        let clientList = this.getClientList();

        // Cache hasn't been written yet, so set it using default.
        clientList = clientList || { id: 'normal', list: [], __typename: 'ClientList' };
        clientList.list = clientList.list.filter(item => item.id !== currentClient.id);
        clientList.list.push(currentClient);

        const id = 'ClientList:normal';

        this.props.client.writeFragment({
          id,
          fragment: fetchAllAccounts,
          fragmentName: 'account',
          data: clientList
        });
      });
    }

    getClientList = () => {
      const id = 'ClientList:normal';

      const clientList = this.props.client.readFragment({
        id,
        fragment: fetchAllAccounts,
        fragmentName: 'account'
      });

      return clientList;
    }
    */

    /**
     * Certain applications will have data that varies per account.
     * Accounts are a unique fieldset in that their children members may be assigned as owners of other fieldset snapshots.
     * This interface component allows for loading of an owner account and it members here.
     */

    useEffect( () => {
        if ( 'initializing' === status ) {
          const initData = callCache({key: id, id: id, target: 'member', action: 'initialize'});
          updateMemberData(initData);
        }
        updateStatus('ready');
      },
      [status]
    );

    /**
     * Merge the updated data with current diagram data.
     */
    const updateMemberData = (newData) => {
      updateStatus('update');
      updateData( prevData => {
        return {
            ...prevData,
            ...newData
        }
      });
    }

    /**
     * Wait for our initial data load, otherwise we won't be blocked on re-renders as the diagram renders are managed by data states and asyncrhonous updates to the data cache.
     */
    if ( 'ready' !== status ) {
      // TODO: Add in nicer animation for initializating.
      return <div>Loading....</div>;
    }

    return (
      <React.Fragment key={id}>

      </React.Fragment>
    );
  }

  Member.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string
  };

  export default Member;
