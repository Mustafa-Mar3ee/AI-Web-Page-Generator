import { injectable } from 'inversify';
import logger from 'src/web/logger';
import { DBContextPg } from './db.context';
import { SectionRequest } from '../mongodb/section.mongo.model';
import { TopicRequest } from '../mongodb/topics.mongo.model';
import { TopicPgRequest } from './types';
 
@injectable()
export class TopicPgRepository {
    constructor(private readonly _dbContext: DBContextPg) {}

    async all( ) {
        try {
            const topics = await this._dbContext.topic.findMany();

          return topics
        } catch (error) {
            logger.error(`message - Get topics ${error}`);
            throw error; // Rethrow the error to be caught and handled by the caller
        }
    }

     

    async create(entity: TopicPgRequest) {
        try {
            const topics = await this._dbContext.topic.create({data:entity});
            return topics;
        } catch (error) {
            logger.error(`message - Get topics ${error}`);
            throw error;
        }
    }

     

    

    async clear() {
        try {
            const topics = await this._dbContext.topic.deleteMany({});
            return topics;
        } catch (error) {
            logger.error(`message - Get topics ${error}`);
            throw error;
        }
    }
}
