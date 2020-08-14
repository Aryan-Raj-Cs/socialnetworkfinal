import React, { useEffect, createContext, useReducer, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import UserProfile from './components/screens/UserProfile';
import Signin from './components/screens/Signin';
import SignUp from './components/screens/SignUp'
import CreatePost from './components/screens/CreatePost';
import SubscribedUserPosts from './components/screens/SubscribesUserPosts'

import { reducer, initialState } from './reducers/UserReducers'
export const userContext = createContext();
const Routing = () => {

  const history = useHistory();
  const { state, dispatch } = useContext(userContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log((user));
    if (user) {
      dispatch({ type: "USER", payload: user })
     // history.push('/')

    }
    else {
      history.push('/signin');
    }
  }, [])


  return (

    <Switch>
      <Route exact path="/" >
        <Home />
      </Route>

      <Route exact path="/profile" >
        <Profile />
      </Route>


      <Route path="/signin" >
        <Signin />
      </Route>

      <Route path="/signup" >
        <SignUp />
      </Route>

      <Route path="/create" >
        <CreatePost />
      </Route>
       
      <Route path="/profile/:userid" >
        <UserProfile />
      </Route>

      <Route path="/myfollowingpost">
        <SubscribedUserPosts />
      </Route>

    </Switch>


  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <userContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />

      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
