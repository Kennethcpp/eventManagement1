
const model = require("../model/userSchema")
const startevent = require("../model/EventSchema")
const authentication = require("../model/userSchema")



//validating register details
const validateReg = async(req, res, next)=>{
  

    const {email, fullname, password} = req.body
    let errors =[]
  if(!email){
    errors.push("please enter email address")
  } else if(!validateEmail(email)){
    errors.push("Invalid email address.")
  }
 
//validating fullname
  if(!fullname){
    errors.push("please enter your full name")
  }
  
//validating password 
  if(!password){
    errors.push("please enter password")
  } else if(password.length < 6){
    errors.push("password must be 6 character and above")
  }
      if(errors.length > 0){
        return res.status(400).json({
          message: errors
        })
      } 
      next()
}
 const validateEmail = (email) => {
  const emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

  return emailPattern.test(email);
 
};
//validating user login details
const validatelogin = async(req, res, next)=>{
  try{
  const {email, password } = req.body

  let errors =[]
  
  if(!email){
    errors.push("enter your email")
  }
  else if(!validateEmail(email)){
    errors.push("Invalid email address.")
  }
  if(!password){
    errors.push("enter your password.")

   }
     
  if(errors.length > 0){
    return res.status(400).json({
      message: errors
    })
  } 
  next()

  } catch (error) {
    return res.status(500).json({message: error.message})
  } 
  
}

const validateDeletedUser = async(req, res, next)=>{

  const { deletedUser} = req.params
  let errors =[]
  if(!deletedUser){
    errors.push("Delete failed please try again..")
  } 
  next()
}

const validateForgotPassword = async(req, res, next)=>{

  const { email } = req.body
  let errors =[]
  if(!User){
    errors.push("User not found")
  }else if(!userPayload){
    errors.push("Access has been denied.")
  }
  next()
  
}



const validateisOrganizer = async(req, res)=>{
  
  EventSchema.pre('updateOne', { document: true, query: false }, (next) => {

    const event = this;
  
    const userId = event.organizer.toString();
  
    const updatingUserId = event.getUpdate().$set.organizer;
  
  
    if (updatingUserId && updatingUserId.toString() !== userId) {
  
      return next(new Error('Only the event organizer can update the event'));
  
    }
  
  
    next();
  
  });
}






module.exports = {
  validateReg,
  validateEmail,
  validatelogin,
  validateDeletedUser,
  validateForgotPassword,
  validateisOrganizer
 
}