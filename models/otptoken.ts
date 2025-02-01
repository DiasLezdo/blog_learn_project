import mongoose, { Schema, Document } from "mongoose";

// const { ObjectId } = mongoose.Schema;

export interface IOtpToken extends Document {
  userId: mongoose.Types.ObjectId; // Refers to a User
  createdAt: Date;
  expiresAt: Date;
  token: string;
}

const tokenSchema: Schema = new Schema({
  // Db colob [relationship]
  userId: {
    // objectId from user unique user id [in DB]
    //
    type: mongoose.Schema.Types.ObjectId,
    // type:ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 60 });

// module.exports = mongoose.model<IOtpToken>("Token", tokenSchema);

const OtpToken =
  mongoose.models.Token || mongoose.model<IOtpToken>("Token", tokenSchema);

export default OtpToken;
