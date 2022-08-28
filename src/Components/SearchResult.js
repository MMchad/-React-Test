import { useState, useEffect, React } from 'react'
import CarModel from './CarModel';
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import { default as FiltersTable } from './Filters';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function SearchResult({ Cars, DisplayedCars, SetDisplayedCars }) {
    const [Filters, setFilters] = useState({ Empty: true });
    const [SearchTerm, setSearchTerm] = useState("");
    const [show, setShow] = useState(false);

    const HandleClose = () => setShow(false);
    const HandleShow = () => setShow(true);

    function SetFilters(FiltersToSet) {
        setFilters(FiltersToSet);
    }
    function SearchForCar(e) {
        e.preventDefault();
        sessionStorage.setItem("SearchTerm", document.getElementById("CarSearchbar").value);
        SearchCars();
    }

    function UpdateSearchTerm(e) {
        setSearchTerm(e.target.value);
    }

    async function SearchCars() {
        var FilteredCars = Cars.filter(Car => Car.Title.replace(/ /g, '').toUpperCase().includes(SearchTerm.replace(/ /g, '').toUpperCase()));
        if (Object.keys(Filters).length > 0) {
            Object.keys(Filters).map(Key => {
                if (Key === "Year" || Key === "Odometer") {
                    FilteredCars = (FilteredCars.filter(Car => {
                        const ParsedKey = parseInt(Car[Key].replace(/\D/g, ''))
                        const ParsedFilter = [parseInt(Filters[Key][0].replace(/\D/g, '')), parseInt(Filters[Key][1].replace(/\D/g, ''))]
                        return (ParsedKey >= ParsedFilter[0] && ParsedKey <= ParsedFilter[1]);
                    }));
                }
                else {

                    if (Filters[Key] != undefined && Filters[Key].length > 0) {
                        FilteredCars = (FilteredCars.filter(Car =>
                            Filters[Key].some(Value =>
                                Car[Key].replace(/ /g, '').toUpperCase().includes(Value.replace(/ /g, '').toUpperCase())
                            )
                        ));

                    }

                }

            });
        }
        SetDisplayedCars(FilteredCars);
    }









    useEffect(() => {
        SearchCars();
    }, [Filters]);

    useEffect(() => {
        if (sessionStorage.getItem("SearchTerm") !== null) {
            setSearchTerm(sessionStorage.getItem("SearchTerm"))
        }

    }, []);


    return (
        <Container className="vh-100 SearchContainer" fluid >
            <Row className="vh-100 " >

                <Col className="p-0 FiltersTab d-none d-lg-block ">
                    <FiltersTable Cars={Cars} DisplayedCars={DisplayedCars} SearchCars={SearchCars} Filters={Filters} setFilters={setFilters} />

                    <Modal show={show} fullscreen={true} onHide={HandleClose}>
                        <Modal.Header closeButton>
                            &nbsp;
                        </Modal.Header>
                        <Modal.Body>
                            <FiltersTable Cars={Cars} DisplayedCars={DisplayedCars} SearchCars={SearchCars} Filters={Filters} setFilters={setFilters} />
                        </Modal.Body>
                    </Modal>

                </Col>

                <Col className='p-0' style={{ backgroundColor: "rgb(243, 241, 241)" }}>
                    <Stack className="p-0">

                        <div className='SearchBarDiv d-flex flex-row p-1 bg-white mw-100 w-100'>
                            <Button variant="dark" onClick={HandleShow} className="FiltersOffCanvasButton p-0 mt-auto mb-auto p-2 ms-1 d-md-block d-lg-none">
                                <span className="material-symbols-outlined m-auto">
                                    tune
                                </span>
                            </Button>

                            <form onSubmit={SearchForCar} className="mw-100 w-100 d-flex ms-2">
                                <input
                                    placeholder='Search'
                                    className='SearchBar flex-grow-1 mt-auto mb-auto p-3'
                                    id="CarSearchbar"
                                    value={SearchTerm}
                                    onChange={UpdateSearchTerm}
                                />
                                <button
                                    type="sumbit"
                                    id="SubmitSearch"
                                    className="h-100 align-middle bg-white me-3"
                                >
                                    <span
                                        className="material-symbols-outlined text-dark"
                                        style={{ fontSize: "4vh" }}
                                    >

                                        search
                                    </span>
                                </button>
                            </form>
                        </div>
                        <div className="CarListContainer mh-100 h-100 ">
                            <Stack gap={1} className='ps-5 pe-5 pt-3 pb-2 d-flex align-items-center justify-content-center'>
                                {DisplayedCars.map((Car) =>
                                (
                                    Car.Empty === undefined ? <CarModel Car={Car} Cars={DisplayedCars} /> : <></>
                                ))}
                            </Stack>
                        </div>
                    </Stack>
                </Col>
            </Row>



        </Container >
    )
}