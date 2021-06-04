import { Provider } from 'react-redux';
import {BrowserRouter, Route} from "react-router-dom";
import store from 'app/store';
import routes from './utils/route';
function App() {

  return (
      <div className="App">
          <BrowserRouter>
                {routes.map((route, i)=>{
                  return <Route key={i} path={route.Path} exact={route.isExact}>
                    {route.Component}
                  </Route>
                })}
            </BrowserRouter>
      </div>
  );
}
export default App;
