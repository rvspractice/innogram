import { Entity, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { PostEntity } from 'src/posts/entities/post.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { BaseEntity } from 'src/shared/base.entity';

@Entity({ name: 'post_like' })
@Unique(['user', 'post'])
export class PostLikeEntity extends BaseEntity {
  @Column({
    name: 'user_id',
    type: 'uuid'
  })
  userId: string;

  @ManyToOne(() => UserEntity, user => user.likes)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({
    name: 'post_id',
    type: 'uuid'
  })
  postId: string;

  @ManyToOne(() => PostEntity, (post) => post.likes)
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;
}