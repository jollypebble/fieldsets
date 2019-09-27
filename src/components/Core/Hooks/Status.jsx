import React, {useContext} from 'react';
import { StatusContext } from 'components/Core/Dialogs/StatusBar';
export const useStatus = () => useContext(StatusContext);
