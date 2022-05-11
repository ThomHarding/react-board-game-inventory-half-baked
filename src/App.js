import { useState, useEffect } from 'react';
import { getUser } from './services/fetch-utils';
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
  Redirect,
} from 'react-router-dom';
import AuthPage from './AuthPage';
import DetailPage from './DetailPage';
import ListPage from './ListPage';
import CreatePage from './CreatePage';

import './App.css';
import { logout } from './services/fetch-utils';

export default function App() {
  const [email, setEmail] = useState();
  const [token, setToken] = useState();
  // You'll need to track the user in state

  useEffect(() => {
    // this will keep us from losing state on every reload. this way we don't have to log in every time we refresh the page.
    const user = getUser();

    if (user) {
      setToken(user.access_token);
      setEmail(user.user.email);
    }
  
  }, []);
  // add a useEffect to get the user and inject the user object into state on load

  async function handleLogout() {
    await logout();
    setEmail('');
    setToken('');
    // call the logout function
    // clear the user in state
  }

  return (
    <Router>
      <div className='App'>
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/ListPage">Board Games List</NavLink>
              </li>
              <li>
                <NavLink to="/CreatePage">Create</NavLink>
              </li>
              <li>
                <p>{email}</p>
                <p>{token}</p>
                <button onClick={handleLogout}>Log out</button>
              </li>
            </ul>
          </nav>
          {/* if there is a user in state, render out a link to the board games list, the create page, and add a button to let the user logout */}
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              {
                token
                  ? <Redirect to="/ListPage" /> 
                  : <AuthPage setEmail={setEmail} setToken={setToken} />
              }
              {/* if there is a user, redirect to the board games list. Otherwise, render the auth page. Note that the AuthPage will need a function called setUser that can set the user state in App.js */}
            </Route>
            <Route exact path="/board-games">
              {
                token
                  ? <ListPage /> 
                  : <AuthPage setEmail={setEmail} setToken={setToken} />
              }
              {/* if there is a user, render the board games list. Otherwise, redirect to the home route/auth page */}
            </Route>
            <Route exact path="/board-games/:id">
              {
                token
                  ? <DetailPage /> 
                  : <AuthPage setEmail={setEmail} setToken={setToken} />
              }
              {/* if there is a user, render the detail page. Otherwise, redirect to the home route/auth page */}
            </Route>
            <Route exact path="/create">
              {
                token
                  ? <CreatePage /> 
                  : <AuthPage setEmail={setEmail} setToken={setToken} />
              }
              {/* if there is a user, render the create page. Otherwise, redirect to the home route/auth page */}
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}