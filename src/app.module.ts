import { Module } from "@nestjs/common";
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from "./db.module";
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        DBModule,
        PostModule,
        ConfigModule.forRoot({
            isGlobal: true, // Makes ConfigService available everywhere
        }),
        AuthModule,
    ],
})

export class AppModule { }