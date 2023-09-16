import mongoose from 'mongoose'

export interface TopicRequest extends Document {
  _id: string
  title: string
  describtion: string
  paragraph:string
  createdAt: Date
  sectionId: mongoose.Types.ObjectId | string;

}

export const TopicSchema = new mongoose.Schema<TopicRequest>({
  title: {
    type: String,
    required: true,
  },
  images:{
    type:String,

  },
  describtion: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paragraph:{
    type:String,
    required:true
  },
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sections',
    required:true
  },
})

export const TopicModel = mongoose.model<TopicRequest>('Topics', TopicSchema);

 