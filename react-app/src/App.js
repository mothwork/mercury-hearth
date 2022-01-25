import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Project from './components/Projects';
import Splash from './components/Splash';
import InsideProject from './components/InsideProject'
import PageForm from './components/Pages/PageForm';
import PageView from './components/Pages/PageView'
import EditPageForm from './components/Pages/EditPageForm';

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
          <div className='splash-container'>
          <NavBar />
          <Splash/>
          </div>
        </Route>

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
        <Route path='/projects/:projectId/:pageId' exact={true}>
          <div className='new-page-container'>
          <InsideProject/>
          <PageView/>
          </div>
        </Route>
        <Route path='/projects/:projectId/:pageId/edit' exact={true}>
          <div className='new-page-container'>
          <InsideProject/>
          <EditPageForm/>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
