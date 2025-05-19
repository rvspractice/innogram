import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl, IsUUID } from "class-validator";

export class CreatePostDto {
    @ApiProperty({ type: String, example: 'Title' })
    @IsString()
    caption: string;

    @ApiProperty({ type: String, example: 'Content' })
    @IsString()
    content: string;

    @ApiProperty({ type: String, example: 'www.example.com/test.jpg' })
    @IsUrl()
    imageUrl: string;

    @ApiProperty({ type: String, example: '638e0820-1100-4bfb-9739-dd688aeb2fc5' })
    @IsUUID()
    authorId: string;
}