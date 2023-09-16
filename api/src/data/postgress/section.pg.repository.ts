import { injectable } from 'inversify';
import logger from 'src/web/logger';
import { DBContextPg } from './db.context';
import { SectionRequest } from '../mongodb/section.mongo.model';
 
@injectable()
export class SectionPgRepository {
    constructor(private readonly _dbContext: DBContextPg) {}

    async all() {
        try {
          const sections = await this._dbContext.section.findMany()
          return sections
        } catch (error) {
            logger.error(`message - Get sections ${error}`);
            throw error; // Rethrow the error to be caught and handled by the caller
        }
    }

     

    async create(entity: SectionRequest) {
        try {
            const sections = await this._dbContext.section.create({data:entity});
            return sections;
        } catch (error) {
            logger.error(`message - Get sections ${error}`);
            throw error;
        }
    }

     

    

    async clear() {
        try {
            const sections = await this._dbContext.section.deleteMany({});
            return sections;
        } catch (error) {
            logger.error(`message - Get sections ${error}`);
            throw error;
        }
    }
}
