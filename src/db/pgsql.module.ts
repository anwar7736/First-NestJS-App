import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'pgsqlConnection',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('PGSQL_DB_HOST'),
        port: configService.get<number>('PGSQL_DB_PORT'),
        username: configService.get<string>('PGSQL_DB_USERNAME'),
        password: configService.get<string>('PGSQL_DB_PASSWORD'),
        database: configService.get<string>('PGSQL_DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
})
export class PGSQLModule {

}