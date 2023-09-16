import { injectable } from 'inversify';
import { DBContext } from './db.context';
import { TopicRequest } from './topics.mongo.model';
import logger from 'src/web/logger';
 
@injectable()
export class TopicsRepository {
    constructor(private readonly _dbContext: DBContext) {}

    async all(Filter?) {
        try {
            const { filter, sortBy, limit, page } = Filter 
            const skip = (page - 1) * limit;
            let query = this._dbContext.topics.find();

            if (sortBy) {
                const sortOrder = sortBy.startsWith('-') ? -1 : 1;
                query = query.sort({ [sortBy.slice(1)]: sortOrder });
            }

            if (skip) {
                query = query.skip(skip);
            }

            if (limit) {
                query = query.limit(limit);
            }

            if (filter) {
                const filterType = filter.startsWith('-') ? false : true;
                query = query.find({ isComplete: filterType });
            }

            const [topics, totaltopics] = await Promise.all([
                query,
                this._dbContext.topics.countDocuments()
            ]);

            const totalPages = Math.ceil(totaltopics / limit);
            const paginationInfo = {
                page,
                totalPages,
                totaltopics
            };

            return { topics, paginationInfo };
        } catch (error) {
            logger.error(`message - Get topics ${error}`);
            throw error; // Rethrow the error to be caught and handled by the caller
        }
    }

    async find(id: string) {
        try {
            const todo = await this._dbContext.topics.findById(id);
            return todo;
        } catch (error) {
            logger.error(`message - Get topics ${error}`);
            throw error;
        }
    }

    async create(entity: TopicRequest) {
        try {
            const todo = await this._dbContext.topics.create(entity);
            return todo;
        } catch (error) {
            logger.error(`message - Get topics ${error}`);
            throw error;
        }
    }

    async update(data: Partial<TopicRequest>, id: string) {
        try {
            const todo = await this._dbContext.topics.findOneAndUpdate(
                { _id: id },
                { ...data },
                { new: true }
            );
            return todo;
        } catch (error) {
            logger.error(`message - Get topics ${error}`);
            throw error;
        }
    }

    async deleteOne(id: string) {
        try {
            const todo = await this._dbContext.topics.deleteOne({ _id: id }, { new: true });
            return todo;
        } catch (error) {
            logger.error(`message - Get topics ${error}`);
            throw error;
        }
    }

    async clear() {
        try {
            const topics = await this._dbContext.topics.deleteMany({});
            return topics;
        } catch (error) {
            logger.error(`message - Get topics ${error}`);
            throw error;
        }
    }
}
