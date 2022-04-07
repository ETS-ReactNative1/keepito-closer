import React, { useState, useReducer, createContext } from "react";

import api from '../services/api'
var UserStateContext = createContext();
var UserDispatchContext = createContext();

const initialState = { email: '', isAuthenticated: '' }


const actions = {
  loginSucces: 'LOGIN_SUCCESS',
  loginFailure: 'LOGIN_FAILURE',
  singOut: 'SIGN_OUT_SUCCESS'
}

function userReducer(state, action) {
  switch (action.type) {
    case actions.loginSucces:
      return { ...state, isAuthenticated: true };
    case actions.loginFailure:
      return { ...state, isAuthenticated: false };
    case actions.signOut:
      return { ...state, isAuthenticated: false };
    case action.payload:
      return { email: action.payload };
    default: {
      return { ...state, isAuthenticated: false };
    }
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState)


  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}



// ###########################################################



async function login(dispatch, login, password, history, setIsLoading, setError) {
  // setIsLoading(true);
  // const data = {
  //   email: login,
  //   password: password
  // }

  // await api.post('/login', data)
  //   .then(response => {
  //     setTimeout(() => {
  //       localStorage.setItem("Authorization", response.headers.authorization)
  //       api.defaults.headers['Authorization'] = `${response.headers.authorization}`
  //       setIsLoading(false)
  //       dispatch({ type: actions.loginSucces });

  //       history.push('/app/dashboard')
  //     }, 2000);
  //   })

  //   .catch(error => {
  //     setTimeout(() => {
  //       setError(true);
  //       //  dispatch({ type: actions.loginFailure });
  //       setIsLoading(false);
  //       setError(true);
  //     }, 2000);
  //   })
  localStorage.setItem("Authorization", "response.headers.authorization")
  api.defaults.headers['Authorization'] = "`${response.headers.authorization}`"
  setIsLoading(false)
  dispatch({ type: actions.loginSucces });

  history.push('/app/dashboard')
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: actions.singOut });
  history.push("/login");
}

export { UserProvider, useUserState, useUserDispatch, login, signOut };