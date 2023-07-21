import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Post} from "./entities/post.entity";
import {Repository} from "typeorm";

@Injectable()
export class PostsService {
  
  constructor(
      @InjectRepository(Post)
      private readonly postRepository: Repository<Post>,
  ) {
  }
  
  async create(createPostDto: CreatePostDto, id: number) {
    const isExist = await this.postRepository.findBy({
      user: { id },
      title: createPostDto.title
    })

    if (isExist.length) throw new BadRequestException('Post with this title already exist!')

    const newPost = {
      title: createPostDto.title,
      body: createPostDto.body,
      user: {
        id
      }
    }

    return await this.postRepository.save(newPost);
  }

  async findAll(id: number) {
    return await this.postRepository.find({
      where: {
        user: { id }
      },
      order: {
        createdAt: 'DESC'
      }
    })
  }

  async findOne(id: number) {
    const isExist = await this.postRepository.findOne({
      where: { id }
    })

    if (!isExist) throw new NotFoundException('Post does not exist!')

    return isExist
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne({
      where: { id }
    })

    if (!post) throw new NotFoundException('Post does not exist!')

    return await this.postRepository.update(id, updatePostDto)
  }

  async remove(id: number) {
    const post = await this.postRepository.findOne({
      where: { id }
    })

    if (!post) throw new NotFoundException('Post does not exist!')

    return await this.postRepository.delete(id)
  }

  async findAllWithPagination(id: number, page: number, limit: number) {
    const posts = await this.postRepository.find({
      where: {
        user: { id }
      },
      order: {
        createdAt: "DESC"
      },
      take: limit,
      skip: (page - 1) * limit
    })

    return posts
  }
}
