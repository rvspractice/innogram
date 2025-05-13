import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    fullName: string;

    @ApiPropertyOptional()
    phone?: string;

    @ApiPropertyOptional()
    bio?: string;

    @ApiPropertyOptional()
    avatarUrl?: string;

    @ApiProperty()
    password: string;

    @ApiPropertyOptional()
    isVerified?: boolean;

    @ApiPropertyOptional()
    isBlocked?: boolean;
}