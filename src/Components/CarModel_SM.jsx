
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function CarModel_SM({ Car, CarImage, HandleClick }) {

    return (
        <Card className="align-center mb-2 p-0 w-90" onClick={HandleClick}>
            <Card.Img variant="top" src={CarImage} style={{ display: "block", objectFit: "scale-down" }} />
            <Card.Body>
                <Card.Title style={{ fontSize: "2.3vh" }}>{Car.Title}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush" style={{ fontSize: "2vh" }}>
                <ListGroup.Item><span>Odometer: </span><span>{Car.Odometer}</span></ListGroup.Item>
                <ListGroup.Item><span>Damage Type: </span><span>{Car["Damage Type"]}</span></ListGroup.Item>
                <ListGroup.Item><span>Damage Location: </span><span>{Car["Damage Location"]}</span></ListGroup.Item>
            </ListGroup>
        </Card>
    )
}
