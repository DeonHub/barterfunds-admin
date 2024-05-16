// withGlobalState.js
import React, { useContext } from 'react';
import { GlobalStateContext } from './GlobalStateContext';

export const withGlobalState = (WrappedComponent) => {
  return (props) => {
    const { globalState, setGlobalState } = useContext(GlobalStateContext);
    return <WrappedComponent {...props} globalState={globalState} setGlobalState={setGlobalState} />;
  };
};
