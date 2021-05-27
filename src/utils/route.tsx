import Auth from "../auth";
import Login from "../login";
import MainPage from "../pages/MainPage";
import ProfileDash from "../pages/ProfileDash";

const routes = [
    {'Path':'/',
     'Component': <Auth/>,
     'isExact' : true},

     {'Path':'/login',
     'Component': <Login/>,
     'isExact' : false},

     {'Path':'/mainpage',
     'Component': <MainPage/>,
     'isExact' : false},
     
     {'Path':'/profile',
     'Component': <ProfileDash/>,
     'isExact' : false},
]

export default routes;