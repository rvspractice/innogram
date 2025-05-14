import { PostEntity } from "../../posts/entities/post.entity";
import { UserEntity } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'post-comment' })
export class PostCommentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        name: 'created_at',
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP()",
    })
    created_at: Date;

    @Column()
    content: string;

    @ManyToOne(() => UserEntity, user => user.comments)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => PostEntity, post => post.comments)
    @JoinColumn({ name: 'post_id' })
    post: PostEntity;
}