const express = require("express")
const app = express()
const morgan = require("morgan")
const PORT = process.env.PORT || 9999
const { dbConn } = require("./utils/dbConnect")
const indexRouter = require("./routes/public")
const privateRouter = require("./routes/private")
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(indexRouter)
app.use(privateRouter)

dbConn()
app.get("/", (req,res) => {
    return res.status(200).json({"message": "Alive on port Juice"})
})
app.listen(PORT, () => {
    console.info("Stage 2 API running on port", PORT)
})