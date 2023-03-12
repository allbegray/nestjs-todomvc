import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Prisma } from '.prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [
        { emit: 'stdout', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
      errorFormat: 'colorless',
    });
  }

  async onModuleInit() {
    await this.$connect();

    // this.$on('query', async (e: Prisma.QueryEvent) => {
    //   let queryString = e.query;
    //   JSON.parse(e.params).forEach((param, index) => {
    //     queryString = queryString.replace(
    //       `$${index + 1}`,
    //       typeof param === 'string' ? `'${param}'` : param,
    //     );
    //   });
    //
    //   console.log(queryString);
    // });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
