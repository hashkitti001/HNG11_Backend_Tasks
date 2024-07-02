require('dotenv').config();
const { default: axios } = require('axios');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9999;
const requestIp = require("request-ip")
app.use(requestIp.mw())
app.use(express.json());

app.get('/api/hello', async (req, res) => {
  try {
    const { visitor_name } = req.query;
    const clientIp = req.clientIp
   
    if (clientIp === '::1' || clientIp === '::ffff:127.0.0.1') {
        clientIp = '127.0.0.1';
    }
    if (clientIp.startsWith('::ffff:')) {
        clientIp = clientIp.replace('::ffff:', '');
    }

    if(!visitor_name){
        return res.status(400).json({
            "message":"You must include visitor_name in your query"
        })
    }
    
    const datafromIP = await axios.get(
            `http://api.ipapi.com/api/${clientIP}?access_key=${process.env.IPAPI_KEY}`
    );
    
    const { city, country_name } = datafromIP?.data;

    const weatherData = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_KEY}&q=${country_name}`
    );
    const { temp_c } = weatherData.data.current;

    const result = {
      clientIp,
      location: city,
      greeting: `Hello ${visitor_name}! the temperature is ${temp_c} degree Celsius in ${city}`
    };
    return res.status(200).json(result);
  } catch (e) {
    console.trace(e.message);
    return res.status(500).json(e.message);
  }
});
app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
