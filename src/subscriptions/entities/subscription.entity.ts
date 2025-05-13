import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity({ name: 'subscription' })
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP()",
  })
  created_at: Date;

  @ManyToOne(() => UserEntity, user => user.subscriptions)
  @JoinColumn({ name: 'subscriber_id' })
  subscriber: UserEntity;

  @ManyToOne(() => UserEntity, user => user.subscribers)
  @JoinColumn({ name: 'target_user_id' })
  targetUser: UserEntity;
}