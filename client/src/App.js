import React, { useEffect, createContext, useReducer, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'

import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

import Home from './components/screens/Home';
import Trending from './components/screens/Trending';
import Profile from './components/screens/Profile';
import Post from './components/screens/Post';
import Userpost from './components/screens/Userpost';
import UserProfile from './components/screens/UserProfile';
import Allmessage from './components/screens/Allmessage';
import Signin from './components/screens/Signin';
import SignUp from './components/screens/SignUp'
import CreatePost from './components/screens/CreatePost';
import Reset from './components/screens/Reset';
import SubscribedUserPosts from './components/screens/SubscribesUserPosts'
import NewPassword from './components/screens/Newpassword'
import Message from './components/screens/Message'
import M from 'materialize-css';

import { reducer, initialState } from './reducers/UserReducers'
import Navbar1 from './components/Navbar1';
export const userContext = createContext();
const Routing = () => {

  const history = useHistory();
  const { state, dispatch } = useContext(userContext);
  useEffect(() => {
    //console.log(localStorage.getItem('user')=="undefined")
    if(localStorage.getItem('user')=="undefined"){
      console.log(localStorage.getItem('user'))
      localStorage.clear('user')
      localStorage.clear('jwt_key')
      M.toast({html: 'Password and Email are wrong!',classes:"#d32f2f red darken-2"})
     }
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log((user));
    if (user) {
      dispatch({ type: "USER", payload: user })
     // history.push('/')

    }
    else {
      if(!history.location.pathname.startsWith('/reset'))
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

      <Route path="/allmessage/:userid" >
        <Allmessage />
      </Route>

      <Route path="/post/:postid">
        <Post />
      </Route>
      
      <Route path="/userpost/:postid" >
        <Userpost />
      </Route>

      <Route path="/myfollowingpost">
        <SubscribedUserPosts />
      </Route>
      <Route path="/trending">
        <Trending />
      </Route>

      <Route path="/message">
        <Message />
      </Route>

      <Route exact path="/reset">
        <Reset />
      </Route>
      <Route  path="/reset/:token">
        <NewPassword />
      </Route>

    </Switch>


  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <userContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        {/* <Navbar /> */}
          <Navbar1 />
        
        <Routing />

      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
