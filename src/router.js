import React, {BrowserRouter, Route} from 'react';
import Auth from './auth';
import Login from './login';


function Router(){
    return(
        <div class="Router">
            <BrowserRouter>
                <main className="form-signin">
                    <Route path="/" exact component={()=><Auth/>}/>
                    <Route path="/login" component={Login}/>
                </main>
            </BrowserRouter>
        </div>
    )
}

export default Router;