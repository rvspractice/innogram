import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl } from "class-validator";

export class UpdatePostDto {
    @ApiProperty({ type: String, example: 'Title' })
    @IsString()
    caption: string;

    @ApiProperty({ type: String, example: 'Content' })
    @IsString()
    content: string;

    @ApiProperty({ type: String, example: 'www.example.com/test.jpg' })
    @IsUrl()
    imageUrl: string;
}