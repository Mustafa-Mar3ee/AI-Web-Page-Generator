import mongoose from 'mongoose'

export interface SectionRequest extends Document {
  _id: string
  title: string
    createdAt: Date
}

export const SectionSchema = new mongoose.Schema<SectionRequest>({
  title: {
    type: String,
    required: true,
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const SectionModel = mongoose.model<SectionRequest>("Sections",SectionSchema)

