

const express = require("express")
const cors = require('cors')
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const dbconnection = require("./DB/dbconfig")
const routes = require("./routes/regRoutes")




const app = express()

app.use(express.json())

app.use(cors())

const PORT = process.env.PORT || 8000

dbconnection()

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})   

 app.use(routes)


 


