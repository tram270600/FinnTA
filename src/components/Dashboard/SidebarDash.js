import { useAppDispatch, useTypedSelector } from 'app/store';
import { disconnect } from 'app/ws';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { logoutAccount } from 'reducer/thunks/AccountThunk';
import talker from 'utils/talker';
import avatar from 'images/avatar.svg'
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

const SidebarDash = ({ body, setBody, isGuest, uid }) => {
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

    const [data, setData] = useState({})
    const getInfo = useCallback(async () => {
        if (isGuest) {
            const res = await talker.Account.getAccount({ ID: uid })

            console.log(res)
            if ((typeof res) === 'string') {
                alert(res)
                return
            }
            if (res.Avatar === "") {
                res.Avatar = avatar
            }
            setData(res)
        }
        else setData(account)
    }, [uid])
    const account = useTypedSelector(state => state.Account.data)

    useEffect(() => {
        getInfo()
    }, [])

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
                <img src={data.Avatar} alt='Avatar' />
                <h2>{data.Name}</h2>
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