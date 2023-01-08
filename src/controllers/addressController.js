const addressModel = require('../models/addressModel')
const usersModel = require('../models/userModel')



const createAddress = async (req, res) =>{
    try {

        let allowedField=["userId", "address", "city", "state", "pinCode" ]
        const data = req.body
        const keyOf=Object.keys(data)  
        const receivedKey=allowedField.filter((x) => !keyOf.includes(x))
        if(receivedKey.length) return res.status(400).send({status: false, message: `${receivedKey} field key is missing`});


        const {userId, address, city, state, pinCode} =data

        if(!userId) return res.status(400).send({status:false, message: "Please Enter userId"});
        if(userId.length !=24) return res.status(400).send({status:false, message: "Please Enter Currect userId"});

        const checkUserAddress = await addressModel.findOne({userId})
        if(checkUserAddress) return res.status(400).send({status: false, message: `User Address Already Exist, Please Update`})

        const checkUser = await usersModel.findById({_id: userId})
        if(!checkUser) return res.status(400).send({status: false, message: `User Not found`})

        if(!address) return res.status(400).send({status:false, message: "Please Enter Address"});
        if ((/^[!@$%^&*]+/.test(address))) return res.status(400).send({ status: false, message: `It's Contain Specific Address Special Character Not Allowed` });

        if(!city) return res.status(400).send({status:false, message: "Please Enter City"});
        if (!(/^[A-Za-z]+/.test(city))) return res.status(400).send({ status: false, message: `City only Alphabet Allowed` });

        if(!state) return res.status(400).send({status:false, message: "Please Enter State"});
        if (!(/^[A-Za-z]+/.test(state))) return res.status(400).send({ status: false, message: `State only Alphabet Allowed` });

        if(!pinCode) return res.status(400).send({status:false, message: "Please Enter Pincode"});
        if (!(/^[1-9][0-9]{5}$/.test(pinCode))) return res.status(400).send({ status: false, msg: "Pin Code Should be in 6 digit Numbers Only and Should Not Start with 0" });

        const savedAddress= await addressModel.create(data)
        return res.status(200).send({status:true, message:"User Successfully Registered", data:savedAddress})
        
    } catch (error) {
        return res.status(500).send({status: false, message: error.message})
    }
};

module.exports={createAddress}