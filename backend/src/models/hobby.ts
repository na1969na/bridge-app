import mongoos, { Schema, Document } from "mongoose";

export interface IHobby extends Document {
  title: string;
  date: Date;
  rating: number;
  notes: string;
  categoryId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const HobbySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    rating: { type: Number },
    notes: { type: String },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoos.model<IHobby>("Hobby", HobbySchema);
