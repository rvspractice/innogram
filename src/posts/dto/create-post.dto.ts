import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty()
    caption: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    imageUrl: string;

    @ApiProperty()
    authorId: string;
}