import { useAppDispatch } from 'app/store';
import { disconnect } from 'app/ws';
import { useMemo, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { logoutAccount } from 'reducer/thunks/AccountThunk';

const style = {
    color: "#0191B4",
    transform: "scale(1.1)",
    transition: "0.3s all ease-out"
}

const BtnList = {
    "Default": {
        "PROFILE": "far fa-user",
        "COURSE": "fas fa-border-all"
    },
    "User": {
        "CHAT": "far fa-comment-dots",
        "NOTIFICATIONS": "far fa-bell",
        "SCHEDULE": "far fa-calendar-alt",
        "SETTINGS": "fas fa-cog"
    }
}

const SidebarDash = ({ body, setBody, isGuest }) => {
    const useHolver = () => {
        const [holver, setHolver] = useState(false);
        const eventHandler = useMemo(() => ({
            onMouseMove() { setHolver(true); },
            onMouseLeave() { setHolver(false); }
        }), []);
        return [holver, eventHandler];
    }

    const Button = ({ btnName, btnClass, onClick }) => {
        const [holver, eventHandler] = useHolver();

        return (<button
            className='menu-icon'
            onClick={() => onClick ? onClick() : setBody(btnName)}
            {...eventHandler}>
            <i style={(holver || body === btnName) ? style : null} class={btnClass}></i>
            <h3 style={(holver || body === btnName) ? style : null}>{btnName}</h3>
        </button>);
    }

    const dispatch = useAppDispatch()
    const [redirect, setRedirect] = useState(false)
    const handleLogout = async () => {
        console.log("Logged out")
        dispatch(disconnect())
        await dispatch(logoutAccount())
        setRedirect(true)
    }
    if (redirect)
        return <Redirect to="/" />

    return (
        <>
            <div className='avatar inDash'>
                <img src="https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/173675054_1559121364419800_5783364412267366985_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=iYlzD0IeYT4AX8hCA2y&_nc_ht=scontent-hkg4-1.xx&oh=72b4b5442405e38859a0b3c1f8c1e06f&oe=60E0E4ED" alt='Avatar' />
                <h2>Mario Nguyen</h2>
            </div>
            <div className='dash-sidebar-menu'>
                {Object.keys(BtnList).filter((scope) => {
                    if (scope === "User" && isGuest)
                        return false
                    return true
                })
                    .map((scope) => {
                        const btn = BtnList[scope]
                        return Object.keys(btn).map((name) => {
                            return <Button btnClass={btn[name]} btnName={name} />
                        })
                    })}
            </div>
            {isGuest ? <></> :
                <div className='log-out'>
                    <Button btnClass="fas fa-power-off" btnName="LOG OUT" onClick={handleLogout} />
                </div>}
        </>
    )
}
export default SidebarDash