import {BadRequestException, CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {PostsService} from "../posts/posts.service";

@Injectable()
export class AuthorGuard implements CanActivate {
    constructor(
        private readonly postService: PostsService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const { id } = request.params

        const post = await this.postService.findOne(id)
        const user = request.user

        if (post && user && post.user.id === user.id) {
            return true
        }

        throw new BadRequestException('You can not delete this post')
    }

}