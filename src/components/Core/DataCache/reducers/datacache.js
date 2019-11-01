import { Initialize, Fetch, Write, Update, Defaults } from 'components/Core/DataCache/calls';

/**
 * A data cache call uses the datacache service and returns a result in the datastore context.
 * This uses the Datacache service instance and can be called outside of a component.
 * Key will be set to id if not specified.
 * Defaults to fetch if no action is specified.
 * @param call {key, id, action, target, filter},
 */
export const callCache = ( call, data = {}) => {
  let result = null;
  switch (call.action) {
    case 'defaults':
      result = Defaults( call, data );
      break;
    case 'init':
    case 'build':
    case 'prime':
    case 'initialize':
      result = Initialize( call );
      break;
    case 'set':
    case 'update':
      result = Update( call, data )
      break;
    case 'write':
    case 'insert':
      result = Write( call, data );
      break;
    case 'fetch':
    case 'read':
    case 'get':
    default:
      result = Fetch( call );
  }
  return result;
}
