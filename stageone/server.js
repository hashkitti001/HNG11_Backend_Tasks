require('dotenv').config();
const axios = require('axios');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9999;

app.use(express.json());

app.get('/api/hello', async (req, res) => {
    const { visitor_name } = req.query;

    if (!visitor_name) {
        return res.status(400).json({
            message: "You must include visitor_name in your query"
        });
    }

    try {
        const ipData = await axios.get("https://api.ipify.org?format=json");
        let clientIp = ipData.data.ip;

        if (clientIp === '::1' || clientIp === '::ffff:127.0.0.1') {
            clientIp = '127.0.0.1';
        } else if (clientIp.startsWith('::ffff:')) {
            clientIp = clientIp.replace('::ffff:', '');
        }

        const ipApiResponse = await axios.get(
            `http://api.ipapi.com/api/${clientIp}?access_key=${process.env.IPAPI_KEY}`
        );
        const { city, country_name } = ipApiResponse.data;
        console.log(city)
        console.log( `http://api.ipapi.com/api/${clientIp}?access_key=${process.env.IPAPI_KEY}`)
        const weatherApiResponse = await axios.get(
            `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_KEY}&q=${city}`
        );
        const { temp_c } = weatherApiResponse.data.current;

        const result = {
            clientIp,
            location: city,
            greeting: `Hello ${visitor_name}! The temperature is ${temp_c} degrees Celsius in ${city}.`
        };

        return res.status(200).json(result);
    } catch (error) {
        console.error('Error:', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Data:', error.response.data);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Message:', error.message);
        }
        return res.status(500).json({
            message: "An error occurred while processing your request."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
