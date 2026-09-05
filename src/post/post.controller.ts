import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dtos/create-post-dto';
import { UpdatePostDto } from './dtos/update-post-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/user.decorator';
import { EventPattern, Payload } from '@nestjs/microservices';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService){}
    @Get()
    async getPosts(@User() user: Request) {
        console.log(user);
        return await this.postService.getPosts();
    }

    @Get(':id')
    async getPost(@Param('id', ParseIntPipe) id: number){
        return await this.postService.getPosts(id);
    }

    @Post()
    async storePost(@Body() createPostDto: CreatePostDto){
        return await this.postService.storePost(createPostDto);
    }

    @Put(':id')
    async updatePost(@Param('id', ParseIntPipe) id: number, @Body() updatePostDTO: UpdatePostDto){
        return await this.postService.updatePost(id, updatePostDTO);
    }

    @Delete(':id')
    async deletePost(@Param('id', ParseIntPipe) id: number){
        return await this.postService.deletePost(id);
    }

    @EventPattern(process.env.RABBITMQ_QUEUE)
    async handleOrderCreated(@Payload() createPostDto: CreatePostDto) {
        return await this.postService.storePost(createPostDto);
    }
    
    @EventPattern(process.env.KAFKA_QUEUE)
    async handleOrderDeleted(@Payload() data: any) {
        return await this.postService.deletePost(data.id);
    }
}
