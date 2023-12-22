import { DynamicModule, Module } from '@nestjs/common';
import { DrizzleService } from './mysql2.service';
import { Mysql2Options } from './types';

@Module({})
export class DrizzleModule {
  static forMysql2(options: Mysql2Options): DynamicModule {
    const mysql = require('mysql2/promise');

    const connection = mysql.createPool(options.pool);

    return {
      module: DrizzleModule,
      providers: [
        {
          provide: DrizzleService,
          useFactory: () => new DrizzleService(options.schema, connection),
        },
      ],
      exports: [DrizzleService],
      global: options?.isGlobal || true
    }
  }
};