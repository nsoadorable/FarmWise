// src/context/AppContext.js
import React, { createContext, useReducer } from 'react';

// Initial global state
const initialState = { user: null, token: null };

// Create context
const AppContext = createContext(initialState);

// Reducer to handle auth actions
function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload.user, token: action.payload.token };
    case 'LOGOUT':
      return { user: null, token: null };
    default:
      return state;
  }
}

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
