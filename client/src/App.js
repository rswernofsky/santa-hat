import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'
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
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="6">
                            <h1>Test person form</h1>
                            <ImageUploadForm endpoint={recognize}/>
                        </Col>
                        <Col md="6">
                            <h1>Add person form</h1>
                            <ImageUploadForm endpoint={enroll}/>
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
