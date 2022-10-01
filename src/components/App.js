import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Auth from './Auth';
import apiAuth from '../utils/apiAuth';
import api from '../utils/api';
import { ResourceContext } from '../contexts/ResourceContext';
import { levelTab, upgradeCostTab } from '../utils/tabs';
import { findBoughtItem } from '../utils/functions';

//info for drawing (default size)
//challenge's image size 380x158 px
//trial's image size 250x128 px
//activity's image size 128x128 px

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);
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
  const [userData, setUserData] = useState({});
  const [upgradeCost, setUpgradeCost] = useState(0);

  const navigate = useNavigate();

  function retrieveProfileInfo(token) {
    apiAuth.validate(token)
      .then((user) => {
        setLoggedIn(true);
        setWp(user.wp);
        setSlots(user.slots);
        setUserData(user);
        navigate('/');
        setNextLevelAt(levelTab[user.level]);
        console.log(user);
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

            setAvailableActivities(activities.activities.filter((activity) => activity.bought === false));
            setCurrentActivities(activities.activities.filter((activity) => activity.bought === true));
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
    api.purchaseActivity(activityId, userData.wp, slots)
      .then(({ boughtActivity, updatedUser }) => {
        const boughtItemIndex = findBoughtItem(availableActivities, boughtActivity.name);
        availableActivities.splice(boughtItemIndex, 1);
        currentActivities.push(boughtActivity);
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

  function handlePurchaseZone(zoneId) {
    console.log('purchasing zone...', zoneId);
    api.purchaseZone(zoneId, userData.wp)
      .then(({ purchasedZone, updatedUser }) => {
        console.log(purchasedZone, updatedUser);
        const boughtItemIndex = findBoughtItem(availableZones, purchasedZone.name);
        availableZones[boughtItemIndex] = purchasedZone;
        setUserData({...userData, wp: updatedUser.wp, slots: updatedUser.slots});

        const upgradeCostTier = availableZones.filter((zone) => zone.bought === true).length;
        setUpgradeCost(upgradeCostTab[upgradeCostTier]);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpgradeClick(activityId, rank) {

    const wpAfterPurchase = userData.wp - upgradeCost;

    api.upgradeActivity(activityId, rank, wpAfterPurchase)
      .then(({ upgradedActivity, updatedUser }) => {
        console.log({ upgradedActivity, updatedUser });
        const upgradedItemIndex = findBoughtItem(currentActivities, upgradedActivity.name);
        currentActivities[upgradedItemIndex] = upgradedActivity;
        setUserData({ ...userData, wp: updatedUser.wp });
      })
  }

  function handleEndDay(values) {
    setIsDataSent(true);
    api.endDay({ values, level: userData.level, levelProgress, nextLevelAt, wp: userData.wp })
      .then(({ reward, user }) => {
        setIsDataSent(false);
        setUserData({ ...userData, wp: userData.wp + reward });
        setLevelProgress(reward + levelProgress);
        setNextLevelAt(levelTab[user.level]);
        userData.nextLevelAt = levelTab[user.level];
        userData.level = user.level;
      })
  }

  useEffect(() => {
    handleAuthorize();
  }, []);

  return (
    <ResourceContext.Provider value={{wp: userData.wp, slots: userData.slots }}>
      <div className='page'>
        <Header
          userData={userData}
          logout={logout}
          loggedIn={loggedIn}
          levelProgress={`${levelProgress} / ${userData.nextLevelAt}`}
        />
            
        <Routes>

          <Route
            exact path='*'
            element={ loggedIn ?
              <Main
                availableActivities={availableActivities}
                currentActivities={currentActivities}
                availableTrials={availableTrials}
                availableChallenges={availableChallenges}
                availableActions={availableActions}
                availableZones={availableZones}
                onPurchaseActivity={handlePurchaseActivity}
                onPurchaseZone={handlePurchaseZone}
                onMapRestart={handleMapRestart}
                onUpgradeClick={handleUpgradeClick}
                onEndDay={handleEndDay}
                isDataSent={isDataSent}
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