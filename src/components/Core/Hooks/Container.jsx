import React, {useContext} from 'react';
import { ContainerContext } from 'components/Core/Focus/Container';
export const useContainer = () => useContext(ContainerContext);
