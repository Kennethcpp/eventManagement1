

const startevent  = require("../model/EventSchema")
const mongoose = require("mongoose")
const timestamp = require("timestamp")
const authentication = require("../model/userSchema")
const bson = require("bson")
 const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")
 




//this function handles create events
const handleCreateEvents = async(req, res)=>{
 
        try{       


const {tittle, description, date, location } = req.body

const event = new startevent({tittle, description,  date, location})

await event.save()
  return res.status(200).json({
      message: "Event created successfully ...",
      events: {tittle, description,  date, location },
      
  })

} catch (error) {
    return res.status(500).json({message: error.message})
  }
}
//GET ALL THE EVENTS
const handleGetAllEvent = async(req, res)=>{ 

    try{
  
      const event = await startevent.find()
    return res.status(200).json({
      message: "Successful",
      count: event.length,
      event
  })
  
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
    }
    //GET ONLY ONE EVENT
    const handleGetOneEvent = async(req, res)=>{
      try{
        const { id } = req.params
      const onlyOneEvent = await startevent.findById(id)
      return res.status(200).json({
          message: "successful",
          count: onlyOneEvent.length,
          onlyOneEven
      })
    
      } catch (error) {
        return res.status(500).json({message: "Event not found"})
      }
    }
    //UPDATE AN EVENT
    const handlUpdateEvent = async(req, res)=>{

      try{
      const { id } = req.params
      const {Tittle, Description, Date, Location} = req.body

      const updateEvent = await startevent.findByIdAndUpdate(
      id,
      {Tittle, Description, Date, Location },
      {new: true}
    )
      return res.status(200).json({
        message: "Your Event was updated successfully.",
        Event: updateEvent 
      })
      } catch (error) {
        return res.status(500).json({message: error.message})
      }
      
    }
    //DELETE AN EVENT
    const handledeleteEvent = async(req, res)=>{
      try{
  
        const { id } = req.params
      const deletedEvent = await startevent.findByIdAndDelete(id)
  
      return res.status(200).json({
        message: "Event deleted successfully."
      })
      } catch (error) {
        return res.status(500).json({message: error.message})
      }
    }
    //THIS FUNCTION HANDLES ALL RSVPs
    const handleRsvps = async(req, res)=>{

      try {
        const eventId = req.params.id;
        const userId = req.user.id;
        const status = req.body.status;
    
        const event = await startevent.findById(eventId);
        if (!event) {
          return res.status(404).json({
            message: "Event not Found" 
          })
        }
    
        const participant = event.participants.find(participant => participant.toString() === userId);
        if (!participant) {
          return res.status(403).json({
            message: "You are not a participant of this event."
          })
        }
    
        
        const rsvp = event.rsvp.find(rsvp => rsvp.user.toString() === userId);
        if (rsvp) {
          rsvp.status = status
        } else {
          event.rsvp.push({ user: userId, status })
        }
    
        await event.save();
        res.status(200).json({
          message: "RSVP updated successfully.."
        })
      } catch (error) {
        return res.status(500).json({message: error.message})
      }
    }

    











module.exports = {
    handleCreateEvents,
    handleGetAllEvent,
    handleGetOneEvent,
    handlUpdateEvent,
    handledeleteEvent,
    handleRsvps
   

}
