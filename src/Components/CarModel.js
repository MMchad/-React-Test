
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FetchCarThubmnail } from './Firebase.jsx';
import CarModel_SM from './CarModel_SM';
import CarModel_LG from './CarModel_LG';
import Loading from '../Assets/Loading_SM.gif'
import Stack from 'react-bootstrap/Stack'

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
            <Stack gap={1} className=' d-none d-lg-flex ps-5 pe-5 d-flex align-items-center justify-content-center'>
                <CarModel_LG Car={Car} CarImage={CarImage} HandleClick={HandleClick} />
            </Stack>

            <Stack gap={1} className=' d-lg-none d-md-block ps-1 pe-1 pt-3 pb-2 d-flex align-items-center justify-content-center'>
                <CarModel_SM Car={Car} CarImage={CarImage} HandleClick={HandleClick} />
            </Stack>

        </>
    )
}
