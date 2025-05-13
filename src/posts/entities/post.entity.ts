import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { PostLikeEntity } from 'src/post-likes/entities/post-like.entity';

@Entity({ name: 'post' })
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  caption: string;
  // ????
  //  title: string; // Renamed from caption to title - migration testing

  @Column()
  content: string;

  @Column()
  imageUrl: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => UserEntity, user => user.posts)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @OneToMany(() => PostLikeEntity, like => like.post)
  likes: PostLikeEntity[];
}