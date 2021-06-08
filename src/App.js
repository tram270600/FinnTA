import { Provider } from 'react-redux';
import {BrowserRouter, Route} from "react-router-dom";
import store from 'app/store';
import routes from './utils/route';
import { Suspense } from 'react';
function App() {

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
