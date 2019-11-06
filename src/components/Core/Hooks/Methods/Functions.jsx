import React, {useContext} from 'react';
import { FunctionsContext } from 'components/Core/Field/callbacks/Functions';
export const useFunctions = () => useContext(FunctionsContext);
