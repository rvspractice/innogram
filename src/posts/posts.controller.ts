import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { PostEntity as PostEntity } from './entities/post.entity';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';

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
        try {
            return await this.postsService.findPost(id);
        } catch (err) {
            throw new NotFoundException('Post not found');
        }
    }
    
    @Post()
    async create(@Body() createPostDto: PostDto): Promise<PostEntity> {
        return this.postsService.createPost(createPostDto);
    }
    
    @Put(':id')
    updatePost(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updatePostDto: PostDto
    ) {
        return this.postsService.updatePost(id, updatePostDto);
    }
    
    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
        await this.postsService.removePost(id);
        return { message: 'Post deleted successfully' };
    }

    @Get(':id/likes')
    async getPostLikes(@Param('id', ParseUUIDPipe) id: string) {
        try {
            return await this.postsService.findPostLikes(id);
        } catch (err) {
            throw new NotFoundException('Likes not found');
        }   
    }

}
