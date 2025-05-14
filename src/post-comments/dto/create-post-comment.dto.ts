import { ApiProperty } from "@nestjs/swagger";

export class CreatePostCommentDto {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    postId: string;

    @ApiProperty()
    content: string;
}