const User = require("../models/User")
const uuid = require("uuid")

const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, phone } = req.body
    try {
        const newUser = await User.create({
            userId:String(uuid.v4()), 
            firstName, lastName, email, password, phone
        })
        res.status(201).json({
            status: "success",
            message: "Registration successful",
            data: {
                user: {
                    userId: newUser.userId,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    phone: newUser.phone,
                }
            }
        })
    } catch(e){
        if(e.errors){
            const errors = e.errors.map(err => ({
                field: err.path,
                message: err.message
            }))
            res.status(422).json({errors})
        } else {
            console.error("Error registering user", error)
            res.status(500).json({message: "Internal server error"})
        }
    }
    
}

module.exports = {
    registerUser
}