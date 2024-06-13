
const express = require("express")

const {registerUser, forgetPassword, resetPassword, deleteUser, loginUsers } = require("../control/regcontrol")

const {handleCreateEvents, handleGetAllEvent, handleGetOneEvent,
     handlUpdateEvent, handledeleteEvent, handleRsvps } = require("../control/eventControl")
const {validateReg, validatelogin, validateForgotPassword, validateDeletedUser, validateisOrganizer } = require("../routes/middleware")







const app = express.Router()
 
    app.post("/register", validateReg, registerUser)

    app.post("/login", validatelogin, loginUsers)

    app.post("/forget-password", validateForgotPassword, forgetPassword)

    app.post("/reset-password", resetPassword)

    app.delete("/delete-user/:id", validateDeletedUser, deleteUser)

    

    

   app.post("/create-event", handleCreateEvents) 

   app.get("/allevent", validateisOrganizer, handleGetAllEvent)

   app.get("/get-one-event/:id", validateisOrganizer, handleGetOneEvent)

   app.patch("/update-event/:id", validateisOrganizer, handlUpdateEvent)

   app.delete("/delete-event/:id", validateisOrganizer, handledeleteEvent)

   app.post("/events/:id/rsvp", handleRsvps)

   


 



 
module.exports = app