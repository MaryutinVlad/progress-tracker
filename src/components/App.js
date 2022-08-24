import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Auth from './Auth';
import apiAuth from '../utils/apiAuth';
import api from '../utils/api';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [backendData, setBackendData] = useState([{}]); 
  const [userEmail, setUserEmail] = useState('');

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
      .then((res) => {
        console.log(res);
        setUserEmail(res.email);
        setLoggedIn(true);
        navigate('/');
        })
      .then(() => {
        api.getActivities()
          .then((data) => {
            setBackendData(data);
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
    console.log(id);
    api.makeCurrent(id)
      .then((res) => {
        console.log(res);
      })
  }

  useEffect(() => {
    handleAuthorize();
  }, []);

  return (
    <div className='page'>
      <Header logout={logout} loggedIn={loggedIn} email={userEmail} />
            
      <Routes>

        <Route
          exact path='*' 
          element={ loggedIn ? <Main activities={backendData} onClickEvent={handleClickEvent} /> : <Navigate to='/signin' />}
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
  )
}

export default App;