
import './App.css';
import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


import Home from './pages/Home';
import UserProfile from './pages/User_Profile';
import Layout from './layout/Layout';
import Auth from './pages/Auth';
import { loginActions } from "./store/login-slice";
import Forbidden from './pages/Forbidden';
function App() {
  const isLoggedIn = useSelector(state => state.login.isLoggedin);
  const dispatch = useDispatch();
  console.log(isLoggedIn, "Is log in");

  useEffect(() => {
    if (localStorage.getItem("TEST_TOKEN")) {
      dispatch(loginActions.stayLoggedIn());
    };

  }, [])
  return (
    < >
      <Layout>
        <Routes>
          <Route path='/' element={<Navigate to="/home" />} />
          <Route path='/home' element={<Home />} />

          {isLoggedIn && <Route path='/user-profile' element={<UserProfile />} />}
          <Route path='/authentication' element={isLoggedIn ? <Navigate replace to="/home" /> : <Auth />} />
          <Route path='*' element={<Forbidden />} />
        </Routes>
      </Layout>

    </>
  );
}

export default App;
