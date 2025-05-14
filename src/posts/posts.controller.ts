import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { PostEntity as PostEntity } from './entities/post.entity';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { PaginationDto } from 'src/shared/pagination.dto';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
    ) { }
    

    @Get()
    getAllPosts(@Query() paginationDto: PaginationDto) {
        return this.postsService.findAllPosts(paginationDto);
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

    @Get(':id/comments')
    async getPostComments(@Param('id', ParseUUIDPipe) id: string) {
        try {
            return await this.postsService.findPostComments(id);
        } catch (err) {
            throw new NotFoundException('Comments not found');
        }
    }

}
