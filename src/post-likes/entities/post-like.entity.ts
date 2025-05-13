import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique, CreateDateColumn } from 'typeorm';
import { PostEntity } from 'src/posts/entities/post.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity({ name: 'post-like' })
@Unique(['user', 'post'])
export class PostLikeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP()",
  })
  created_at: Date;

  @ManyToOne(() => UserEntity, user => user.likes)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.likes)
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;
}