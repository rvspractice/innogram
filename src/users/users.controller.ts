import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
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
        return await this.usersService.findUserById(id);
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
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return await this.usersService.removeUser(id);
    }


    @Get(':id/posts')
    async getPostsByUserId(@Param('id', ParseUUIDPipe) id: string) { 
        return await this.usersService.findUserPosts(id);
    }

    @Get(':id/subscribers')
    async getUserSubscribers(@Param('id', ParseUUIDPipe) id: string) {
        return await this.usersService.findSubscribers(id);
    }

    @Get(':id/subscriptions')
    async getUserSubscriptions(@Param('id', ParseUUIDPipe) id: string) {
        return await this.usersService.findSubscriptions(id);  
    }


    @Get(':id/likes')
    async getUserPostLikes(@Param('id', ParseUUIDPipe) id: string) {
        return await this.usersService.findPostLikes(id);
    }

    @Get(':id/comments')
    async getUserPostComments(@Param('id', ParseUUIDPipe) id: string) {
        return await this.usersService.findPostComments(id); 
    }
    

}
