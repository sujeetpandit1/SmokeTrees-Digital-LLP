const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;




const createUser = async (req, res) =>{

    try {

        let allowedField=["fullName", "email", "phone", "DOB", "password" ]
        const data = req.body
        const keyOf=Object.keys(data)  
        const receivedKey=allowedField.filter((x) => !keyOf.includes(x))
        if(receivedKey.length) return res.status(400).send({status: false, message: `${receivedKey} field key is missing`});


        const {fullName, email, phone, DOB,password} =data
        if(!fullName) return res.status(400).send({status:false, message: "fullName is Can'not be blank"});
        if(!(/^[A-Z a-z]{1,29}$/.test(fullName))) return res.status(400).send({status:false, message: "fullName should be in alphabet only"});
        
        if(!email) return res.status(400).send({ status: false, message: `email cannot be blank` });
        if (!(/^\s*[a-zA-Z][a-zA-Z0-9]*([-\.\_\+][a-zA-Z0-9]+)*\@[a-zA-Z]+(\.[a-zAZ]{2,5})+\s*$/.test(email))) return res.status(400).send({status: false,message: `${email} should be a valid email address`});

        const checkMail= await userModel.findOne({email:email})
        if(checkMail) return res.status(400).send({status:false, message: `this ${email} is already registered, please enter new one or RESET Password`});

        if(!phone) return res.status(400).send({ status: false, message: `phone cannot be blank` });
        if (!/^[6789]\d{9}$/.test(phone)) return res.status(400).send({status: false,msg: `${phone} is not a valid phone number, Please enter 10 digit phone number`});

        const checkPhone= await userModel.findOne({phone:phone}) 
        if(checkPhone) return res.status(400).send({status:false, message: `this ${phone} is already registered`});

        if(!DOB) return res.status(400).send({status:false, message: "DOB is Can'not be blank"});
        if(!(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(DOB))) return res.status(400).send({status:false, message: "DOB in dd-mm-yyyy, dd/mm/yyyy formate only"});

        if(!password) return res.status(400).send({status:false, message: "Password is required"});
        if(!(/^\s*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,15}\s*$/.test(password))) return res.status(400).send({status:false, message: "Pasword Should be in Alphanumeric and special character and length 8-15 digit only"});

        const hash=bcrypt.hashSync(data.password, saltRounds);
        data.password=hash

        const savedUser= await userModel.create(data)
        return res.status(200).send({status:true, message:"User Successfully Registered", data:savedUser})
        
    } catch (error) {
        return res.status(500).send({status: false, message: error.message})
    }
};


module.exports={createUser}


