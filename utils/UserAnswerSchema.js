import mongoose from "mongoose";


const UseransSchema=new mongoose.Schema({
  mockId:{
    type:String,
    required:true
  },

  question:{
    type:String,
    required:true
  },
  correctAns:{
    type:String,
    required:true
  },
  userAns:{
    type:String,
    required:true
  },
  feedback:{
    type:String,
    required:true
  },
  rating:{
    type:Number,
    required:true
  },
  createdBy:{
    type:String,
    required:true
  }
  // createdAt:{
  //   type:Date,
  //   default:Date.now
  // }


})

const Userans=mongoose.models.Userans || mongoose.model("Userans",UseransSchema);

export default Userans;