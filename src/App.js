import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Auth from './auth';
import Login from './login.tsx';
import MainPage from './pages/MainPage'
import ProfileDash from './pages/ProfileDash'
function App() {

  return (
    <div class="App">
        <BrowserRouter>
          {/* <Route path = '/' exact component = {MainPage} /> */}
              {/* <main className="form-signin">
                  <Route path="/" exact component={Auth}/>
                  <Route path="/login" component={Login}/>
              </main> */}
            <Route path = '/profile' exact component = {ProfileDash} />
          </BrowserRouter>
    </div>
  );
}

export default App;
