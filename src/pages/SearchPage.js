import '../styles/Search.scss'
import '../index.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import NavBar from '../components/Dashboard/NavBar'
import { useState } from 'react'
import Card from 'components/MainPage/Cards'
import CardGrid from 'components/Dashboard/CardGrid';
import Footer from 'components/MainPage/Footer';

const SearchPage = (props) => {
    const [query, setQuery] = useState()
    const [search, setSearch] = useState("")
    const [isLoading, setLoading] = useState(false)
    return (
        <div className='view-container'>
            <div className='profileDash'>
                <NavBar />
            </div>
            <div className='dash-search'>
                <div class='search-bar'>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        size="20px"
                        placeholder=" Type in the course or Teaching Assistant you are looking for..."
                        onChange={(e) => {
                            setQuery(e.target.value)
                        }} required />

                    <div className='search-button' onClick={() => {
                        if (!isLoading)
                            setSearch(query)
                    }}>
                        <i class="fas fa-search"></i>
                    </div>
                </div>

            </div>
            {isLoading ? <Loader
                className="loader"
                type="Puff"
                color="#FE7A15"
                height={100}
                width={100}
                timeout={10000} //10 secs
            /> : <></>}
            <Card name={search} setLoading={setLoading} />
            <CardGrid keyword={search} />
            <Footer />
        </div>
    )
}
export default SearchPage