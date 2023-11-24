import mongoose from "mongoose";
import {} from "dotenv/config";

//export const uri = "mongodb+srv://krithidk:LearnMongo25@cluster0.rm3jlct.mongodb.net/DeltaAirWays?retryWrites=true&w=majority";
export const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("================== Connected to MongoDb ============== "))
.catch((err)=>console.log(`Connection failed due to this erroe below !\n ${err}`));

const userSchema = mongoose.Schema({
    name : {type:String, required:true},
    email : {type:String, required:true},
    pwd: {type:String, required:true},
});

const userModel = mongoose.model("Delta_User", userSchema);

export default userModel;