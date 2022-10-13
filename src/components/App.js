import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Auth from './Auth';
import apiAuth from '../utils/apiAuth';
import api from '../utils/api';
import { ResourceContext } from '../contexts/ResourceContext';
import { levelTab, upgradeCostTab } from '../utils/tabs';
import { findBoughtItem, calculateRewards, distributeResults } from '../utils/functions';

//info for drawing (default size)
//challenge's image size 380x158 px
//trial's image size 250x128 px
//activity's image size 128x128 px

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [isDataSent, setIsDataSent] = useState(false);
  const [currentActivities, setCurrentActivities] = useState([]);
  const [availableActivities, setAvailableActivities] = useState([]);
  const [trials, setTrials] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [actions, setActions] = useState([]);
  const [zones, setZones] = useState([]);
  const [userData, setUserData] = useState({});
  const [upgradeCost, setUpgradeCost] = useState(0);
  const [nextLevelAt, setNextLevelAt] = useState(20);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  function retrieveProfileInfo(token) {
    apiAuth.validate(token)
      .then((user) => {
        setLoggedIn(true);
        setUserData(user);
        setNextLevelAt(levelTab[user.level]);
        navigate('/');
        console.log(user);
        })
      .then(() => {
        api.getTrials()
          .then(({ trials, challenges, actions }) => {
            setChallenges(challenges);
            setActions(actions);
            setTrials(trials);
            console.log({ trials, challenges, actions })
          })
          .catch((err) => {
            console.log(err);
          })
        api.getActivities()
          .then(({ activities, zones }) => {
            const upgradeCostTier = zones.filter((zone) => zone.bought === true).length;

            setAvailableActivities(activities.filter((activity) => activity.bought === false));
            setCurrentActivities(activities.filter((activity) => activity.bought === true));
            setZones(zones);
            setUpgradeCost(upgradeCostTab[upgradeCostTier]);
            setIsLoading(false);
          })
      })  
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
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
    api.purchaseActivity(activityId, userData.wp, userData.slots)
      .then(({ boughtActivity, updatedUser }) => {
        const boughtItemIndex = findBoughtItem(availableActivities, boughtActivity.name);
        availableActivities.splice(boughtItemIndex, 1);
        currentActivities.push(boughtActivity);
        setUserData({ ...userData, slots: updatedUser.slots });
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
        const boughtItemIndex = findBoughtItem(zones, purchasedZone.name);
        zones[boughtItemIndex] = purchasedZone;
        setUserData({...userData, wp: updatedUser.wp, slots: updatedUser.slots});

        const upgradeCostTier = zones.filter((zone) => zone.bought === true).length;
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

    const wpToEarn = calculateRewards(values, 'currentValue');
    console.log({ values, wpToEarn, nextLevelAt, userData });

    setIsDataSent(true);
    api.endDay({ values, wpToEarn, nextLevelAt, userData })
      .then(({ user, updatedActivities }) => {
        console.log({ user, updatedActivities });
        setCurrentActivities(distributeResults(updatedActivities, currentActivities));
        setIsDataSent(false);
        setUserData(user);
        setNextLevelAt(levelTab[user.level]);
      })
  }

  useEffect(() => {
    handleAuthorize();
  }, []);

  return (
    <ResourceContext.Provider value={{wp: userData.wp, slots: userData.slots }}>
      <div className={`page ${isLoading ? 'page_loading' : ''}`}>
        <Header
          userData={userData}
          logout={logout}
          loggedIn={loggedIn}
          levelProgress={`${userData.xp} / ${levelTab[userData.level]}`}
        />
            
        <Routes>

          <Route
            exact path='*'
            element={ loggedIn ?
              <Main
                availableActivities={availableActivities}
                currentActivities={currentActivities}
                trials={trials}
                challenges={challenges}
                actions={actions}
                zones={zones}
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