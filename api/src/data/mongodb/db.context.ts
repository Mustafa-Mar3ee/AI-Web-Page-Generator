import { injectable } from 'inversify'
import mongoose from 'mongoose'
import { SectionRequest, SectionSchema  } from './section.mongo.model'
import { TopicRequest, TopicSchema  } from './topics.mongo.model'

 
@injectable()
export class DBContext {
  private _db: typeof mongoose

async connect() {
    this._db = await mongoose.connect(process.env.DB_URI)
    console.log('connected to DB 🥳')
  }
get sections(){
  return this._db.model<SectionRequest>("Sections",SectionSchema)

}
get topics(){
  return this._db.model<TopicRequest>("Topics",TopicSchema)
}
 

}

