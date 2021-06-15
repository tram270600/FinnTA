import React from "react";

const MainPage = React.lazy(() => import('pages/MainPage'))
const Login = React.lazy(() => import('pages/login'))
const SignUp = React.lazy(() => import('pages/SignUp'))
const ProfileDash = React.lazy(() => import('pages/ProfileDash'))

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
        Component: <ProfileDash isGuest={false} />,
        isExact: true,
        Scope: "User"
    },
    {
        Path: '/profile/:id',
        Component: <ProfileDash isGuest={true} />,
        isExact: false,
        Scope: "Global"
    }
]

export default routes;