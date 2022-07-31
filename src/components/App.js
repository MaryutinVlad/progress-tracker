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
      .then(userData => {
        setSignedUp(true);
        navigate('/signin');
      })
      .catch(err => console.log(err));
  }

  function testRequest() {
    const token = localStorage.getItem('jwt');
    apiAuth.test(token)
      .then((res) => {
        console.log(res);
      })
  }
  
  function handleAuthorize() {
    if (!localStorage.getItem('jwt')) {
      return;
    }
    const token = localStorage.getItem('jwt');
    apiAuth.validate(token)
      .then((res) => {
        console.log(res);
        setLoggedIn(true);
        navigate('/');
        })
      .catch(err => console.log(err));  
  }

  function logout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/signin');
  }

  useEffect(() => {
    handleAuthorize();
  }, []);

  return (
    <div className='page'>
      <Header/>
            
      <Routes>

        <Route
          exact path='/' 
          element={ loggedIn ? <Main test={testRequest} logout={logout} /> : <Navigate to='/signin' />}
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