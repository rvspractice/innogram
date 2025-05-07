import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Get()
    getAllPosts() {
        return this.usersService.findAll();
    }

    // **try catch лучше в контроллере или в сервисе?
    @Get(':id')
    async getById(@Param('id', ParseUUIDPipe) id: string) {
        try {
            return await this.usersService.findUser(id);
        } catch (err) {
            throw new NotFoundException('User not found');
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: UserDto): Promise<User> {
        return this.usersService.createUser(createUserDto);
    }

    // **Нужны ли отдельные DTO для обновления и создания?
    @Put(':id')
    updateUser(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateUserDto: UserDto
    ) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
        await this.usersService.removeUser(id);
        return { message: 'User deleted successfully' };
    }

}
