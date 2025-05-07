export class UserDto {
    email: string;
    username: string;
    fullName: string;
    phone: string;
    bio: string;
    avatarUrl?: string;
    password: string;
    isVerified?: boolean;
    isBlocked?: boolean;
    createdAt?: Date;
}