import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './dto/user.entity';
import { FindOperator, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    // **Когда нужно и когда не нужно использовать async/await?
    findUser(id: string | FindOperator<string> | undefined): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    //   async findOne(id: string | FindOperator<string> | undefined): Promise<User | null> {
    //     return await this.usersRepository.findOneBy({ id });
    //   }

    async removeUser(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async createUser(createUserDto: UserDto): Promise<User> {
        const user = this.usersRepository.create({
            ...createUserDto,
            createdAt: new Date(),
            isVerified: createUserDto.isVerified ?? true,
            isBlocked: createUserDto.isBlocked ?? false,
            avatarUrl: createUserDto.avatarUrl ?? 'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg',
        });

        return this.usersRepository.save(user);
    }

    async updateUser(id: string, updateUserDto: UserDto): Promise<User> {
        const user = await this.findUser(id);

        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }

        await this.usersRepository.update(id, updateUserDto);

        return user;
    }
}
