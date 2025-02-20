const mongoose = require("mongoose");
const express = require("express");
const cors =  require("cors");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt =  require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.listen(process.env.port,()=>{
    console.log(`Listening to port ${process.env.port}...`);
});
app.use('/uploads', express.static("uploads"));
app.use(express.static(path.join(__dirname, "./client/build")));

// EXPRESS MIDDLEWARE FOR JSON
app.use(express.json());
// EXPRESS MIDDLEWARE FOR URL ENCODED
//  app.use(express.urlencoded());
// EXPRESS MIDDLEWARE FOR FORMDATA(MULTER)
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, "uploads")
    },
    filename: (req, file, cb)=> {
        console.log(file);
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  });
  const upload = multer({ storage: storage });

let authorise = (request,response,next) =>{
    console.log("Inside AUTHORIZATION middleware function...");
    console.log(request.headers["authorization"]);
    next();
};
app.use(authorise);  

app.get("*", (request,response)=>{
    response.sendFile("./client/build/index.html");
});



// APIENDPOINT - POST - JSON/URLENCODED/FORMDATA - SIGNUP
app.post("/signup",  upload.single("profilePic"), async (request,response)=>{
    console.log(request.body);
    console.log(request.file);

    // BCRYPT
    let hashedPassword = await bcrypt.hash(request.body.password,10);

    try {
        let newUser = new User ({
            firstName:request.body.firstName,
            lastName:request.body.lastName,
            age:request.body.age,
            email:request.body.email,
            password:hashedPassword,
            mobileNumber:request.body.mobileNumber,
            profilePic:request.file.path,
        });
        await User.insertMany([newUser]);
        console.log("SUCCESSFULLY inserted data into database(mongoDB)...");
        response.json({status:"SUCCESS", message:"User CREATED Successfully..."});
    } catch (error) {
        console.log("UNABLE to insert data into database(mongoDB)...");
        response.json({status:"FAIL", message:"UNABLE to Create user..."})
    }
});

// APIENDPOINT - POST - SIGNIN
app.post("/signin",upload.none(), async (request,response)=>{
    console.log(request.body);
    let userArray = await User.find().and({email:request.body.email})
        if(userArray.length > 0) {
            
            let isPasswordCorrect =  await bcrypt.compare(request.body.password, userArray[0].password)

            if(isPasswordCorrect == true){

                let token = jwt.sign({email:request.body.email,password:request.body.password},"smvddvms");

                let dataToSend = {
                    firstName:userArray[0].firstName,
                    lastName:userArray[0].lastName,
                    age:userArray[0].age,
                    email:userArray[0].email,
                    mobileNumber:userArray[0].mobileNumber,
                    profilePic:userArray[0].profilePic,
                    token: token,
                };
                // console.log(dataToSend);
                response.json({status:"SUCCESS", message:"Credentials are correct...", data:dataToSend});
            }
            else {
                response.json({status:"FAIL", message:"Password is incorrect..."} );

            }
        }
        else{
            response.json({status:"FAIL", message:"User Doesn't exists..."});
        }
});

// APIENDPOINT - POST - TOKEN
app.post("/validateToken", upload.none(), async (request,response) => {
    console.log(request.body);

    let decryptedCredentials = jwt.verify(request.body.token,"smvddvms");
    console.log(decryptedCredentials);

    let userArray = await User.find().and({email:decryptedCredentials.email})
    if(userArray.length > 0) {
        if(userArray[0].password == decryptedCredentials.password){
                let dataToSend = {
                firstName:userArray[0].firstName,
                lastName:userArray[0].lastName,
                age:userArray[0].age,
                email:userArray[0].email,
                mobileNumber:userArray[0].mobileNumber,
                profilePic:userArray[0].profilePic,
            };
            // console.log(dataToSend);
            response.json({status:"SUCCESS", message:"Credentials are correct...", data:dataToSend});
        }
        else {
            response.json({status:"FAIL", message:"Password is incorrect..."} );
        }
    }
    else{
        response.json({status:"FAIL", message:"User Doesn't exists..."});
    }
});

// APIENDPOINT - PUT/PATCH - UPDATE
app.patch("/updateProfile",upload.single("profilePic"), async (request,response)=>{
    
    try {
        console.log(request.body);

    // FIRSTNAME
    if(request.body.firstName.trim().length > 0)
    {
        await User.updateMany(
            {email:request.body.email},
            { firstName:request.body.firstName }
        );
    }
    // LASTNAME
    if(request.body.lastName.trim().length > 0){
        await User.updateMany(
            {email:request.body.email},
            {lastName:request.body.lastName}
        );
    }
    // AGE
    if(request.body.age.trim().length > 0){
        await User.updateMany(
            {email:request.body.email},
            {age:request.body.age}
        );
    }
    // PASSWORD
    if(request.body.password.trim().length > 0 ){
        await User.updateMany(
            {email:request.body.email},
            {password:request.body.password}
        );
    }
    // MOBILENUMBER
    if(request.body.mobileNumber.trim().length > 0 ){
        await User.updateMany(
            {email:request.body.email},
            {mobileNumber:request.body.mobileNumber}
        );
    }
    // PROFILEPICTURE
    if(request.file){
        await User.updateMany(
            {email:request.body.email},
            {profilePic:request.file.path}
        )
    }
        response.json({ status:"SUCCESS", message:"Profile Details Updated SUCCESSFULLY..."});
    } catch (error) {
        response.json({ status:"FAIL", message:"UNABLE to update the details..."});
    }
    
});

//APIENDPOINT - DELETE
app.delete("/deleteProfile", upload.none(), async (request,response)=>{
   try {
    console.log(request.body.email);
    let deleteObject = await User.deleteMany({email:request.body.email});
    if(deleteObject.deletedCount > 0 ) {
        response.json({status:"SUCCESS", message:"User Profile DELETED Successfully..."});
    }else{
        response.json({status:"FAIL", message:"UNABLE to delete the user profile..."});
    }
   } catch (error) {
        response.json({status:"FAIL", message:"SOMETHING is WRONG!!",err:error})
   }

});

// SCHEMA CREATION
let userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    email:String,
    password:String,
    mobileNumber:String,
    profilePic:String,
})

// CLASS CREATION
let User = new mongoose.model("users", userSchema,"users");

// INSERT DUMMY DATA INTO DATABASE
// let insertDataIntoDB =  async ()=>{
//     try {
//         let newUser = new User({
//             firstName:"Monkey D.",
//             lastName:"Luffy",
//             age:21,
//             email:"luffy@gmail.com",
//             password:"luffy",
//             mobileNumber:"+91-9874563021",
//             // profilePic:String,
//         });
//         await User.insertMany([newUser]);
//         console.log("SUCCESSFULLY inserted data into database(mongoDB)...");
//     } catch (error) {
//         console.log("UNABLE to insert data into database(mongoDB)...");
//     }
// };


// CONNECTION TO DATABASE(MONGODB)
let connectToMDB =  async () =>{
    try {
            await mongoose.connect(process.env.mdburl);
            console.log("SUCCESSFULLY connected to mongoDB...");
            // insertDataIntoDB();
    } catch (error) {
        console.log("UNABLE to connect to mongoDB")
    }
};
connectToMDB();