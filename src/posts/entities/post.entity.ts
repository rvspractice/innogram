import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn } from 'typeorm';
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

  @CreateDateColumn({
    name: 'created_at',
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP()",
  })
  created_at: Date;

  @ManyToOne(() => UserEntity, user => user.posts)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @OneToMany(() => PostLikeEntity, like => like.post)
  likes: PostLikeEntity[];
}