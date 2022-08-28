
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FetchCarThubmnail } from './Firebase.jsx';
import CarModel_SM from './CarModel_SM';
import CarModel_LG from './CarModel_LG';
import Loading from '../Assets/Loading_SM.gif'

export default function CarModel({ Car, Cars }) {
    let navigate = useNavigate();
    const [CarImage, setCarImage] = useState(Loading);

    function HandleClick() {
        navigate("/CarDetails/" + Car.ID)

    }

    async function SetImage() {
        const URL = await FetchCarThubmnail(Car.ID);
        setCarImage(URL);
    }

    useEffect(() => {
        SetImage();
    }, [])

    useEffect(() => {
        SetImage();
    }, [Cars])

    useEffect(() => {
    }, [CarImage])
    return (
        <>
            <CarModel_LG Car={Car} CarImage={CarImage} HandleClick={HandleClick} />
            <CarModel_SM Car={Car} CarImage={CarImage} HandleClick={HandleClick} />
        </>
    )
}
