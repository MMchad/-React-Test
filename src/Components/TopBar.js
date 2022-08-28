import Navbar from 'react-bootstrap/Navbar'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';
import NavigateBack from './NavigateBack';

export default function TopBar() {
    const Navigate = useNavigate();
    const Location = useLocation();
    function HandleClick(e) {
        Navigate('/');


    }

    return (
        <Navbar bg="dark" variant="dark" fixed="top" style={{ overflow: "hidden", height: "5.5vh" }}>
            <div className="d-flex w-100">
                <div className="NavigateBackButton text-start">
                    {
                        <Routes>
                            {<Route path="/" element={<></>} />}
                            <Route path="/CarDetails/:Car_ID" element={<NavigateBack />} />
                        </Routes>
                    }
                </div>
                <div className="me-auto ms-auto float-left p-0 mh-100 text-light align-middle" style={{ fontSize: "2.5vh" }}>
                    <button className="h-100 bg-dark text-light" onClick={HandleClick}>
                        React Test
                    </button>
                </div>
                <div style={{ flex: "1" }}>
                    &nbsp;
                </div>
            </div>
        </Navbar >
    )
}
