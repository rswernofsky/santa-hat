import React, { useState } from 'react'
import { Form, FormControl } from 'react-bootstrap'
import classes from './ImageUploadForm.module.css'

const ImageUploadForm = (props) => {
    let [galleryName, setGalleryName] = useState('friend')
    let [name, setName] = useState("");

    return (
        <Form className="my-4">
            <Form.Row className="text-left">
                <Form.Group>
                    <Form.Label>Gallery</Form.Label>
                    <Form.Text className="text-muted">
                        Select upload gallery.
                    </Form.Text>
                    <Form.Check
                        type="radio"
                        label="Friend"
                        checked={galleryName === "friend"}
                        onChange={() => setGalleryName("friend")}
                    />
                    <Form.Check
                        type="radio"
                        label="Foe"
                        checked={galleryName === "foe"}
                        onChange={() => setGalleryName("foe")}
                    />
                </Form.Group>
            </Form.Row>
            {props.endpoint === "enroll" &&
            (<Form.Row className="text-left">
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <FormControl
                        type="text"
                        placeholder="Subject name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                </Form.Group>
            </Form.Row>)}
            <Form.Row>
                select or input image
            </Form.Row>
        </Form>
    );
}

export default ImageUploadForm;