import React, {useContext} from 'react';
import { StatusContext } from '../Handlers/Status';
export const useStatus = () => useContext(StatusContext);
