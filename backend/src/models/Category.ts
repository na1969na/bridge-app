import mongoos, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoos.model<ICategory>("Category", CategorySchema);
