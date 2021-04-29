import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Auth from './auth';
import Login from './login.tsx';
function App() {

  return (
    <div class="App">
        <BrowserRouter>
              <main className="form-signin">
                  <Route path="/" exact component={Auth}/>
                  <Route path="/login" component={Login}/>
              </main>
          </BrowserRouter>
    </div>
  );
}

export default App;
