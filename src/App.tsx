import { BrowserRouter, Route } from "react-router-dom";
import routes from './utils/route';
import { Suspense } from 'react';
import { useAppDispatch, useTypedSelector } from "app/store";
import { disconnect } from "app/ws";

function App() {
  const dispatch = useAppDispatch()
  window.onbeforeunload = function () {
    dispatch(disconnect())
    if (localStorage.getItem("jwt") === null)
      localStorage.clear();
  }

  const user = useTypedSelector(state => state.Account)

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          {routes.filter((route) => {
            // Remove 2 lines below to test routes without login
            if (route.Scope === "User" && user.data.Role === undefined)
              return false
            return true
          })
            .map((route, i) => {
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
