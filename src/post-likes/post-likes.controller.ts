import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { PostLikesService } from './post-likes.service';
import { CreatePostLikeDto } from './dto/create-post-like.dto';

@Controller('likes')
export class PostLikesController {
    constructor(
        private readonly postLikesService: PostLikesService,
    ) { }

    @Get()
    getAllPostLikes() {
        return this.postLikesService.findAllPostLikes();
    }

    @Get(':id')
    async getPostLike(@Param('id', ParseUUIDPipe) id: string) {
        try {
            return await this.postLikesService.findPostLike(id);
        } catch (err) {
            throw new NotFoundException('Like not found');
        }

    }

    @Post()
    createPostLike(@Body() createPostLikeDto: CreatePostLikeDto) {
        return this.postLikesService.createPostLike(createPostLikeDto);
    }

    @Delete(':id')
    async removePostLike(@Param('id', ParseUUIDPipe) id: string) {
        await this.postLikesService.removePostLike(id);
        return { message: 'Like deleted successfully' };
    }
}
