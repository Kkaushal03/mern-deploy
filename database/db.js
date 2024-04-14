
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const Connection = () =>{
    const DB_URI =`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-7vaiyhv-shard-00-00.wyojeas.mongodb.net:27017,ac-7vaiyhv-shard-00-01.wyojeas.mongodb.net:27017,ac-7vaiyhv-shard-00-02.wyojeas.mongodb.net:27017/?ssl=true&replicaSet=atlas-2qu7j5-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
        mongoose.connect(DB_URI,{useNewUrlParser: true});
        console.log('Database connected successfully');

    }catch(error){
        console.log('Error while connecting with the database' , error.message);
    }
}

export default Connection;