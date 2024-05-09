/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from 'react'

const initialState = {
  user: null,
  loggedIn: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'LOGGED_IN':
      return { ...state, loggedIn: action.payload }
    default:
      return state
  }
}

export const Context = createContext()
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}
