import '../index.css'
import HeroSection from '../components/HeroSection'
import NavBar from '../components/NavBar'
import Cards from '../components/Cards'
import News from '../components/News'
import Subscribe from '../components/Subscribe'
import Footer from '../components/Footer'
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
