import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class CreatePostLikeDto {
    @ApiProperty({ type: String, example: '638e0820-1100-4bfb-9739-dd688aeb2fc5' })
    @IsUUID()
    userId: string;

    @ApiProperty({ type: String, example: '638e0820-1100-4bfb-9739-dd688aeb2fc5' })
    @IsUUID()
    postId: string;
}