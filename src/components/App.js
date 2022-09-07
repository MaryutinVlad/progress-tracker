import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { ResourceContext } from '../contexts/ResourceContext';
import Header from './Header';
import Main from './Main';
import Auth from './Auth';
import apiAuth from '../utils/apiAuth';
import api from '../utils/api';
import levelTab from '../utils/userLevelTab';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [isDataSent, setIsDataSent] = useState(false);
  const [currentActivities, setCurrentActivities] = useState([]);
  const [availableActivities, setAvailableActivities] = useState([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [wp, setWp] = useState(0);
  const [slots, setSlots] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [levelProgress, setLevelProgress] = useState('0/20');
  const [day, setDay] = useState(0);

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
        setUserName(user.name);
        setUserEmail(user.email);
        setLoggedIn(true);
        setWp(user.wp);
        setSlots(user.slots);
        setUserLevel(user.level);
        setDay(user.daysPassed);
        navigate('/');
        })
      .then(() => {
        api.getActivities()
          .then((activities) => {
            setCurrentActivities(activities.currentActivities);
            setAvailableActivities(activities.availableActivities);

            if (activities.currentActivities.length > 1) {
              const totalProgress = activities.currentActivities.reduce((prev, cur) => prev + cur);
              return setLevelProgress(`${totalProgress}/${levelTab[userLevel]}`);
            }
            
            if (activities.currentActivities[0]) {
              setLevelProgress(`${activities.currentActivities[0].completed}/${levelTab[userLevel]}`);
            }
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
    api.purchaseActivity(id, wp, slots)
      .then((data) => {
        setCurrentActivities(data.currentActivities);
        setAvailableActivities(data.availableActivities);
        setWp(data.user.wp);
        setSlots(data.user.slots);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEndDay(values) {
    setIsDataSent(true);
    api.endDay(values)
      .then((updatedActivities) => {
        setIsDataSent(false);
        setCurrentActivities(updatedActivities);
      })
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
          name={userName}
          email={userEmail}
          level={userLevel}
          levelProgress={levelProgress}
          days={day}
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
                isDataSent={isDataSent}
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