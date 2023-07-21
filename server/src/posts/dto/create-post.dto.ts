import {IsNotEmpty, IsOptional} from "class-validator";
import {User} from "../../user/entities/user.entity";

export class CreatePostDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    body: string

    @IsOptional()
    user?: User
}
