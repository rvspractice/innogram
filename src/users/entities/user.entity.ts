import { Entity, Column, OneToMany } from 'typeorm';
import { PostEntity } from 'src/posts/entities/post.entity';
import { SubscriptionEntity } from 'src/subscriptions/entities/subscription.entity';
import { PostLikeEntity } from 'src/post-likes/entities/post-like.entity';
import { BaseEntity } from 'src/shared/base.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
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

  @OneToMany(() => PostEntity, post => post.author)
  posts: PostEntity[];

  @OneToMany(() => SubscriptionEntity, subscription => subscription.subscriber)
  subscriptions: SubscriptionEntity[];

  @OneToMany(() => SubscriptionEntity, subscription => subscription.targetUser)
  subscribers: SubscriptionEntity[];

  @OneToMany(() => PostLikeEntity, like => like.user)
  likes: PostLikeEntity[];
}