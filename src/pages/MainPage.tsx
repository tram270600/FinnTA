import 'index.css'
import HeroSection from 'components/MainPage/HeroSection'
import NavBar from 'components/Dashboard/NavBar'
import Cards from 'components/MainPage/Cards'
import News from 'components/MainPage/News'
import Subscribe from 'components/MainPage/Subscribe'
import Footer from 'components/MainPage/Footer'
import { useCallback, useEffect, useState } from 'react'
import jwtDecode, { JwtPayload } from "jwt-decode";
import { useAppDispatch, useTypedSelector } from 'app/store'
import { getAllDepartment } from 'reducer/thunks/DepartmentThunk'
import { connect } from 'app/ws'
import { unwrapResult } from '@reduxjs/toolkit'

const MainPage = () => {
    const [loggedIn, setLoggedIn] = useState(true)
    const department = useTypedSelector(state => state.Department)
    const getDepartment = useCallback(async () => {
        if (Object.keys(department.data).length === 0) {
            try {
                const res = await dispatch(getAllDepartment())
                unwrapResult(res)
            } catch (error) {
                alert(`Loading error: ${error.message}`)
                return
            }
        }
    }, [])
    useEffect(() => { getDepartment() }, [])
    useEffect(() => {
        console.log("Check Logged in")

        let token = localStorage.getItem("jwt")
        if (token !== null) {
            // Check expired token
            let token_exp = jwtDecode<JwtPayload>(token).exp
            // if expired -> not logged in + delete token
            if (token_exp !== undefined) {
                if (token_exp > Date.now() / 1000) {
                    setLoggedIn(true)
                    console.log("Logged in")
                    return
                }
            }
        }
        localStorage.clear()
    }, [])



    const dispatch = useAppDispatch()
    const account = useTypedSelector(state => state.Account)
    useEffect(() => {
        (async () => {
            if (account.data.Name !== undefined) {
                dispatch(connect(account.data._id))
            }
        })()
    }, [])

    return (
        <>
            <NavBar />
            <HeroSection />
            <Cards />
            <News />
            <Subscribe />
            <Footer />
        </>
    )
}
export default MainPage
