import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from "./post/middlewares/logger.middleware";
import { MYSQLModule } from "./db/mysql.module";
import { PGSQLModule } from "./db/pgsql.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Makes ConfigService available everywhere
        }),
        MYSQLModule,
        PGSQLModule,
        PostModule,
        AuthModule,
    ],
})

export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(LoggerMiddleware)
        .forRoutes('*');
    }
}