import 'index.css'
import HeroSection from 'components/MainPage/HeroSection'
import * as DefaultNav from 'components/MainPage/NavBar'
import * as UserNav from 'components/Dashboard/NavBar'
import Cards from 'components/MainPage/Cards'
import News from 'components/MainPage/News'
import Subscribe from 'components/MainPage/Subscribe'
import Footer from 'components/MainPage/Footer'
import { useEffect, useState } from 'react'
import jwtDecode, { JwtPayload } from "jwt-decode";

const MainPage = () => {
    const [loggedIn, setLoggedIn] = useState(true)
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

    return (
        <>
            {/* Put LoggedIn into NavBar then do sth 😐 */}
            {loggedIn ? <UserNav.default /> : <DefaultNav.default />}
            <HeroSection />
            <Cards />
            <News />
            <Subscribe />
            <Footer />
        </>
    )
}
export default MainPage
