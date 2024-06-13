const authentication = require("../model/userSchema")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")




//REGISTER A USER
const registerUser = async(req, res)=>{

  try{

    const {email, username, password, role} = req.body

    const ExistingUser = await authentication.findOne({email})
       if(ExistingUser){
        return res.status(400).json({
          message: "User already Exist!"
        })

       }
      //hashe the password and set new password to be hashed password
      const hashedPassword = await bcrypt.hash(password, 12)
    const Users = new authentication({email, username, password: hashedPassword, role})
         await Users.save()

        return res.status(200).json({ 
            message: "successful",
            user: {email, fullname,role }    
    }) 
  } catch (error) {
    return res.status(500).json({message: error.message})
  } 

  }
  
  //login user
const loginUsers = async(req, res)=>{

    try{

      const {email, password} = req.body

    const User = await authentication.findOne({email})
    if(!User){
      return res.status(400).json({
        message: "User not found."
      })
    }
// checking password match

const matchPassword = await  bcrypt.compare(password, User.password)
if(!matchPassword){
  return res.status(400).json({
    message: "Incorrect Email or Password."
  })
  }  
//generate pass token to grant user access using jsonwebtoken

const userPayload = {
  id: User._id,
  email: User.email
}
const passToken = await jsonwebtoken.sign(userPayload, process.env.PASSTOKEN,
   {expiresIn: '30d'})
   //req.userPayload.id = User._id

return res.status(200).json({
  message: "login successful",
  passToken,
  User
})

    } catch (error) {
    return res.status(500).json({message: error.message})
  } 

    }
  
    //forgot password
const forgetPassword = async(req, res)=>{

      try{
        const { email } = req.body
      const User = await authentication.findOne({email})
      
    
    const userPayload = {
      id: User._id,
      email: User.email
    }
    //generate passToken 
    const passToken = jsonwebtoken.sign(userPayload, process.env.PASSTOKEN, {expiresIn: '30m'})
    const websiteURL = `youthrive.com/${passToken}`
    
    //send  email to user with the reset password url
    return res.status(200).json({
      message: "successful."
    }) 
    
      } catch (error) {
        return res.status(500).json({message: error.message})
      }
    }

//reset password
const resetPassword = async(req, res)=>{
  try{
    const {password, email} = req.body
    const User = await authentication.findOne({email})
    if(!User){
      res.status(200).json({
        message: "User not found"
      })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    User.password = hashedPassword
    await User.save()
    res.status(200).json({
      message: "password reset was successful"
    })
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

//DELETE ONE USER
  const deleteUser = async(req, res)=>{
    try{

      const { id } = req.params
    const deletedUser = await authentication.findByIdAndDelete(id)

    return res.status(200).json({
      message: "deleted successfully."
    })
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  }







module.exports = {
  registerUser,
  loginUsers,
  forgetPassword,
  resetPassword,
  deleteUser,

}
 