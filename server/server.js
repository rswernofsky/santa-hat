// server.js
const express = require('express');
const axios = require('axios').default;

//const path = require('path');

// Import routes
// Create App
const app = express();
const port = process.env.PORT || 3001;
//
// // Adds a parsed json body object to req
app.use(express.json({ limit: '10000kb' }));

// Add a valid subscription key and endpoint to your environment variables.
let subscriptionKey = process.env['FACE_SUBSCRIPTION_KEY']
let endpoint = process.env['FACE_ENDPOINT'] + '/face/v1.0/detect'

// Optionally, replace with your own image URL (for example a .jpg or .png URL).
// let imageUrl = 'https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/faces.jpg'
let imageUrl = 'https://dy6g3i6a1660s.cloudfront.net/tmfvDBgD341Wjnxyo5dwmwSwBLA/orig.jpg'
// </environment>

app.post('/api/upload', (req, res) => {
      // res.send(`${req}`);
      // <main>
      // Send a POST request
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
            res.send(`Status: ${response.status}`)
            res.send(`Status text: ${response.statusText}`)
            res.send(`Response data: ${response.data}`)
            // console.log('Status text: ' + response.status)
            // console.log('Status text: ' + response.statusText)
            // console.log()
            // console.log(response.data)
      }).catch(function (error) {
            res.send(`Error: ${error}`)
            // console.log(error)
      });
})


app.listen(port, () => console.log(`Listening on port ${port}`));