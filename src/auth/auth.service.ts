import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSignUpDto } from './dtos/user-signup-dto';
import bcrypt from 'node_modules/bcryptjs';
import { UserSignInDto } from './dtos/user-signin-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }
    async signup(userSignUpDto: UserSignUpDto) {
        const user = await this.userRepository.findOne({
            select: {
                id: true,
            },
            where: [
                { email: userSignUpDto.email, status: true },
                { phone: userSignUpDto.phone, status: true }
            ]
        });

        if (user) {
            return {
                status: false,
                message: "Email/Phone already exists."
            }
        }

        userSignUpDto.password = await bcrypt.hash(userSignUpDto.password, 10);

        const data = await this.userRepository.save(userSignUpDto);
        const payload = { sub: data.id, username: data.email };
        return {
            status: true,
            message: 'Signup success',
            access_token: await this.jwtService.signAsync(payload),
            data
        }


    }

    async signin(userSignInDto: UserSignInDto) {
        const user = await this.userRepository.findOne({
            select: {
                id: true,
                name: true,
                phone: true,
                email: true,
                password: true,
            },
            where: [
                { email: userSignInDto.email, status: true },
            ]
        });

        if (user && await bcrypt.compare(userSignInDto.password, user.password)) {
            const payload = { sub: user.id, username: user.email };
            return {
                status: true,
                message: 'Signin success',
                access_token: await this.jwtService.signAsync(payload),
                data: user
            }
        }

        return {
            status: false,
            message: "Invalid credentials."
        }


    }
}
