import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import './App.scss';
import Menu from './components/Menu/Menu';
import Profile from './components/Profile/Profile';
import Travel from './components/Travel/Travel';
import Admin from './components/AdminPage/Admin';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateAccount from './components/LoginPage/CreateAccount';
import SignIn from './components/LoginPage/SignIn';
import { useEffect, useMemo, useState } from 'react';
import { auth } from './firebase';

function App() {
  const [authUser, setAuthUser] = useState();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthUser(user);
    });
    return unsubscribe;
  }, [authUser]);

  const checkedAuth = useMemo(() => {
    if (authUser === undefined) {
      return null;
    }
    if (authUser) {
      return (
        <Router>
          <Menu />
          <Routes>
            <Route path={'/'} element={<HomePage />}/>
            <Route path={'/profile'} element={<Profile />}/>
            <Route path={'/travel'} element={<Travel />}/>
            <Route path={'/admin'} element={<Admin />}/>
            <Route path={'*'} element={<HomePage />}/>
          </Routes>
        </Router>
      );
    }
    return (
      <Router>
        <Routes>
          <Route path={'/'} element={<SignIn/>}/>
          <Route path={'createAccount'} element={<CreateAccount/>}/>
          <Route path={'*'} element={<SignIn/>}/>
        </Routes>
      </Router>);
  }, [authUser]);
  return checkedAuth;

}

export default App;
