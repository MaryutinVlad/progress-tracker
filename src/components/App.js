import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { ResourceContext } from '../contexts/ResourceContext';
import Header from './Header';
import Main from './Main';
import Auth from './Auth';
import apiAuth from '../utils/apiAuth';
import api from '../utils/api';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [currentActivities, setCurrentActivities] = useState([]);
  const [availableActivities, setAvailableActivities] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [wp, setWp] = useState(0);
  const [slots, setSlots] = useState(0);

  const navigate = useNavigate();


  function handleSignIn(data) {
    apiAuth.login(data)
      .then((response) => {
        const { token } = response;
        if (token) {
          localStorage.setItem('jwt', token);
          setUserEmail(data.email);
          setLoggedIn(true);
          navigate('/');
        }
      })
  }

  function handleSignUp(data) {
    apiAuth.register(data)
      .then(() => {
        setSignedUp(true);
        navigate('/signin');
      })
      .catch(err => console.log(err));
  }
  
  function handleAuthorize() {
    if (!localStorage.getItem('jwt')) {
      return;
    }
    const token = localStorage.getItem('jwt');
    apiAuth.validate(token)
      .then((user) => {
        setUserEmail(user.email);
        setLoggedIn(true);
        setWp(user.wp);
        setSlots(user.slots);
        navigate('/');
        })
      .then(() => {
        api.getActivities()
          .then((activities) => {
            setCurrentActivities(activities.currentActivities);
            setAvailableActivities(activities.availableActivities);
          })
      })  
      .catch(err => console.log(err));
  }

  function logout() {
    localStorage.removeItem('jwt');
    setUserEmail('');
    setLoggedIn(false);
    navigate('/signin');
  }

  function handleClickEvent(id) {
    console.log(wp, slots);
    api.purchaseActivity(id, wp, slots)
      .then((data) => {
        setCurrentActivities(data.activities);
        setWp(data.user.wp);
        setSlots(data.user.slots);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEndDay(values) {
    api.endDay(values);
  }

  useEffect(() => {
    handleAuthorize();
  }, []);

  return (
    <ResourceContext.Provider value={{wp, slots}}>
      <div className='page'>
        <Header
          logout={logout}
          loggedIn={loggedIn}
          email={userEmail}
        />
            
        <Routes>

          <Route
            exact path='*' 
            element={ loggedIn ?
              <Main
                currentActivities={currentActivities}
                availableActivities={availableActivities}
                onClickEvent={handleClickEvent}
                wp={wp}
                slots={slots}
                onEndDay={handleEndDay}
              /> :
              <Navigate to='/signin' />}
          />

          <Route
            path='/signin'
            element={
              <Auth
                title='Sign in'
                formName='login'
                onEvent={handleSignIn}
                redirectTo='/signup'
              />
            }
          />

          <Route
            path='/signup'
            element={
              <Auth
                title='Sign up'
                formName='register'
                onEvent={handleSignUp}
                redirectTo='/signin'
              />
            }
          />

        </Routes>

      </div>
    </ResourceContext.Provider>
  )
}

export default App;