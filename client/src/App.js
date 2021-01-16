import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap'
import ImageUploadForm from "./components/ImageUploadForm/ImageUploadForm";

const recognize = "recognize";
const enroll = "enroll";

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Friend or Foe</h1>
            </header>
            <main>
                <Container fluid>
                    <Row className="justify-content-md-center">
                        <Col md="5">
                            {/*<h2>Add Person</h2>*/}
                            <Tabs defaultActiveKey="uploadAdd" id="uncontrolled-tab-example">
                                <Tab eventKey="uploadAdd" title="Upload">
                                    <ImageUploadForm
                                        label="Select Image to Add"
                                        type="file"
                                    />
                                </Tab>
                                <Tab eventKey="urlAdd" title="URL">
                                    <ImageUploadForm
                                        label="Enter Image URL to Add"
                                        type="text"
                                        placeholder="Image address URL"
                                    />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </main>
            <footer>
                Page created by yournamehere
            </footer>
        </div>
    );
}
export default App;
