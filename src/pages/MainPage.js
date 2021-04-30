import '../index.css'
import HeroSection from '../components/HeroSection'
import NavBar from '../components/NavBar'
import Cards from '../components/Cards'
import News from '../components/News'
const MainPage = () => {
    return(
        <>
            <NavBar />
            <HeroSection />
            <Cards />
            <News />
        </>
    )
}
export default MainPage
