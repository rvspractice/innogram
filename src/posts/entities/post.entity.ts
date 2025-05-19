import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PostLikeEntity } from '../../post-likes/entities/post-like.entity';
import { BaseEntity } from 'src/shared/base.entity';
import { PostCommentEntity } from 'src/post-comments/entities/post-comment.entity';

@Entity({ name: 'post' })
export class PostEntity extends BaseEntity {
  @Column()
  title: string; // Renamed from caption to title - migration testing

  @Column()
  content: string;

  @Column()
  imageUrl: string;

  @Column({
    name: 'author_id',
    type: 'uuid'
  })
  authorId: string;

  @ManyToOne(() => UserEntity, user => user.posts)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @OneToMany(() => PostLikeEntity, like => like.post)
  likes: PostLikeEntity[];

  @OneToMany(() => PostCommentEntity, comment => comment.post)
  comments: PostCommentEntity[];
}