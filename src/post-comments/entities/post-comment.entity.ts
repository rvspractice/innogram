import { BaseEntity } from "src/shared/base.entity";
import { PostEntity } from "../../posts/entities/post.entity";
import { UserEntity } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'post-comment' })
export class PostCommentEntity extends BaseEntity {
    @Column()
    content: string;

    @Column({
        name: 'user_id',
        type: 'uuid'
    })
    userId: string;

    @ManyToOne(() => UserEntity, user => user.comments)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Column({
        name: 'post_id',
        type: 'uuid'
    })
    postId: string;

    @ManyToOne(() => PostEntity, post => post.comments)
    @JoinColumn({ name: 'post_id' })
    post: PostEntity;
}