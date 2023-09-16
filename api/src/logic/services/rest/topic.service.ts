import { injectable } from "inversify";
 import logger from '../../../web/logger';
 import { validate } from "class-validator";
import TopicDTO from "src/logic/dto/topic";
import { TopicsRepository } from "src/data/mongodb/topic.mongo.repository";
import { TopicRequest } from "src/data/mongodb/topics.mongo.model";
import { TopicPgRepository } from "src/data/postgress/topic.pg.repository";
import { TopicPgRequest } from "src/data/postgress/types";

@injectable()
export class topicService {
    constructor(private readonly _topicMongoRepo: TopicsRepository,
        private readonly _topicPgRepo:TopicPgRepository) { }

    async create(topic: TopicPgRequest) {
        try {
            const { title, description,paragraph } = topic;
            const topicDto = new TopicDTO(title, description,paragraph);
            const errors = await validate(topicDto);
            
            if (errors.length > 0) {
                console.error('Validation errors:', errors);
                return;
            }
            
            const createdTopic = await this._topicPgRepo.create(topic);
            return createdTopic;
        } catch (error) {
            console.log("🚀 ~ file: topic.service.ts:28 ~ topicService ~ create ~ error:", error)
            logger.error(`message - Service create topic ${error}`);
            throw error;
        }
    }

    async all() {
        try {
            const topics = await this._topicPgRepo.all();
            return topics;
        } catch (error) {
            logger.error(`message - Service all topic ${error}`);
            throw error;
        }
    }

    // async find(topicId: string) {
    //     try {
    //         const topic = await this._topicPgRepo.(topicId);
    //         return topic;
    //     } catch (error) {
    //         logger.error(`message - Service find topic ${error}`);
    //         throw error;
    //     }
    // }

    // async update(topic: TopicRequest, topicId: string) {
    //     try {
    //         const updatedtopic = await this._topicPgRepo.update(topic, topicId);
    //         console.log("🚀 ~ file: topic.service.ts:51 ~ topicService ~ update ~ topic:", topic);
    //         return updatedtopic;
    //     } catch (error) {
    //         logger.error(`message - Service update topic ${error}`);
    //         throw error;
    //     }
    // }

    async clear() {
        try {
            const clearedtopics = await this._topicPgRepo.clear();
            return clearedtopics;
        } catch (error) {
            logger.error(`message - Service Clear topic ${error}`);
            throw error;
        }
    }

    // async delete(topicId: string) {
    //     try {
    //         const deletedtopic = await this._topicPgRepo.deleteOne(topicId);
    //         return deletedtopic;
    //     } catch (error) {
    //         logger.error(`message - Service Delete topic ${error}`);
    //         throw error;
    //     }
    // }
}
