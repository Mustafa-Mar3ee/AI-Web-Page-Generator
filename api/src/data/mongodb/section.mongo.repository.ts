import { injectable } from 'inversify';
import { DBContext } from './db.context';
import { SectionRequest } from './section.mongo.model';
import logger from 'src/web/logger';
 
@injectable()
export class SectionMongoRepository {
    constructor(private readonly _dbContext: DBContext) {}

    async all() {
        try {
          const sections = await this._dbContext.sections.find({})
          return sections
        } catch (error) {
            logger.error(`message - Get sections ${error}`);
            throw error; // Rethrow the error to be caught and handled by the caller
        }
    }

     

    async create(entity: SectionRequest) {
        try {
            const sections = await this._dbContext.sections.create(entity);
            return sections;
        } catch (error) {
            logger.error(`message - Get sections ${error}`);
            throw error;
        }
    }

     

    

    async clear() {
        try {
            const sections = await this._dbContext.sections.deleteMany({});
            return sections;
        } catch (error) {
            logger.error(`message - Get sections ${error}`);
            throw error;
        }
    }
}
