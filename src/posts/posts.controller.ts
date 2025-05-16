import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { PostEntity as PostEntity } from './entities/post.entity';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
    ) { }
    

    @Get()
    getAllPosts() {
        return this.postsService.findAllPosts();
    }

    @Get(':id')
    async getById(@Param('id', ParseUUIDPipe) id: string) {
        return await this.postsService.findPostById(id);
    }
    
    @Post()
    async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
        return this.postsService.createPost(createPostDto);
    }
    
    @Put(':id')
    updatePost(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updatePostDto: UpdatePostDto
    ) {
        return this.postsService.updatePost(id, updatePostDto);
    }
    
    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return await this.postsService.removePost(id);
    }

    @Get(':id/likes')
    async getPostLikes(@Param('id', ParseUUIDPipe) id: string) {
        return await this.postsService.findPostLikes(id); 
    }

}
