import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Main from './Main';
import Auth from './Auth';
import apiAuth from '../utils/apiAuth';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [backendData, setBackendData] = useState([{}]); 

  const navigate = useNavigate();

  function handleSignIn(data) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.email === data.email && user.password === data.password) {
      setLoggedIn(true);

      navigate('/');
    }
  }

  function handleSignUp(data) {
    apiAuth.register(data)
      .then(userData => {
        console.log(userData);
        setSignedUp(true);
        navigate('/signin');
      })
      .catch(err => console.log(err));
  }
  
  function handleAuthorize() {
    if (localStorage.getItem('jwt')) {
      setLoggedIn(true);
      navigate('/');
    }
  }

  useEffect(() => {
    apiAuth.test()
      .then(res => setBackendData(res));
  }, []);

  return (
    <div className='page'>
      <Header/>
            
      <Routes>

        <Route
          exact path='/' 
          element={ loggedIn ? <Main /> : <Navigate to='/signin' />}
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