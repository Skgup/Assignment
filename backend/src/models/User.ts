import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  dob:String;
  email: string;
  
  password?: string;
  googleId?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  dob:{type:String,required:true},
  email: { type: String, required: true, unique: true },

  password: { type: String },
  googleId: { type: String },
});

export default mongoose.model<IUser>("User", userSchema);
