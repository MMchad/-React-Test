import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import SearchResult from './SearchResult';
import CarDetails from './CarDetails';
import TopBar from './TopBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-image-gallery/styles/css/image-gallery.css'
import '../App.css';
import { FetchCars } from './Firebase';



export default function App() {

    const LocalStorageCars = JSON.parse(localStorage.getItem("Cars"));
    const SessionDisplayedCars = JSON.parse(sessionStorage.getItem("DisplayedCars"));
    const [Cars, setCars] = useState(LocalStorageCars === null ? [] : LocalStorageCars);
    const [DisplayedCars, setDisplayedCars] = useState(SessionDisplayedCars === null ? [{}] : SessionDisplayedCars);


    async function GetCars() {
        const AllCars = await FetchCars();
        setCars(AllCars);
        setDisplayedCars(AllCars);
        localStorage.setItem("Cars", JSON.stringify(AllCars));
        sessionStorage.setItem("DisplayedCars", JSON.stringify(AllCars));

    }



    function SetDisplayedCars(FilteredCars) {
        setDisplayedCars(FilteredCars);
    }

    useEffect(() => {
        if (LocalStorageCars === null || SessionDisplayedCars === null) {
            GetCars();
        }

    }, []);

    useEffect(() => {
        sessionStorage.setItem("DisplayedCars", JSON.stringify(DisplayedCars));
    }, [DisplayedCars]);

    return (

        <div className='App'>
            <TopBar />
            <Routes>
                <Route path="/" element={<SearchResult Cars={Cars} DisplayedCars={DisplayedCars} SetDisplayedCars={SetDisplayedCars} />} />
                <Route path="/CarDetails/:Car_ID" element={<CarDetails />} />
            </Routes>
        </div>
    )
}
