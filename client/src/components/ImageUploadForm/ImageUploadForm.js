import React, { useState, useCallback } from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'
import classes from './ImageUploadForm.module.css'
// import axios from 'axios'
// const express = require('express');
const axios = require('axios').default;
require('dotenv').config();

const ImageUploadForm = (props) => {
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

        // console.log(data);
        // axios.post(`/api/upload`, data)
        //     .then(response => {
        //         console.log("POST request worked");
        //     })
        //     .catch(e => {
        //         console.log("POST request broke man");
        //     })

        let subscriptionKey = process.env['FACE_SUBSCRIPTION_KEY']
        let endpoint = process.env['FACE_ENDPOINT'] + '/face/v1.0/detect'
        let imageUrl = 'https://dy6g3i6a1660s.cloudfront.net/tmfvDBgD341Wjnxyo5dwmwSwBLA/orig.jpg'
        console.log('Subscription key: ' + subscriptionKey);
        console.log('endpoint: ' + endpoint);

        axios({
            method: 'post',
            url: endpoint,
            params : {
                detectionModel: 'detection_02',
                returnFaceId: true
            },
            data: {
                url: imageUrl,
            },
            headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey }
        }).then(function (response) {
            // res.send(`Status: ${response.status}`)
            // res.send(`Status text: ${response.statusText}`)
            // res.send(`Response data: ${response.data}`)
            console.log('Status text: ' + response.status)
            console.log('Status text: ' + response.statusText)
            console.log()
            console.log(response.data)
        }).catch(function (error) {
            // res.send(`Error: ${error}`)
            console.log(error)
        });

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