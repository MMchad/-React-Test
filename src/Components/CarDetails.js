import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FetchCar, FetchCarImages } from './Firebase.jsx';
import ImageGallery from 'react-image-gallery';
import { useParams } from "react-router-dom";
import Placeholder from '../Assets/Placeholder.png'

export default function CarDetails() {
  const Params = useParams();
  const [Car, setCar] = useState({});
  const [CarImages, setCarImages] = useState([{ original: Placeholder, thumbnail: Placeholder }]);
  const [Options, setOptions] = useState({ showFullscreenButton: false, showNav: false, showThumbnails: false });
  const Information = [
    "Make",
    "Model",
    "Series",
    "Year",
    "Odometer",
    "Body Style",
    "Exterior",
    "Interior",
    "Engine",
    "Cylinders",
    "Transmission",
    "Drive",
  ]

  const State = [
    "Damage Type",
    "Damage Location",
    "Start Code",
    "Airbags",
    "Key"
  ]

  function ImagesLoaded() {
    if (CarImages.length > 1) {
      setOptions({ showFullscreenButton: true, showNav: true, showThumbnails: true })
    }

  }

  async function GetCar() {
    FetchCar(Params.Car_ID).then((TempCar) => {
      setCar(TempCar);
    })

  }

  async function GetCarImages() {
    FetchCarImages(Params.Car_ID).then((Images) => {
      setCarImages(Images)
    });

  }

  useEffect(() => {
    GetCar();
    GetCarImages();
  }, [])

  useEffect(() => {
  }, [CarImages])

  return (
    <Container fluid className="p-3">
      <Row xs={1} md={1} lg={2}>
        <Col >
          &nbsp;
          <ImageGallery
            items={CarImages}
            infinite={false}
            showFullscreenButton={Options.showFullscreenButton}
            showPlayButton={false}
            showNav={Options.showNav}
            showThumbnails={Options.showThumbnails}
            onImageLoad={ImagesLoaded}
          />
        </Col>

        <Col>
          <Row xs={1} md={1} lg={2}>
            <Col >
              <Table striped borderless className="CarDetails">
                <colgroup>
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <th colSpan={2} className="bg-dark text-light">
                      Vehicle Information:
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Information.map((Option) => {
                      return (
                        <tr>
                          <td>
                            {Option}:
                          </td>
                          <td>
                            {Car[Option]}
                          </td>
                        </tr>)
                    })
                  }
                </tbody>
              </Table>
            </Col>
            <Col >
              <Table striped borderless className="CarDetails">
                <colgroup>
                  <col />
                  <col style={{ textAlign: "right" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th colSpan={2} className="bg-dark text-light">
                      Vehicle State:
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    State.map((Option) => {
                      return (
                        <tr>
                          <td>
                            {Option}:
                          </td>
                          <td>
                            {Car[Option]}
                          </td>
                        </tr>)
                    })
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>




      </Row >
    </Container >
  )
}
