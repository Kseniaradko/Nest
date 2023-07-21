import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Post} from "../../posts/entities/post.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    name: string

    @OneToMany(() => Post, (post) => post.user, {
        onDelete: "CASCADE"
    })
    posts: Post[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
