import mongoose from "mongoose";




const MockInterviewSchema = new mongoose.Schema({
  mockResp: {
    type: [Object], // This expects an array of objects
    required: true
  },
  jobPosition: { type: String,required: true },
  jobDesc: { type: String ,required: true},
  jobExperience: { type: Number,required: true},
  createdBy: { type: String ,required: true},
  createdAt:{type:Date,default:Date.now}
});

// const UseransSchema=new mongoose.Schema({

//   question:{
//     type:String,
//     required:true
//   },
//   correctAns:{
//     type:String,
//     required:true
//   },
//   userAns:{
//     type:String,
//     required:true
//   },
//   feedback:{
//     type:String,
//     required:true
//   },
//   rating:{
//     type:Number,
//     required:true
//   },
//   createdBy:{
//     type:String,
//     required:true
//   }
//   // createdAt:{
//   //   type:Date,
//   //   default:Date.now
//   // }


// })

// const Userans=mongoose.models.Userans || mongoose.model("Userans",UseransSchema)


// Use `mongoose.models` to avoid model re-compilation errors
 const MockInterview =
  mongoose.models.MockInterview || mongoose.model("MockInterview", MockInterviewSchema);

export default MockInterview;

