import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import cors from 'cors';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import morgan from 'morgan';
import { Application, IAbstractApplicationOptions } from './lib/abstract-application';
import { MorganMode } from './lib/enums';
import './controllers/topic.controller';
import './controllers/section.controller';
import { CouldNotFindSubscriberException, ValidationException } from './exceptions';
import { BaseHttpResponse } from './lib/base-http-response';
import { DBContext } from '../data/mongodb/db.context';
import { ApolloServer } from 'apollo-server-express';
import resolvers from 'src/logic/services/section-ql/resolvers';
import { typeDefs } from 'src/logic/services/section-ql/schema';
import { SectionService } from 'src/logic/services/rest/section.service';
import { topicService } from 'src/logic/services/rest/topic.service';
import { TopicsRepository } from 'src/data/mongodb/topic.mongo.repository';
import { DBContextPg } from 'src/data/postgress/db.context';
import { SectionMongoRepository } from 'src/data/mongodb/section.mongo.repository';
import { SectionPgRepository } from 'src/data/postgress/section.pg.repository';
import { TopicPgRepository } from 'src/data/postgress/topic.pg.repository';

export class App extends Application {
  constructor() {
    super({
      containerOpts: { defaultScope: 'Singleton' },
      morgan: {
        mode: MorganMode.DEV,
      },
    });
  }

  configureServices(container: Container): void {
    container.bind(DBContext).toSelf();
    container.bind(DBContextPg).toSelf();
    container.bind(SectionService).toSelf();
    container.bind(SectionMongoRepository).toSelf();
    container.bind(SectionPgRepository).toSelf();
    container.bind(TopicPgRepository).toSelf();
    container.bind(topicService).toSelf();
    container.bind(TopicsRepository).toSelf();
  }

  async setup(options: IAbstractApplicationOptions) {
    const _db = this.container.get(DBContext);
    // await _db.connect();

    const server = new InversifyExpressServer(this.container);
    server.setErrorConfig((app) => {
      app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ValidationException) {
          const response = BaseHttpResponse.failed(err.message, 422);
          return res.status(response.statusCode).json(response);
        }
        if (err instanceof CouldNotFindSubscriberException) {
          const response = BaseHttpResponse.failed(err.message, 404);
          return res.status(response.statusCode).json(response);
        }
        if (err instanceof Error) {
          const response = BaseHttpResponse.failed(err.message, 500);
          return res.status(response.statusCode).json(response);
        }

        next();
      });
    });

    server.setConfig((app) => {
      // Enable CORS with specific origin
      app.use(cors());

      app.use(express.json({ limit: '50MB' }));
      app.use(morgan(options.morgan.mode));
    });

    const app = server.build();

    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app, path: '/graphql',cors: {
      origin: true
    },});

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  }
}

new App();