import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { ResourceContext } from '../contexts/ResourceContext';
import Header from './Header';
import Main from './Main';
import Auth from './Auth';
import apiAuth from '../utils/apiAuth';
import api from '../utils/api';
import levelTab from '../utils/userLevelTab';

//info for drawing
//challenge's image size 380x158 px
//trial's image size 250x128 px
//activity's image size 128x128 px

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [isDataSent, setIsDataSent] = useState(false);
  const [currentActivities, setCurrentActivities] = useState([]);
  const [availableActivities, setAvailableActivities] = useState([]);
  const [availableTrials, setAvailableTrials] = useState([]);
  const [availableChallenges, setAvailableChallenges] = useState([]);
  const [availableActions, setAvailableActions] = useState([]);
  const [availableZones, setAvailableZones] = useState([]);
  const [wp, setWp] = useState(0);
  const [slots, setSlots] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [levelProgress, setLevelProgress] = useState('0/20');
  const [day, setDay] = useState(0);
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();


  function handleSignIn(data) {
    apiAuth.login(data)
      .then((response) => {
        const { token } = response;
        if (token) {
          localStorage.setItem('jwt', token);
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
        setLoggedIn(true);
        setWp(user.wp);
        setSlots(user.slots);
        setUserLevel(user.level);
        setDay(user.daysPassed);
        setUserData(user);
        navigate('/');
        })
      .then(() => {
        api.getTrials()
          .then((data) => {
            setAvailableChallenges(data.challenges);
            setAvailableActions(data.actions);
            setAvailableTrials(data.trials);
          })
          .catch((err) => {
            console.log(err);
          })
        api.getActivities()
          .then((activities) => {
            setCurrentActivities(activities.currentActivities);
            setAvailableActivities(activities.availableActivities);
            setAvailableZones(activities.availableZones);

            if (activities.currentActivities.length > 1) {
              const totalProgress = activities.currentActivities.reduce((prev, cur) => prev.completed + cur.completed);
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
    setUserData({});
    setLoggedIn(false);
    navigate('/signin');
  }

  function handleClickEvent(id) {
    api.purchaseActivity(id, userData.wp, userData.slots)
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

  function handleUpgradeClick(data) {
    console.log(data);
    /*api.upgradeActivity(data)
      .then((updatedActivities) => {
        setCurrentActivities(updatedActivities);
      })*/
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
          userData={userData}
          logout={logout}
          loggedIn={loggedIn}
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
                availableTrials={availableTrials}
                availableChallenges={availableChallenges}
                availableActions={availableActions}
                availableZones={availableZones}
                onClickEvent={handleClickEvent}
                wp={userData.wp}
                slots={userData.slots}
                onEndDay={handleEndDay}
                isDataSent={isDataSent}
                onClick={handleUpgradeClick}
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