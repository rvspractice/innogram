import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PostEntity } from 'src/posts/entities/post.entity';
import { SubscriptionEntity } from 'src/subscriptions/entities/subscription.entity';
import { PostLikeEntity } from 'src/post-likes/entities/post-like.entity';

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

  @Column()
  phone: string;

  @Column()
  bio: string;

  @Column()
  avatarUrl: string;

  @Column()
  password: string;

  @Column({ default: true })
  isVerified: boolean;

  @Column({ default: false })
  isBlocked: boolean;

  @Column()
  createdAt: Date;

  @OneToMany(() => PostEntity, post => post.author)
  posts: PostEntity[];

  @OneToMany(() => SubscriptionEntity, subscription => subscription.subscriber)
  subscriptions: SubscriptionEntity[];

  @OneToMany(() => SubscriptionEntity, subscription => subscription.targetUser)
  subscribers: SubscriptionEntity[];

  @OneToMany(() => PostLikeEntity, like => like.user)
  likes: PostLikeEntity[];
}