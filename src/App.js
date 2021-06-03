import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import routes from './utils/route';
function App() {

  return (
    <div class="App">
        <BrowserRouter>
              {routes.map((route)=>{
                return <Route path={route.Path} exact={route.isExact}>
                  {route.Component}
                </Route>
              })}
          </BrowserRouter>
    </div>
  );
}
export default App;
