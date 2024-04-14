import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema({
    to : {
        type: String,
        required: true,
    },
    from : {
        type: String,
        required: true,
    },
    subject : String,
    body: String,
    date: {
        type: Date,
        required: true,
     },
     image: String,
     name:{
        type: String,
        required: true,
     },
     starred:{
        type:Boolean,
        require:true,
        default: false,
 },
     bin:{
        type:Boolean,
        require:true,
        default: false,

     },
     type:{
        type: String,
        required: true,
     }
})
const email = mongoose.model('emails',EmailSchema);
export default email;


//here emails are used to validate payload
// collection name  EmailSchema