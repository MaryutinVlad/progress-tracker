import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Auth from './Auth';
import apiAuth from '../utils/apiAuth';
import api from '../utils/api';
import LocalModePopup from './LocalModePopup';
import { ResourceContext } from '../contexts/ResourceContext';
import { levelTab, upgradeCostTab } from '../utils/tabs';
import { findBoughtItem, calculateRewards, distributeResults } from '../utils/functions';
import localUser from '../resources/localUser.json';
import localActivities from '../resources/listOfActivities.json';
import localZones from '../resources/zoneList.json';
import localAchievements from '../resources/listOfAchievements.json';
import localActions from '../resources/listOfActions.json';
import localChallenges from '../resources/listOfChallenges.json';
import localTrials from '../resources/listOfTrials.json';

//info for drawing (default size)
//challenge's image size 380x158 px
//trial's image size 250x128 px
//activity's image size 128x128 px

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [isDataSent, setIsDataSent] = useState(false);
  const [isLocalModePopupShown, setIsLocalModePopupShown] = useState(false);
  const [isLocalMode, setIsLocalMode] = useState(false);
  const [isLogoBigger, setIsLogoBigger] = useState(true);
  const [currentActivities, setCurrentActivities] = useState(
    localActivities.filter(activity => activity.bought)
  );
  const [availableActivities, setAvailableActivities] = useState(
    localActivities.filter(activity => !activity.bought)
  );
  const [trials, setTrials] = useState(localTrials);
  const [challenges, setChallenges] = useState(localChallenges);
  const [actions, setActions] = useState(localActions);
  const [achievements, setAchievements] = useState(localAchievements);
  const [zones, setZones] = useState(localZones);
  const [userData, setUserData] = useState(localUser);
  const [upgradeCost, setUpgradeCost] = useState(
    upgradeCostTab[localZones.filter(zone => zone.bought).length]
  );
  const [nextLevelAt, setNextLevelAt] = useState(levelTab[localUser.level]);

  const navigate = useNavigate();

  function retrieveProfileInfo(token) {
    apiAuth.validate(token)
      .then((user) => {
        setLoggedIn(true);
        setUserData(user);
        setNextLevelAt(levelTab[user.level]);
        navigate('/');
        console.log(user);
        setIsLogoBigger(false);
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
            const upgradeCostTier = zones.filter((zone) => zone.bought).length;

            setAvailableActivities(activities.filter((activity) => !activity.bought));
            setCurrentActivities(activities.filter((activity) => activity.bought));
            setZones(zones);
            setUpgradeCost(upgradeCostTab[upgradeCostTier]);
            api.getAchievements()
              .then((achievements) => {
                setAchievements(achievements);
                console.log(achievements);
              })
          })
      })  
      .catch(err => {
        console.log(err);
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

  function handleLocalModeClick(isShown) {
    setIsLocalModePopupShown(isShown);
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
    setIsLogoBigger(true);
  }

  function enableLocalMode() {
    setIsLocalMode(true);
    setIsLogoBigger(false);
    if (localStorage.getItem('ptracker-local-user')) {
      const { availableActivities, currentActivities } = JSON.parse(localStorage.getItem('ptracker-local-activities'));
      setCurrentActivities(currentActivities);
      setAvailableActivities(availableActivities);
      const zones = JSON.parse(localStorage.getItem('ptracker-local-zones'));
      setZones(zones);
      setUserData(JSON.parse(localStorage.getItem('ptracker-local-user')));
      setUpgradeCost(upgradeCostTab[zones.filter(zone => zone.bought).length]);
    }
    navigate('/');
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
        const boughtItemIndex = findBoughtItem(zones, purchasedZone.name, 'name');
        zones[boughtItemIndex] = purchasedZone;
        setUserData({...userData, wp: updatedUser.wp, slots: updatedUser.slots});

        const upgradeCostTier = zones.filter((zone) => zone.bought).length;
        setUpgradeCost(upgradeCostTab[upgradeCostTier]);
      })
      .catch((err) => {
        console.log(err)
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

  function handleUpgradeLocally(activityId, rank) {

    const updatedUser = {...userData, wp: userData.wp - upgradeCost};
    currentActivities.find(item => item._id === activityId).rank = rank;

    setUserData(updatedUser);
    localStorage.setItem('ptracker-local-user', JSON.stringify(updatedUser));
    localStorage.setItem('ptracker-local-activities', JSON.stringify({availableActivities, currentActivities}));
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

  //functions for local mode
    function purchaseZoneLocally(zoneId) {
      const { index, item } = findBoughtItem(zones, zoneId, '_id');
      zones[index].bought = true;

      const updatedUser = {...userData, wp: userData.wp - item.cost, slots: userData.slots + 2};
      setUserData(updatedUser);
      setUpgradeCost(upgradeCostTab[upgradeCost + 1]);
      localStorage.setItem('ptracker-local-zones', JSON.stringify(zones));
      localStorage.setItem('ptracker-local-user', JSON.stringify({user: updatedUser}))
    }

    function purchaseActivityLocally(activityId) {
      console.log('purchasing activity...', activityId);
      const { index, } = findBoughtItem(availableActivities, activityId, '_id');
      
      availableActivities[index].bought = true;
      currentActivities.push(availableActivities[index]);
      availableActivities.splice(index, 1);

      const updatedUser = {...userData, slots: userData.slots - 1};
      setUserData(updatedUser);
      console.log(availableActivities, currentActivities);
      localStorage.setItem('ptracker-local-activities', JSON.stringify({availableActivities, currentActivities}));
      localStorage.setItem('ptracker-local-user', JSON.stringify(updatedUser));
    }

    function handleEndDayLocally(values) {
      const wpToEarn = calculateRewards(values, 'currentValue');
      const updatedUser = { ...userData, xp: userData.xp + wpToEarn, wp: userData.wp + wpToEarn};
      setUserData(updatedUser);
  
      for(let value in values) {
        currentActivities.find((item) => item.name === value).completed = values[value].totalValue;
      }
      localStorage.setItem('ptracker-local-user', JSON.stringify(updatedUser));
      localStorage.setItem('ptracker-local-activities', JSON.stringify({availableActivities, currentActivities}));
    }

  useEffect(() => {
    handleAuthorize();
    //console.log(localActivities);
    //console.log(localZones);
    //console.log(localUser);
  }, []);

  return (
    <ResourceContext.Provider value={{wp: userData.wp, slots: userData.slots }}>
      <div className='page'>
        <Header
          userData={userData}
          nextLevelAt={nextLevelAt}
          logout={logout}
          loggedIn={loggedIn || isLocalMode}
          levelProgress={
            `${userData.xp} / ${levelTab[userData.level]}`
          }
          biggerLogo={isLogoBigger}
        />

        <LocalModePopup
          isShown={isLocalModePopupShown}
          onCloseClick={handleLocalModeClick}
          onSubmit={enableLocalMode}
        />
            
        <Routes>

          <Route
            exact path='*'
            element={ loggedIn || isLocalMode ?
              <Main
                availableActivities={availableActivities}
                currentActivities={currentActivities}
                trials={trials}
                challenges={challenges}
                actions={actions}
                zones={zones}
                achievements={achievements}
                onPurchaseActivity={isLocalMode ? purchaseActivityLocally : handlePurchaseActivity}
                onPurchaseZone={isLocalMode ? purchaseZoneLocally : handlePurchaseZone}
                onMapRestart={handleMapRestart}
                onUpgradeActivity={isLocalMode ? handleUpgradeLocally : handleUpgradeClick}
                onEndDay={isLocalMode ? handleEndDayLocally : handleEndDay}
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
                onLocalModeClick={handleLocalModeClick}
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
                onLocalModeClick={handleLocalModeClick}
              />
            }
          />

        </Routes>

      </div>
    </ResourceContext.Provider>
  )
}

export default App;