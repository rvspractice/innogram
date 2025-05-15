import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity({ name: 'subscription' })
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: "timestamptz",
  })
  createdAt: Date;

  @Column({
    name: 'subscriber_id',
    type: 'uuid'
  })
  subscriberId: string;

  @ManyToOne(() => UserEntity, user => user.subscriptions)
  @JoinColumn({ name: 'subscriber_id' })
  subscriber: UserEntity;

  @Column({
    name: 'target_user_id',
    type: 'uuid'
  })
  targetUserId: string;

  @ManyToOne(() => UserEntity, user => user.subscribers)
  @JoinColumn({ name: 'target_user_id' })
  targetUser: UserEntity;
}