import React, {useContext} from 'react';
import { FocusContext } from 'components/Core/Focus/Focus';
export const useFocus = () => useContext(FocusContext);
