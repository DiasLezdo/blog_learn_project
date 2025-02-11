import mongoose, { Document, Schema } from "mongoose";

export interface IFeedBack extends Document {
  email: string;
  subject: string;
  message: string;
}

const feedbackSchema = new Schema(
  {
    email: String,
    subject: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

const FeedBack =
  mongoose.models.FeedBack ||
  mongoose.model<IFeedBack>("FeedBack", feedbackSchema);

export default FeedBack;
