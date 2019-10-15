import React, {useContext} from 'react';
import { FocusContext } from 'components/Core/Handlers/Focus';
export const useFocus = () => useContext(FocusContext);
