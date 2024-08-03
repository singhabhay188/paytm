const mongoose = require('mongoose');

async function connect(){
    await mongoose.connect('mongodb://localhost:27017/paytm');
    console.log('connected to db');
}

connect();

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        default:''
    }
});

const balanceSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
});

const User = mongoose.model('User',userSchema);
const Balance = mongoose.model('Balance',balanceSchema);

module.exports = {User,Balance};