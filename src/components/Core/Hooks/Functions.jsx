import React, {useContext} from 'react';
import { FunctionsContext } from 'components/Core/Field/callback/Functions';
export const useFunctions = () => useContext(FunctionsContext);
