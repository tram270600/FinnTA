import {BrowserRouter, Route} from "react-router-dom";
import routes from './utils/route';
import { Suspense } from 'react';
function App() {
  window.onbeforeunload = function() {
    if(localStorage.getItem("jwt") === null)
      localStorage.clear();
 }
  return (
      <div className="App">
          <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
                {routes.map((route, i)=>{
                  return <Route key={i} path={route.Path} exact={route.isExact}>
                    {route.Component}
                  </Route>
                })}
                </Suspense>
          </BrowserRouter>
      </div>
  );
}
export default App;
