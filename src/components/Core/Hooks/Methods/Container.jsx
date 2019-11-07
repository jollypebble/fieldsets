import React, {useContext} from 'react';
import { ContainerContext } from 'components/Core/Containers/Container';
export const useContainer = () => useContext(ContainerContext);
