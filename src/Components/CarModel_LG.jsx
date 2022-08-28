
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CarModel_LG({ Car, CarImage, HandleClick }) {
    return (
        <Table className="Car w-100 rounded d-none d-lg-table" key={Car.ID}>
            <tbody>
                <tr>
                    <td rowSpan={4} className="CarImgCell">
                        <img
                            src={CarImage}
                            className="CarImg LinkHover"
                            id={Car.ID}
                            style={{ display: "block", objectFit: "scale-down" }}
                            onClick={HandleClick}
                        />
                    </td>
                    <td colSpan={3}>
                        <h5>
                            <u>
                                <span onClick={HandleClick} className="LinkHover" style={{ fontSize: "2.2vh" }}>
                                    {Car.Title}
                                </span>
                            </u>
                        </h5>
                    </td>
                </tr>
                <tr>
                    <td>
                        <b>Damage Type: </b>{Car["Damage Type"]}
                    </td>

                    <td>
                        <b>Exterior: </b>{Car.Exterior}
                    </td>

                    <td>
                        <b>Transmission: </b>{Car.Transmission}
                    </td>

                    <td>
                        <b>Airbags: </b> {Car.Airbags}
                    </td>


                </tr>
                <tr>
                    <td>
                        <b>Odometer: </b> {Car.Odometer}
                    </td>
                    <td>
                        <b>Interior: </b> {Car.Interior}
                    </td>

                    <td>
                        <b>Drive Line Type: </b> {Car.Drive}
                    </td>

                    <td>
                        <b>Condition: </b> {Car["Start Code"]}
                    </td>


                </tr>
            </tbody>
        </Table >
    )
}
