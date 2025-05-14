import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { PostEntity } from '../../posts/entities/post.entity';
import { SubscriptionEntity } from '../../subscriptions/entities/subscription.entity';
import { PostLikeEntity } from '../../post-likes/entities/post-like.entity';
import { PostCommentEntity } from '../../post-comments/entities/post-comment.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column()
  password: string;

  @Column({ default: true })
  isVerified: boolean;

  @Column({ default: false })
  isBlocked: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP()",
  })
  created_at: Date;

  @OneToMany(() => PostEntity, post => post.author)
  posts: PostEntity[];

  @OneToMany(() => SubscriptionEntity, subscription => subscription.subscriber)
  subscriptions: SubscriptionEntity[];

  @OneToMany(() => SubscriptionEntity, subscription => subscription.targetUser)
  subscribers: SubscriptionEntity[];

  @OneToMany(() => PostLikeEntity, like => like.user)
  likes: PostLikeEntity[];

  @OneToMany(() => PostCommentEntity, comment => comment.user)
  comments: PostCommentEntity[];
}