import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';
 
@injectable()
export class DBContextPg {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  get section () {
    return this.prisma.section;
  }

  get topic () {
    return this.prisma.topic;
  }
}
