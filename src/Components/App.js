import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import SearchResult from './SearchResult';
import CarDetails from './CarDetails';
import TopBar from './TopBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-image-gallery/styles/css/image-gallery.css'
import '../App.css';
import { FetchCars } from './Firebase';

export const CarObjectModel = {
    "Year": "",
    "Odometer": "",
    "Make": "",
    "Model": "",
    "Series": "",
    "Damage Type": "",
    "Damage Location": "",
    "Exterior": "",
    "Interior": "",
    "Body Style": "",
    "Transmission": "",
    "Drive": "",
    "Engine": "",
    "Cylinders": "",
    "Title": "",
    "Airbags": "",
    "Start Code": "",
    "Key": "",


};

export default function App() {

    const [Cars, setCars] = useState([]);
    const [DisplayedCars, setDisplayedCars] = useState([{ Empty: true }]);


    async function GetCars() {

        if (localStorage.getItem("Cars") === null) {
            const AllCars = await FetchCars();
            setCars(AllCars);
            setDisplayedCars(AllCars);
            localStorage.setItem("Cars", JSON.stringify(AllCars));
            sessionStorage.setItem("DisplayedCars", JSON.stringify(AllCars));
        }
        else {
            setCars(JSON.parse(localStorage.getItem("Cars")));
            Cars.map((Car) => {

            })
        }


    }



    function SetDisplayedCars(FilteredCars) {
        setDisplayedCars(FilteredCars);
    }

    useEffect(() => {
        GetCars();
    }, []);

    useEffect(() => {
        if (DisplayedCars.length > 0 && DisplayedCars[0].Empty !== undefined) {
            if (sessionStorage.getItem("DisplayedCars") !== null) {
                setDisplayedCars(JSON.parse(sessionStorage.getItem("DisplayedCars")));
            }
            else {
                setDisplayedCars([{}]);
            }
        }

        else {
            localStorage.setItem("DisplayedCars", JSON.stringify(DisplayedCars));
        }


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
