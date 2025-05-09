import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { PostLike } from 'src/post-likes/entities/post-like.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  caption: string;

  @Column()
  content: string;

  @Column()
  imageUrl: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @OneToMany(() => PostLike, like => like.post)
  likes: PostLike[];
}