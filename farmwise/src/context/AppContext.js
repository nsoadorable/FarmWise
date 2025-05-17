import React, { createContext, useReducer } from 'react';

const initialState = {};
export const AppContext = createContext(initialState);

function reducer(state, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};