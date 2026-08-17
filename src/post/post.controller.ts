import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dtos/create-post-dto';
import { UpdatePostDto } from './dtos/update-post-dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostController {
    constructor(private readonly postService: PostService){}
    @Get()
    async getPosts(){
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
}
