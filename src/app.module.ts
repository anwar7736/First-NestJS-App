import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from "./post/middlewares/logger.middleware";
import { MYSQLModule } from "./db/mysql.module";
import { PGSQLModule } from "./db/pgsql.module";
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from "@nestjs/core";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Makes ConfigService available everywhere
        }),
        ThrottlerModule.forRoot({
        throttlers: [
            {
            ttl: 60 * 1000, //60 Seconds
            limit: 5,
            },
        ],
        errorMessage: "Too Many Requests",
        }),
        MYSQLModule,
        PGSQLModule,
        PostModule,
        AuthModule,
    ],
    providers:[
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    ]
})

export class AppModule{
    // configure(consumer: MiddlewareConsumer) {
    //     consumer
    //     .apply(LoggerMiddleware)
    //     .forRoutes('*');
    // }
}