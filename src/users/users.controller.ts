import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Get()
    getAllPosts() {
        return this.usersService.findAll();
    }

    @Get(':id')
    async getById(@Param('id', ParseUUIDPipe) id: string) {
        return await this.usersService.findUser(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.usersService.createUser(createUserDto);
    }

    @Put(':id')
    updateUser(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
        await this.usersService.removeUser(id);
        return { message: 'User deleted successfully' };
    }


    @Get(':id/posts')
    async getPostsByUserId(@Param('id', ParseUUIDPipe) id: string) { 
        try {
            return await this.usersService.findUserPosts(id);
        } catch (err) {
            throw new NotFoundException('User not found');
        }
    }

    @Get(':id/subscribers')
    async getUserSubscribers(@Param('id', ParseUUIDPipe) id: string) {
        try {
            return await this.usersService.findSubscribers(id);
        } catch (err) {
            throw new NotFoundException('Subscribers not found');
        }   
    }

    @Get(':id/subscriptions')
    async getUserSubscriptions(@Param('id', ParseUUIDPipe) id: string) {
        try {
            return await this.usersService.findSubscriptions(id);
        } catch (err) {
            throw new NotFoundException('Subscriptions not found');
        }   
    }

    @Get(':id/likes')
    async getUserPostLikes(@Param('id', ParseUUIDPipe) id: string) {
        try {
            return await this.usersService.findPostLikes(id);
        } catch (err) {
            throw new NotFoundException('Likes not found');
        }   
    }

    @Get(':id/comments')
    async getUserPostComments(@Param('id', ParseUUIDPipe) id: string) {
        try {
            return await this.usersService.findPostComments(id);
        } catch (err) {
            throw new NotFoundException('Comments not found');
        }   
    }
    

}
