import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post-dto';
import { UpdatePostDto } from './dtos/update-post-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
    ) { }
    async getPosts(id?: number): Promise<Post | Post[] | null> {
        if (id) {
            return this.postRepository.findOne({ where: { id, status: true } });
        }

        return this.postRepository.find({ where: { status: true } });
    }

    async storePost(createPostDto: CreatePostDto) {
        return await this.postRepository.save(createPostDto);
    }

    async updatePost(id: number, updatePostDto: UpdatePostDto) {
        return await this.postRepository.update(id, updatePostDto);
    }

    async deletePost(id: number) {
        return await this.postRepository.delete(id);
    }
}
