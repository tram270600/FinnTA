import 'index.css'
import HeroSection from 'components/MainPage/HeroSection'
import NavBar from 'components/MainPage/NavBar'
import Cards from 'components/MainPage/Cards'
import News from 'components/MainPage/News'
import Subscribe from 'components/MainPage/Subscribe'
import Footer from 'components/MainPage/Footer'
const MainPage = () => {
    return(
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
