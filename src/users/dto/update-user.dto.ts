import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiPropertyOptional()
    email?: string;

    @ApiPropertyOptional()
    username?: string;

    @ApiPropertyOptional()
    fullName?: string;

    @ApiPropertyOptional()
    phone?: string;

    @ApiPropertyOptional()
    bio?: string;

    @ApiPropertyOptional()
    avatarUrl?: string;

    @ApiPropertyOptional()
    password?: string;

    @ApiPropertyOptional()
    isVerified?: boolean;

    @ApiPropertyOptional()
    isBlocked?: boolean;
}