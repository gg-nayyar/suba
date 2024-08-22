import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    alias:{
        type: String,
        required: false
    },
    username:{
        type: String,
        required: false
    },
    contactNumber:{
        type: Number,
        required: false
    },
    email:{
        type: String,
        required: true
    },
    accessToken:{
        type: String,
        required: true
    }
})
export default mongoose.model('User',userSchema);