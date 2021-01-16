import React, { useState, useCallback } from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'
import classes from './ImageUploadForm.module.css'
import axios from 'axios'

const ImageUploadForm = (props) => {
    let [galleryName, setGalleryName] = useState('friend')
    let [name, setName] = useState("");
    let [file, setFile] = useState(null);
    let [fileSrc, setFileSrc] = useState('');

    const fileStaging = useCallback((e) => {
        if (props.type === 'file') {
            setFile(e.target.files[0])

            let reader = new FileReader();

            try {
                reader.readAsDataURL(e.target.files[0])
            } catch (e) {
                setFileSrc('')
            }

            reader.addEventListener("load", function() {
                setFileSrc(reader.result)
            }, false)
        } else {
            setFileSrc(e.target.value)
        }
    }, [props.type]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = {
            image: fileSrc
        }

        console.log(data);
        axios.post(`/api/upload`, data)
            .then(response => {
                console.log("POST request worked");
            })
            .catch(e => {
                console.log("POST request broke man");
            })



    }

    return (
        <Form className="my-4" onSubmit={handleSubmit}>
            <Form.Row className="text-left">
                <Form.Group>
                    <Form.Label>{props.label}</Form.Label>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <div className="input-group d-flex justify-content-center mb-3">
                    <div className={props.type === 'file' ? "custom-file" : ''}>
                        <label
                            className={props.type === 'file' ? "custom-file-label text-left" : 'text-center'}>
                            {file && file.name}
                        </label>
                        <input
                            required
                            type={props.type}
                            className={props.type === 'file' ? "custom-file-input" : "form-control"}
                            placeholder={props.placeholder}
                            onChange={(e) => fileStaging(e)}
                        />
                    </div>
                    <div className="input-group-prepend">
                        <Button type="submit" variant="primary">
                            Upload
                        </Button>
                    </div>
                </div>
            </Form.Row>
            <h2>Image Preview</h2>
            {fileSrc ?
                <figure>
                    <img className={classes.Image}
                         alt="Your image"
                         src={fileSrc} />
                </figure>
                : <p style={{ color: "#CCC" }}>No image to preview</p>}
        </Form>
    );
}

export default ImageUploadForm;