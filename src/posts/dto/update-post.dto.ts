import { ApiProperty } from "@nestjs/swagger";

export class UpdatePostDto {
    @ApiProperty()
    caption: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    imageUrl: string;
}