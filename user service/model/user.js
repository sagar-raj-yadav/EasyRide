import mongoose from 'mongoose';

const userschema = new mongoose.Schema({
    name: { 
        type: String,
         required: true, 
        //  unique: true
         },
    email: { 
        type: 
        String,
        required: true, 
        },
    password: { 
        type: String,
         required: true
         },
        
         
  }, { timestamps: true });


  const userdata = mongoose.model("user", userschema );
export default userdata;