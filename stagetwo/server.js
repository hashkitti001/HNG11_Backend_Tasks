const express = require("express")
const app = express()
const morgan = require("morgan")
const PORT = process.env.PORT || 9999

app.use(morgan("dev"))

app.listen(PORT, () => {
    console.info("Stage 2 API running on port", PORT)
})