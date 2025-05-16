import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { PostCommentsService } from './post-comments.service';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';

@Controller('post-comments')
export class PostCommentsController {
    constructor(
        private readonly postCommentsService: PostCommentsService,
    ) { }

    @Get()
    getAllPostComments() {
        return this.postCommentsService.findAllPostComments();
    }

    @Get(':id')
    async getPostComment(@Param('id', ParseUUIDPipe) id: string) {
        return await this.postCommentsService.findPostComment(id);
    }

    @Post()
    createPostComment(@Body() createPostCommentDto: CreatePostCommentDto) {
        return this.postCommentsService.createPostComment(createPostCommentDto);
    }

    @Delete(':id')
    async removePostComment(@Param('id', ParseUUIDPipe) id: string) {
        await this.postCommentsService.removePostComment(id);
        return null;
    }

}
