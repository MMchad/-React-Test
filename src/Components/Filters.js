import { useState, useEffect, React } from 'react'
import Table from 'react-bootstrap/esm/Table';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Range from 'lodash.range';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import { CarObjectModel } from './App';

export default function Filters({ Cars, Filters, setFilters, SearchCars }) {
    const HideFilters = ["ID", "Title", "Odometer", "Year"];
    const Years = Range(1900, 2024);
    const [FilterUniqueKeys, setFilterUniqueKeys] = useState({});
    const [UniqueKeys, setUniqueKeys] = useState({});
    const [Expanded, setExpanded] = useState({});
    const ExpandClasses = { Expand: "material-icons ms-1 Expand", Collapse: "material-icons ms-1 Collapse" };
    const [ExpandClass, setExpandClass] = useState({});


    function HandleCategory(Category) {
        Expanded[Category] ? setExpandClass((Prev) => ({ ...Prev, [Category]: ExpandClasses.Collapse })) : setExpandClass((Prev) => ({ ...Prev, [Category]: ExpandClasses.Expand }));
        setExpanded((Prev) => ({ ...Prev, [Category]: !Prev[Category] }));
    }

    function SearchUniqueValue(SearchTerm, Category) {
        const Values = UniqueKeys[Category].filter((Value) => Value.replace(/ /g, '').toUpperCase().includes(SearchTerm.replace(/ /g, '').toUpperCase()));
        setFilterUniqueKeys((Prev) => ({ ...Prev, [Category]: Values }));
    }

    function AddFilter(Option, Value) {
        Option === "Odometer" || Option === "Year" ?
            setFilters((Prev) => ({ ...Prev, [Option]: Value }))
            :
            setFilters((Prev) => ({ ...Prev, [Option]: [...IsDefined(Prev[Option]), Value] }));
    }

    function RemoveFilter(Option, Value) {

        var NewFilters = { ...Filters };
        delete NewFilters[Option];

        Option === "Odometer" || Option === "Year" || Filters[Option].length <= 1 ?
            setFilters(NewFilters)
            :
            setFilters((Prev) => ({ ...Prev, [Option]: Prev[Option].filter(ValueToRemove => ValueToRemove !== Value) }));
    }

    function HandleDropdown(Index, e) {
        const Min = document.getElementById("MinYear").innerText;
        const Max = document.getElementById("MaxYear").innerText;
        var NewValue = [];
        Index === 0 ? NewValue = [e.target.text, Max] : NewValue = [Min, e.target.text]
        setFilters((Prev) => ({ ...Prev, ["Year"]: NewValue }));
    }

    function IsDefined(Object) {
        return Object == "undefined" || Object == null ? [] : Object;
    }

    function ValidateOdometer(e) {
        if (e.target.value > 999999) {
            e.target.value = 999999;
        }

        if (e.target.value < 0) {
            e.target.value = 0;
        }
    }

    function ApplyOdometer() {
        const Min = document.getElementById("MinOdometer").value;
        const Max = document.getElementById("MaxOdometer").value;
        if (Min === "" || Max === "") {
            return;
        }

        const Values = [Min, Max];
        AddFilter("Odometer", Values);
    }

    useEffect(() => {
        if (Filters.Empty === undefined) {
            sessionStorage.setItem("Filters", JSON.stringify(Filters));
        }

    }, [Filters]);

    useEffect(() => {
        if (Object.keys(Expanded).length > 0 || Object.keys(ExpandClass).length) {
            sessionStorage.setItem("Expanded", JSON.stringify(Expanded));
            sessionStorage.setItem("ExpandClass", JSON.stringify(ExpandClass));
        }
    }, [Expanded, ExpandClass]);
    useEffect(() => {
        if (Cars.length > 0) {

            Object.keys(CarObjectModel).map((Key) => {
                if (sessionStorage.getItem("Expanded" === null)) {

                }
                if (!HideFilters.includes(Key)) {
                    var Values = Cars.map(Car => Car[Key]);
                    Values = Values.filter((Value, index) => Values.indexOf(Value) === index);
                    Values = Values.filter((Value) => Value.replace(/ /g, '').toUpperCase());
                    setUniqueKeys((Prev) => ({ ...Prev, [Key]: Values }));
                    setFilterUniqueKeys((Prev) => ({ ...Prev, [Key]: Values }));
                }

            });

        }
    }, [Cars]);

    useEffect(() => {
        if (sessionStorage.getItem("Filters") != null) {
            setFilters(JSON.parse(sessionStorage.getItem("Filters")));
        }
        else {
            setFilters({});

        }
        if (sessionStorage.getItem("Expanded") !== null) {
            setExpanded(JSON.parse(sessionStorage.getItem("Expanded")));
            setExpandClass(JSON.parse(sessionStorage.getItem("ExpandClass")));
        }
        else {
            Object.keys(CarObjectModel).map((Key) => {
                setExpanded((Prev) => ({ ...Prev, [Key]: false }))
                setExpandClass((Prev) => ({ ...Prev, [Key]: ExpandClasses.Collapse }));
            });

        }

    }, []);

    return (

        <Table className='Filters '>
            <thead>
                <tr>
                    <th className="bg-dark text-light" style={{ fontFamily: "Roboto Condensed, arial, sans-serif", fontSize: "2vh" }}>
                        Filters
                    </th>
                </tr>
            </thead>
            <tbody>

                {/* Filters------------------------------------------------------------------------------------ */}
                <tr style={{ height: "0px" }}>
                    <td>
                        <div style={{ lineHeight: "5.3vh", maxHeight: "350px", overflowY: "auto" }}>
                            {
                                Object.keys(Filters).length > 0 && Filters.Empty === undefined
                                    ?
                                    <>
                                        <Button style={{ fontSize: "1.7vh" }} variant="primary" onClick={() => { setFilters({}) }}>
                                            Filters&nbsp;
                                            <Badge bg="light" text="dark">
                                                {Object.keys(Filters).filter(Key => Key !== "Make").length + IsDefined(Filters.Make).length}
                                            </Badge>
                                            <span className="material-symbols-outlined mt-auto mb-auto text-black align-middle ms-2" style={{ fontSize: "2.5vh" }}>
                                                close
                                            </span>
                                        </Button>
                                        {
                                            Object.keys(Filters).map((Key) => {

                                                return (Key === "Year" || Key === "Odometer"
                                                    ?

                                                    <div className="d-inline" key={Filters.Option}>
                                                        &nbsp;
                                                        <Button style={{ fontSize: "1.7vh" }} variant="primary" onClick={(e) => RemoveFilter(Key, 0)}>
                                                            {Key}:&nbsp;{Filters[Key][0]} to {Filters[Key][1]}
                                                            <span className="material-symbols-outlined mt-auto mb-auto text-black align-middle ms-2" style={{ fontSize: "2.5vh" }}>
                                                                close
                                                            </span>
                                                        </Button>
                                                    </div>

                                                    :
                                                    Filters[Key].map((Value, Index) => {
                                                        return (< div className="d-inline" key={Index} >
                                                            &nbsp;
                                                            <Button style={{ fontSize: "1.7vh" }} variant="primary" onClick={(e) => RemoveFilter(Key, Value)}>
                                                                {Key}:&nbsp;{Value}
                                                                <span className="material-symbols-outlined mt-auto mb-auto text-black align-middle ms-2" style={{ fontSize: "2.5vh" }}>
                                                                    close
                                                                </span>
                                                            </Button>
                                                        </div>)

                                                    })

                                                )

                                            })}
                                    </>
                                    :
                                    <>
                                    </>
                            }



                        </div>
                    </td>
                    {/* /Filters------------------------------------------------------------------------------------ */}
                </tr>


                {Object.keys(UniqueKeys).length > 0 ?
                    <>
                        {/* Year------------------------------------------------------------------------------------ */}
                        <tr style={{ maxHeight: "40px" }}>
                            <th className="bg-dark text-light" onClick={() => HandleCategory("Year")}>
                                <div className="FiltersCategory">
                                    <button className="bg-dark text-light">
                                        Year
                                        <span className={ExpandClass["Year"] + " mt-auto mb-auto align-middle text-white h-auto"} style={{ fontSize: "2vh" }}>
                                            expand_more
                                        </span>
                                    </button>
                                </div>
                            </th>
                        </tr>
                        <tr style={{ height: "0px" }}>
                            <td>
                                <Collapse in={Expanded.Year} style={{ margin: "0px", padding: "0px" }}>
                                    <div>
                                        <div style={{ overflow: "hidden", padding: "10px" }}>
                                            <div style={{ width: "35%", float: "left" }}>
                                                <Form.Label>Min</Form.Label>
                                                <Dropdown>
                                                    <Dropdown.Toggle id="MinYear" className="bg-light text-dark w-100 " style={{ fontSize: "1.7vh", border: "2px solid #212529" }}>
                                                        {
                                                            Filters.Year === undefined
                                                                ?
                                                                Years[0]
                                                                :
                                                                Filters.Year[0]
                                                        }
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu variant="dark" style={{ fontSize: "1.7vh", maxWidth: "15rem", maxHeight: "15vh", overflow: "auto" }}>
                                                        {Years.filter((Year) => Year <= document.getElementById("MaxYear")?.innerText).map((Year) => {
                                                            return (<Dropdown.Item onClick={(e) => HandleDropdown(0, e)}>{Year}</Dropdown.Item>)
                                                        })}

                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            <div style={{ width: "30%", float: "left", height: "70px", textAlign: "center", paddingTop: "35px" }} >
                                                to
                                            </div>
                                            <div style={{ width: "35%", float: "right" }} >
                                                <Form.Label>Max</Form.Label>
                                                <Dropdown>
                                                    <Dropdown.Toggle id="MaxYear" className="bg-light text-dark w-100" style={{ fontSize: "1.7vh", border: "2px solid #212529" }}>
                                                        {
                                                            Filters.Year === undefined
                                                                ?
                                                                Years[Years.length - 1]
                                                                :
                                                                Filters.Year[1]
                                                        }
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu variant="dark" style={{ fontSize: "1.7vh", maxWidth: "15rem", maxHeight: "15vh", overflow: "auto" }}>
                                                        {Years.filter((Year) => Year >= document.getElementById("MinYear")?.innerText).map((Year) => {
                                                            return (<Dropdown.Item onClick={(e) => HandleDropdown(1, e)}>{Year}</Dropdown.Item>)
                                                        })}

                                                    </Dropdown.Menu>
                                                </Dropdown>

                                            </div>
                                        </div>
                                    </div>


                                </Collapse>
                            </td>
                        </tr>

                        {/* Odometer------------------------------------------------------------------------------------ */}
                        <tr style={{ maxHeight: "40px" }}>
                            <th className="bg-dark text-light" onClick={() => HandleCategory("Odometer")}>
                                <div className="FiltersCategory">
                                    <button className="bg-dark text-light">
                                        Odometer
                                        <span className={ExpandClass["Odometer"] + " mt-auto mb-auto align-middle text-white h-auto"} style={{ fontSize: "2vh" }}>
                                            expand_more
                                        </span>
                                    </button>
                                </div>
                            </th>
                        </tr>
                        <tr style={{ height: "0px" }}>
                            <td>
                                <Collapse in={Expanded.Odometer} className="p-0 m-0">
                                    <div style={{}}>
                                        <div style={{ overflow: "hidden", width: "100%", padding: "10px" }}>
                                            <div style={{ height: "6vh", width: "35%", float: "left" }}>
                                                <Form.Label>Min</Form.Label>
                                                {
                                                    IsDefined(Filters.Odometer).length === 0
                                                        ?
                                                        <Form.Control type="number" min="0" max="999999" onChange={ValidateOdometer} placeholder="" id="MinOdometer" className="bg-light text-dark" style={{ fontSize: "1.7vh", border: "2px solid #212529", width: "100%" }} />
                                                        :
                                                        <Form.Control type="number" min="0" max="999999" onChange={ValidateOdometer} placeholder={Filters.Odometer[0]} id="MinOdometer" className="bg-light text-dark" style={{ fontSize: "1.7vh", border: "2px solid #212529", width: "100%" }} />
                                                }

                                            </div>
                                            <div style={{ width: "30%", float: "left", height: "70px", textAlign: "center", paddingTop: "35px" }} >
                                                to
                                            </div>
                                            <div style={{ width: "35%", float: "right" }} >
                                                <Form.Label>Max</Form.Label>
                                                {
                                                    IsDefined(Filters.Odometer).length === 0
                                                        ?
                                                        <Form.Control type="number" min="0" max="999999" onChange={ValidateOdometer} placeholder="" id="MaxOdometer" className="bg-light text-dark" style={{ fontSize: "1.7vh", border: "2px solid #212529", width: "100%" }} />
                                                        :
                                                        <Form.Control type="number" min="0" max="999999" onChange={ValidateOdometer} placeholder={Filters.Odometer[1]} id="MaxOdometer" className="bg-light text-dark" style={{ fontSize: "1.7vh", border: "2px solid #212529", width: "100%" }} />
                                                }
                                            </div>

                                        </div>
                                        <div style={{ overflow: "hidden", padding: "2vh" }}>
                                            <Button style={{ fontSize: "1.7vh", float: "right" }} onClick={ApplyOdometer}>Apply</Button>
                                        </div>
                                    </div>
                                </Collapse>
                            </td>
                        </tr>
                    </ >
                    :
                    <>
                    </>
                }


                {Object.keys(UniqueKeys).map((Key) => {
                    return (
                        <>
                            <tr style={{ height: "40px" }}>
                                <th className="bg-dark text-light" style={{ fontSize: "1.7vh" }} onClick={() => HandleCategory(Key)}>
                                    <div >
                                        <button className="bg-dark text-light">
                                            {Key}
                                            <span className={ExpandClass[Key] + " mt-auto mb-auto align-middle text-white h-auto"} style={{ fontSize: "2vh" }}>
                                                expand_more
                                            </span>
                                        </button>
                                    </div>
                                </th>
                            </tr>
                            <tr style={{ height: "0px" }}>
                                <td>
                                    <Collapse in={Expanded[Key]} style={{ margin: "0px", padding: "0px" }} >
                                        <div className="ps-4 pe-4">

                                            <div className="p-2">
                                                <input
                                                    placeholder={"Search " + Key}
                                                    style={{ height: "3.5vh", width: "100%", border: "1px solid rgba(170, 167, 167, 0.651)", borderRadius: "4px" }}
                                                    onChange={(e) => SearchUniqueValue(e.target.value, Key)}
                                                />
                                            </div>
                                            <br />
                                            <Stack className="p-2" style={{ overflowY: "scroll", maxHeight: "14vh" }}>
                                                {FilterUniqueKeys[Key]?.length > 0
                                                    ?
                                                    FilterUniqueKeys[Key]?.map((UniqueValue) => {
                                                        return (
                                                            <div key={UniqueValue} style={{ fontSize: "1.5vh", padding: "2px" }}>
                                                                <Form.Check
                                                                    type={"checkbox"}
                                                                    id={UniqueValue}
                                                                    label={UniqueValue}
                                                                    checked={Filters[Key]?.includes(UniqueValue) || false}
                                                                    onChange={(e) => {
                                                                        e.target.checked ? AddFilter(Key, e.target.id) : RemoveFilter(Key, e.target.id)
                                                                    }}
                                                                />
                                                            </div>

                                                        )
                                                    })
                                                    :
                                                    <>
                                                    </>
                                                }
                                            </Stack>
                                        </div>
                                    </Collapse>
                                </td>
                            </tr>
                        </>
                    )
                })}
            </tbody>
        </Table >
    )
}
