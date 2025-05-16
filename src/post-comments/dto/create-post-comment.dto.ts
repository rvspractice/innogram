import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class CreatePostCommentDto {
    @ApiProperty({ type: String, example: '638e0820-1100-4bfb-9739-dd688aeb2fc5' })
    @IsUUID()
    userId: string;

    @ApiProperty({ type: String, example: '638e0820-1100-4bfb-9739-dd688aeb2fc5' })
    @IsUUID()
    postId: string;

    @ApiProperty({ type: String, example: 'Content' })
    @IsString()
    content: string;
}