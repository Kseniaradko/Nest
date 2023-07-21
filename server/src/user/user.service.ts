import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import * as argon2 from 'argon2';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService {

  constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>,
      private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existedUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      }
    })

    if (existedUser) throw new BadRequestException('This email is already exist!')

    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
      name: createUserDto.name
    })

    const token = this.jwtService.sign({ email: createUserDto.email })

    return { user, token };
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({ where: {
        email
      } })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id }
    })
    if (!user) throw new NotFoundException('This user does not exist!')

    return await this.userRepository.update(id, updateUserDto);

  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
