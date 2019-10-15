import React, {useContext} from 'react';
import { StatusContext } from 'components/Core/Handlers/Status';
export const useStatus = () => useContext(StatusContext);
