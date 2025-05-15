import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PostLikeEntity } from '../../post-likes/entities/post-like.entity';

@Entity({ name: 'post' })
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string; // Renamed from caption to title - migration testing

  @Column()
  content: string;

  @Column()
  imageUrl: string;

  @CreateDateColumn({
    name: 'created_at',
    type: "timestamptz",
  })
  createdAt: Date;

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
}