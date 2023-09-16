import { BaseHttpResponse } from '../lib/base-http-response';
import { Request, Response } from 'express';
import { controller, httpDelete, httpGet, httpPost, httpPut } from 'inversify-express-utils';
import { QueryOptions } from 'mongoose';
import { SectionService } from 'src/logic/services/rest/section.service';
import { topicService } from 'src/logic/services/rest/topic.service';
 
@controller('/api/v1/section')
export class SectionController {
  constructor(private readonly _service: SectionService) {}

  @httpGet('/health-check')
  /**
   * @openapi
   * /api/v1/health-check:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  async index(req: Request, res: Response) {
    const response = BaseHttpResponse.healthy(
      { message: 'Server is healthy 🥳' },
      200
    );
    res.json(response);
  }

  @httpPost('/')
  async create(req: Request, res: Response) {
    try {
      const todo = await this._service.create(req.body);
      const response = BaseHttpResponse.success(
        todo,
        201
      );
      res.json(response);
    } catch (error) {
      const response = BaseHttpResponse.failed("Internal server error", 500);
      res.json(response);
    }
  }

  @httpGet('/')
  async all(req: Request, res: Response) {
    try {
      const todos = await this._service.all( );
      const response = BaseHttpResponse.success(
        todos,
        200
      );
      res.json(response);
    } catch (error) {
      const response = BaseHttpResponse.failed("Internal server error", 500);
      res.json(response);
    }
  }

 

  @httpDelete('/')
  async clear(req: Request, res: Response) {
    try {
      const todos = await this._service.clear();
      const response = BaseHttpResponse.success(
        todos,
        200
      );
      res.json(response);
    } catch (error) {
      const response = BaseHttpResponse.failed("Internal server error", 500);
      res.json(response);
    }
  }
}
