import React from "react";
import { Redirect, RouteChildrenProps, RouteComponentProps } from "react-router-dom";

const MainPage = React.lazy(() => import('pages/MainPage'))
const Login = React.lazy(() => import('pages/login'))
const SignUp = React.lazy(() => import('pages/SignUp'))
const ProfileDash = React.lazy(() => import('pages/ProfileDash'))
const SearchPage = React.lazy(() => import('pages/SearchPage'))

type Routes = {
    Path: string | undefined,
    Component?: JSX.Element,
    isExact: boolean,
    Render?: Function,
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
        Path: '/search',
        Component: <SearchPage />,
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
        Render: (props: any) => {
            console.log(props)
            return <ProfileDash isGuest={true} {...props} />
        },
        isExact: false,
        Scope: "Global"
    },
    {
        Path: undefined,
        Component: <Redirect to='/'></Redirect>,
        isExact: true,
        Scope: "Global"
    },
]

export default routes;