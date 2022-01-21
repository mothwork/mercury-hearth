import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import { authenticate } from './store/session';
import Project from './components/Projects';
import Splash from './components/Splash';
import InsideProject from './components/InsideProject'
import PageForm from './components/Pages/PageForm';
import PageView from './components/Pages/PageView'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>

      <Switch>
        <Route path='/' exact={true}>
          <NavBar />
          <Splash/>
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/projects' exact={true} >
          <Project/>
        </ProtectedRoute>
        <Route path='/projects/:projectId' exact={true}>
          <InsideProject/>
        </Route>
        <Route path='/projects/:projectId/new'>
          <div className='new-page-container'>
          <InsideProject/>
          <PageForm/>
          </div>
        </Route>
        <Route path='/pages/:pageId'>
          <div className='page-container'>
          <InsideProject/>
          <PageView/>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
