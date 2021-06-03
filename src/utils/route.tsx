import Auth from "../auth";
import Login from "../pages/login/login";
import MainPage from "../pages/MainPage";
import ProfileDash from "../pages/ProfileDash";
import SignUp from "../pages/SignUp";

const routes = [
    {'Path':'/',
     'Component': <Auth/>,
     'isExact' : true},

     {'Path':'/login',
     'Component': <Login/>,
     'isExact' : false},

     {'Path':'/signup',
     'Component': <SignUp/>,
     'isExact' : false},

     {'Path':'/mainpage',
     'Component': <MainPage/>,
     'isExact' : false},
     
     {'Path':'/profile',
     'Component': <ProfileDash/>,
     'isExact' : false},
]

export default routes;