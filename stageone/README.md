# Express Weather Greeting API

This is a simple Express.js application that greets a visitor and provides the current temperature in their city based on their IP address.

## Features

- Fetches location data based on the visitor's IP address using the ipapi service.
- Retrieves current weather data for the detected location using the WeatherAPI.
- Returns a personalized greeting along with the current temperature.

## Prerequisites

- Node.js (v12.x or higher)
- npm (v6.x or higher)

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/express-weather-greeting-api.git
   cd express-weather-greeting-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your API keys:

   ```env
   PORT=9999
   IPAPI_KEY=your_ipapi_key
   WEATHERAPI_KEY=your_weatherapi_key
   ```

### Running the Application

Start the server:

```bash
node app.js
```

The server will start on the port specified in the `.env` file or port 9999 if not specified.

### API Endpoints

#### GET /api/hello

Fetches the location and weather data for the visitor and returns a personalized greeting.

**Query Parameters:**

- `visitor_name` (required): The name of the visitor.

**Example Request:**

```bash
curl "http://localhost:9999/api/hello?visitor_name=John"
```

**Example Response:**

```json
{
  "client_ip": "161.185.160.93",
  "location": "New York",
  "greeting": "Hello John! The temperature is 25 degree Celsius in New York."
}
```

### Error Handling

If the `visitor_name` query parameter is missing, the API will return a `400 Bad Request` error:

```json
{
  "message": "You must include visitor_name in your query"
}
```

If there is an issue with fetching data from the external APIs, the API will return a `500 Internal Server Error` with a descriptive error message.

### Logging

The server logs information about incoming requests and any errors that occur during data fetching.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Express](https://expressjs.com/)
- [Axios](https://axios-http.com/)
- [ipapi](https://ipapi.com/)
- [WeatherAPI](https://www.weatherapi.com/)

```

This README provides an overview of the project, installation steps, usage instructions, and information on handling errors and logging. Adjust the repository URL and any other specific details as necessary.