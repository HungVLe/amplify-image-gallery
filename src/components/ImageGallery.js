import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";

import { API, graphqlOperation, label } from "aws-amplify";
import { updatePicture } from "../graphql/mutations";

import awsExports from "../aws-exports";
import "./Home.css";
import "./FindImage.css";

function ImageGallery(props) {
  const [editedTag, setEditedTag] = useState("");
  const [imageID, setImageID] = useState("");
  const [toggle, setToggle] = useState(false);
  //const [imageLabels, setImageLabels] = useState(undefined);
  console.log("inside Imagegallery", props);

  const updateDB = async (payload) => {
    console.log("inside db updateDB", payload);
    try {
      await API.graphql(graphqlOperation(updatePicture, { input: payload }));
    } catch (err) {
      console.log("db write error while updateing");
    }
  };

  const handleOnTagChange = (newTag, imageID) => {
    console.log("inside handleachange", newTag, imageID);
    setEditedTag(newTag);
    console.log("editedTag", editedTag);
    const payload = {
      id: imageID,
      tag: editedTag,
    };
    updateDB(payload);
  };

  const createImagesRows = () => {
    var rows = {}
    var counter = 1
    props.images.map((image, idx) => {
      rows[counter] = rows[counter] ? [...rows[counter]] : []
      if (idx % 3 === 0 && idx !== 0) {
        counter++
        rows[counter] = rows[counter] ? [...rows[counter]] : []
        rows[counter].push(image)
      } else {
        rows[counter].push(image)
      }
    })
    return rows
  }
  var imagesRows = createImagesRows();
  console.log(imagesRows)
  // class ImageGallery extends Component {

  return (
    <>
      <div className="container">
        {Object.keys(imagesRows).map(row => {
          return (
            <div className="row" key={row}>
              {imagesRows[row].map(image => {
                return (
                  <div className="col-sm-4" key={image.id}>
                    <Card>
                      <CardImg
                        top
                        width="300"
                        height="300"
                        className="card-image"
                        alt="Happy Face"
                        src={image.src}
                      ></CardImg>
                      <CardBody>
                        <CardTitle tag="h6" className="text-center">
                          Owner : {image.owner}
                        </CardTitle>
                        <CardTitle tag="h6">
                          <Container>
                            <Row>
                              <Col>
                                <i
                                  className="fa fa-trash"
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                  }}
                                  aria-hidden="true"
                                  onClick={(event) => {
                                    props.deleteImage(image.id);
                                  }}
                                ></i>
                              </Col>
                              <Col>
                                <i
                                  className="fa fa-download "
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}
                                  download="download.png"
                                  onClick={(event) => {
                                    props.downloadImage(image);
                                  }}
                                ></i>
                              </Col>
                            </Row>
                          </Container>
                        </CardTitle>
                      </CardBody>
                    </Card>
                  </div>
                  )
              })}
            </div>
          )
        })}
      </div>

    </>
  );
}

export default ImageGallery;
