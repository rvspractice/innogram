import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsString, IsUrl } from "class-validator";

export class UpdateUserDto {
    @ApiPropertyOptional({ type: String, example: 'user@test.com' })
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ type: String, example: 'User' })
    @IsString()
    username?: string;

    @ApiPropertyOptional({ type: String, example: 'John Doe' })
    @IsString()
    fullName?: string;

    @ApiPropertyOptional({ type: String, example: '+375291111111' })
    @IsString()
    phone?: string;

    @ApiPropertyOptional({ type: String, example: 'I have come a long way' })
    @IsString()
    bio?: string;

    @ApiPropertyOptional({ type: String, example: 'www.example.com/test.jpg' })
    @IsUrl()
    avatarUrl?: string;

    @ApiPropertyOptional({ type: String, example: 'admin' })
    @IsString()
    password?: string;

    @ApiPropertyOptional({ type: Boolean, example: true })
    @IsBoolean()
    isVerified?: boolean;

    @ApiPropertyOptional({ type: Boolean, example: false })
    @IsBoolean()
    isBlocked?: boolean;
}