import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { PostLike } from 'src/post-likes/entities/post-like.entity';

@Entity({ name: 'user' })
export class User {
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

  @OneToMany(() => Post, post => post.author)
  posts: Post[];

  @OneToMany(() => Subscription, subscription => subscription.subscriber)
  subscriptions: Subscription[];

  @OneToMany(() => Subscription, subscription => subscription.targetUser)
  subscribers: Subscription[];

  @OneToMany(() => PostLike, like => like.user)
  likes: PostLike[];
}