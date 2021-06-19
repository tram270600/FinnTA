import '../styles/Search.scss'
import '../index.css'
import ProfileDashBody from '../components/Dashboard/ProfileDashBody';
import SidebarDash from '../components/Dashboard/SidebarDash';
import NavBar from '../components/Dashboard/NavBar'
import { useEffect, useState } from 'react';
import CourseDashBody from 'components/Dashboard/CourseDashBody';
import NotiDashBody from 'components/Dashboard/NotiDashBody';
import ScheduleDashBody from 'components/Dashboard/ScheduleDashBody';
import Footer from 'components/MainPage/Footer';
import { useTypedSelector } from 'app/store';
import Cards from 'components/MainPage/Cards';

const SearchPage = (props) => {
    const [body, setBody] = useState("PROFILE")
    const [isGuest, setGuest] = useState(props.isGuest)
    const uid = useTypedSelector(state => state.Account.data._id)

    const [Search, setSearch] = useState('');
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
                                setSearch(e.target.value)
                            }} required />

                    <div className='search-button'>
                    <i class="fas fa-search" 
                    // onClick={() => handleClick('search')}
                    ></i>
                    </div>
                </div>
              
            </div>
            <Cards />
            <Footer />
        </div>
    )
}
export default SearchPage