import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { ResourceContext } from '../contexts/ResourceContext';
import Header from './Header';
import Main from './Main';
import Auth from './Auth';
import apiAuth from '../utils/apiAuth';
import api from '../utils/api';
import { levelTab, upgradeCostTab } from '../utils/userLevelTab';

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
  const [nextLevelAt, setNextLevelAt] = useState(20);
  const [wp, setWp] = useState(0);
  const [slots, setSlots] = useState(0);
  const [levelProgress, setLevelProgress] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [day, setDay] = useState(0);
  const [userData, setUserData] = useState({});
  const [upgradeCost, setUpgradeCost] = useState(0);

  const navigate = useNavigate();

  function retrieveProfileInfo(token) {
    apiAuth.validate(token)
      .then((user) => {
        setLoggedIn(true);
        setWp(user.wp);
        setSlots(user.slots);
        setUserLevel(user.level);
        setDay(user.daysPassed);
        setUserData(user);
        navigate('/');
        setNextLevelAt(levelTab[user.level]);
        })
      .then(() => {
        api.getTrials()
          .then((trials) => {
            setAvailableChallenges(trials.challenges);
            setAvailableActions(trials.actions);
            setAvailableTrials(trials.trials);
          })
          .catch((err) => {
            console.log(err);
          })
        api.getActivities()
          .then((activities) => {
            const upgradeCostTier = activities.zones.filter((zone) => zone.bought === true).length;

            setAvailableActivities(activities.activities);
            setAvailableZones(activities.zones);
            setUpgradeCost(upgradeCostTab[upgradeCostTier]);

            let totalCompleted = 0;
            for (let item of activities.activities) {
              if (item.bought) {
                totalCompleted += item.completed;
              }
            }

            setLevelProgress(totalCompleted);
          })
      })  
      .catch(err => console.log(err));
  }

  function handleSignIn(data) {
    apiAuth.login(data)
      .then((response) => {
        const { token } = response;
        if (token) {
          localStorage.setItem('jwt', token);
          setLoggedIn(true);
          window.location.reload();
          retrieveProfileInfo(token);
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

    retrieveProfileInfo(token);
  }

  function logout() {
    localStorage.removeItem('jwt');
    setUserData({});
    setLoggedIn(false);
    navigate('/signin');
  }

  function handlePurchaseActivity(activityId) {
    console.log('purchasing activity...', activityId);
    api.purchaseActivity(activityId, wp, slots)
      .then(({ boughtActivity, updatedUser }) => {
        const boughtItemIndex = findBoughtItem(availableActivities, boughtActivity.name);
        availableActivities[boughtItemIndex] = boughtActivity;
        setAvailableActivities(availableActivities);
        setSlots(updatedUser.slots);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleMapRestart() {
    api.restartMap()
      .then(() => {
        window.location.reload();
      })
  }

  function findBoughtItem(list, target) {
    let counter = 0;
    for (let item of list) {
      if (item.name === target) {
        return counter;
      }
      counter++;
    }
  }

  function handlePurchaseZone(zoneId) {
    console.log('purchasing zone...', zoneId);
    api.purchaseZone(zoneId, wp)
      .then(({ purchasedZone, updatedUser }) => {
        console.log(purchasedZone, updatedUser);
        const boughtItemIndex = findBoughtItem(availableZones, purchasedZone.name);
        availableZones[boughtItemIndex] = purchasedZone;
        setAvailableZones(availableZones);
        setWp(updatedUser.wp);
        setSlots(updatedUser.slots);

        const upgradeCostTier = availableZones.filter((zone) => zone.bought === true).length;
        setUpgradeCost(upgradeCostTab[upgradeCostTier]);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpgradeClick(activityId, rank) {
    api.upgradeActivity(activityId, rank)
      .then((upgradedActivity) => {
        console.log(upgradedActivity);
        const upgradedItemIndex = findBoughtItem(availableActivities, upgradedActivity.name);
        availableActivities[upgradedItemIndex] = upgradedActivity;
        setAvailableActivities(availableActivities);
      })
  }
  
  function handleEndDay(values) {
    setIsDataSent(true);
    console.log({ values, userLevel, levelProgress, nextLevelAt, wp });
    api.endDay({ values, userLevel, levelProgress, nextLevelAt, wp })
      .then((updatedActivities) => {
        setIsDataSent(false);
        setCurrentActivities(updatedActivities.activities);
        setWp(updatedActivities.reward + wp);
        setLevelProgress(updatedActivities.reward + levelProgress);
        setNextLevelAt(levelTab[updatedActivities.userLevel]);
        setUserLevel(updatedActivities.userLevel);
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
          level= {userLevel}
          logout={logout}
          loggedIn={loggedIn}
          levelProgress={`${levelProgress} / ${nextLevelAt}`}
          days={day}
        />
            
        <Routes>

          <Route
            exact path='*'
            element={ loggedIn ?
              <Main
                availableActivities={availableActivities}
                availableTrials={availableTrials}
                availableChallenges={availableChallenges}
                availableActions={availableActions}
                availableZones={availableZones}
                onPurchaseActivity={handlePurchaseActivity}
                onPurchaseZone={handlePurchaseZone}
                onMapRestart={handleMapRestart}
                wp={wp}
                slots={slots}
                onEndDay={handleEndDay}
                isDataSent={isDataSent}
                onUpgradeClick={handleUpgradeClick}
                upgradeCost={upgradeCost}
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