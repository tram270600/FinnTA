import React from "react";

const Login = React.lazy(() => import('pages/login/login'))
const MainPage = React.lazy(() => import('pages/MainPage'))
const ProfileDash = React.lazy(() => import('pages/ProfileDash'))
const SignUp = React.lazy(() => import('pages/SignUp'))

type Routes = {
    Path: string,
    Component: JSX.Element,
    isExact: boolean,
    Scope: "Global" | "T.A" | "Student" | "User",
}

const routes: Routes[] = [
    {
        Path: '/',
        Component: <MainPage />,
        isExact: true,
        Scope: "Global"
    },

    {
        Path: '/login',
        Component: <Login />,
        isExact: false,
        Scope: "Global"
    },

    {
        Path: '/signup',
        Component: <SignUp />,
        isExact: false,
        Scope: "Global"
    },

    {
        Path: '/profile',
        Component: <ProfileDash />,
        isExact: false,
        Scope: "User"
    },
]

export default routes;