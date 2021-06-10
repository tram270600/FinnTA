import React from "react";

const Login = React.lazy(() => import('pages/login/login'))
const MainPage = React.lazy(() => import('pages/MainPage'))
const ProfileDash = React.lazy(() => import('pages/ProfileDash'))
const SignUp = React.lazy(() => import('pages/SignUp'))
const CourseDash = React.lazy(() => import('pages/CourseDash'))
const NotiDash = React.lazy(() => import('pages/NotiDash'))

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
        Path: '/taprofile',
        Component: <ProfileDash />,
        isExact: false,
        Scope: "T.A"
    },

    {
        Path: '/tacourse',
        Component: <CourseDash />,
        isExact: false,
        Scope: "T.A"
    },

    {
        Path: '/tanoti',
        Component: <NotiDash />,
        isExact: false,
        Scope: "T.A"
    }

]

export default routes;