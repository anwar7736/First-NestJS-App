import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService){}
    @Get()
    async getPosts(){
        return await this.postService.getPosts();
    }

    @Get(':id')
    async getPost(@Param('id') id: string){
        return await this.postService.getPosts(id);
    }

    @Post()
    async storePost(){
        return await this.postService.storePost();
    }

    @Put(':id')
    async updatePost(@Param('id') id: string){
        return await this.postService.updatePost(id);
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string){
        return await this.postService.deletePost(id);
    }
}
