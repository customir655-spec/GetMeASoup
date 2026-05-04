import mongoose, { Schema, model } from "mongoose";

// 1. Define the Schema
const pay_Schema = new Schema({
  paid_to : {type: String, required: true},
  paid_from : {type: String, required: true},
  amount: {type: Number, required: true},
  oid : {type: String, required: true},
  message : {type: String, required: true},
  done:{type:Boolean , required:true}
}, { 
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

if(mongoose.models.pay_mod2) {
  mongoose.deleteModel('pay_mod2');
}
// 2. Create the Model
// The first argument is the singular name of the collection (Mongoose will create 'users')
const pay_mod2 = mongoose.models.pay_mod2 || model("pay_mod2", pay_Schema);

export default pay_mod2;