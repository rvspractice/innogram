import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity({ name: 'subscription' })
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => UserEntity, user => user.subscriptions)
  @JoinColumn({ name: 'subscriber_id' })
  subscriber: UserEntity;

  @ManyToOne(() => UserEntity, user => user.subscribers)
  @JoinColumn({ name: 'target_user_id' })
  targetUser: UserEntity;
}